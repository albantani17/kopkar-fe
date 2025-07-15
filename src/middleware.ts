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

  const { pathname, search } = request.nextUrl;

  // KUNCI #1: Bangun basis URL yang benar secara manual dari header
  const host = request.headers.get("host")!;
  const proto = request.headers.get("x-forwarded-proto")!;
  const publicBaseUrl = `${proto}://${host}`; // Hasilnya: "https://koperasi.siber.net.id"

  // KUNCI #2: Gabungkan dengan path dan query untuk mendapatkan URL lengkap yang benar
  const correctFullUrl = `${publicBaseUrl}${pathname}${search}`;

  if (pathname === "/login" || pathname === "/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", publicBaseUrl));
    }
  }

  // --- Logika untuk /admin ---
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/login", publicBaseUrl);
      loginUrl.searchParams.set("callbackUrl", correctFullUrl); // Gunakan URL yang sudah diperbaiki
      return NextResponse.redirect(loginUrl);
    }

    if (token?.user?.role !== "admin") {
      return NextResponse.redirect(
        new URL("/karyawan/informasi", publicBaseUrl)
      );
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/karyawan", publicBaseUrl));
    }
  }

  // --- Logika untuk /karyawan ---
  if (pathname.startsWith("/karyawan")) {
    if (!token) {
      const loginUrl = new URL("/login", publicBaseUrl);
      loginUrl.searchParams.set("callbackUrl", correctFullUrl); // Gunakan URL yang sudah diperbaiki
      return NextResponse.redirect(loginUrl);
    }

    if (pathname === "/karyawan") {
      return NextResponse.redirect(
        new URL("/karyawan/informasi", publicBaseUrl)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/admin/:path*", "/karyawan/:path*"],
};
