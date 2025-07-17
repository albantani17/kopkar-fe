import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environment from "./config/enviroment";

export async function middleware(req: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req,
    secret: environment.AUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/", req.nextUrl.href));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/auth/login", req.nextUrl.href);
      url.searchParams.set("callbackUrl", encodeURI(req.nextUrl.href));
      return NextResponse.redirect(url);
    }

    if (token?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.nextUrl.href));
    }
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl.href));
    }
  }

  if (pathname.startsWith("/karyawan")) {
    if (!token) {
      const url = new URL("/auth/login", req.nextUrl.href);
      url.searchParams.set("callbackUrl", encodeURI(req.nextUrl.href));
      return NextResponse.redirect(url);
    }
    if (pathname === "/karyawan") {
      return NextResponse.redirect(new URL("/karyawan/informasi", req.nextUrl.href));
    }
  }
}

export const config = {
  matcher: ["/admin/:path*", "/karyawan/:path*"],
};
