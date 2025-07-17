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
  const baseUrl = environment.AUTH_URL;
  const fullPath = req.nextUrl.pathname + req.nextUrl.search;

  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/", encodeURI(baseUrl + fullPath)));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/login", baseUrl);
      url.searchParams.set("callbackUrl", encodeURI(baseUrl + fullPath));
      return NextResponse.redirect(url);
    }

    if (token?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", encodeURI(baseUrl + fullPath)));
    }
    if (pathname === "/admin") {
      return NextResponse.redirect(
        new URL("/admin/dashboard", encodeURI(baseUrl + fullPath))
      );
    }
  }

  if (pathname.startsWith("/karyawan")) {
    if (!token) {
      const url = new URL("/login", baseUrl);
      url.searchParams.set("callbackUrl", encodeURI(baseUrl + fullPath));
      return NextResponse.redirect(url);
    }
    if (pathname === "/karyawan") {
      return NextResponse.redirect(
        new URL("/karyawan/informasi", encodeURI(baseUrl + fullPath))
      );
    }
  }
}

export const config = {
  matcher: ["/admin/:path*", "/karyawan/:path*"],
};
