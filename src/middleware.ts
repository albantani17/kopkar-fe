import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environment from "./config/enviroment";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Dapatkan host dan protokol yang benar dari header
  const host = request.headers.get("host")!;
  const proto = request.headers.get("x-forwarded-proto")!;

  if (pathname === "/login" || pathname === "/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // ===================== AWAL PERUBAHAN UNTUK /admin =====================
  if (pathname.startsWith("/admin")) {
    if (!token) {
      // 1. Bangun URL callback yang benar
      const callbackUrl = new URL(request.url);
      callbackUrl.protocol = proto;
      callbackUrl.host = host;

      // 2. Bangun URL login yang benar
      const loginUrl = new URL("/login", callbackUrl); // Gunakan URL yang sudah diperbaiki sebagai basis
      loginUrl.searchParams.set("callbackUrl", callbackUrl.href); // Set callbackUrl yang benar

      return NextResponse.redirect(loginUrl);
    }

    if (token?.user?.role !== "admin") {
      // Ini sudah benar, tidak perlu diubah
      return NextResponse.redirect(new URL("/karyawan/informasi", request.url));
    }

    if (pathname === "/admin") {
      // Ini sudah benar, tidak perlu diubah
      return NextResponse.redirect(new URL("/admin/karyawan", request.url));
    }
  }
  // ===================== AKHIR PERUBAHAN UNTUK /admin ====================

  // ===================== AWAL PERUBAHAN UNTUK /karyawan ==================
  if (pathname.startsWith("/karyawan")) {
    if (!token) {
      // 1. Bangun URL callback yang benar
      const callbackUrl = new URL(request.url);
      callbackUrl.protocol = proto;
      callbackUrl.host = host;

      // 2. Bangun URL login yang benar
      const loginUrl = new URL("/login", callbackUrl); // Gunakan URL yang sudah diperbaiki sebagai basis
      loginUrl.searchParams.set("callbackUrl", callbackUrl.href); // Set callbackUrl yang benar

      return NextResponse.redirect(loginUrl);
    }

    if (pathname === "/karyawan") {
      // Ini sudah benar, tidak perlu diubah
      return NextResponse.redirect(new URL("/karyawan/informasi", request.url));
    }
  }
  // ===================== AKHIR PERUBAHAN UNTUK /karyawan =================
}

export const config = {
  matcher: ["/login", "/admin/:path*", "/karyawan/:path*"],
};
