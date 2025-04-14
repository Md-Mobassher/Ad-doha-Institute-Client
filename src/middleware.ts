import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authAccessKey, authRefreshKey } from "./constant/authkey";

const AuthRoutes = ["/login", "/register"];
const roleBasedPrivateRoutes = {
  super_admin: [/^\/dashboard\/super_admin(?:\/.*)?$/],
  admin: [/^\/dashboard\/admin(?:\/.*)?$/],
  faculty: [/^\/dashboard\/faculty(?:\/.*)?$/],
  student: [/^\/dashboard\/student(?:\/.*)?$/],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(authAccessKey)?.value;
  const refreshToken = request.cookies.get(authRefreshKey)?.value;

  // Not logged in, allow only login/register
  if (!accessToken || !refreshToken) {
    if (AuthRoutes.includes(pathname)) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let decodedData: {
    role?: keyof typeof roleBasedPrivateRoutes;
    exp?: number;
  } | null = null;
  try {
    decodedData = jwtDecode(accessToken) as {
      role?: keyof typeof roleBasedPrivateRoutes;
      exp?: number;
    };

    const currentTime = Math.floor(Date.now() / 1000); // in seconds

    if (decodedData?.exp && decodedData.exp < currentTime) {
      console.warn("Access token expired");

      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(authAccessKey);
      response.cookies.delete(authRefreshKey);
      return response;
    }
  } catch (err) {
    console.error("Invalid access token:", err);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete(authAccessKey);
    response.cookies.delete(authRefreshKey);
    return response;
  }

  const role = decodedData?.role;

  // Redirect logged-in users away from /login or /register
  if (AuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
  }

  // Route /dashboard should redirect based on role
  if (pathname === "/dashboard") {
    return NextResponse.rewrite(new URL(`/dashboard/${role}`, request.url));
  }

  // Check access permission
  if (role && roleBasedPrivateRoutes[role]) {
    const allowedRoutes = roleBasedPrivateRoutes[role];
    const isMatch = allowedRoutes.some((route) => pathname.match(route));

    if (isMatch) return NextResponse.next();

    // 🔥 Unauthorized access: Redirect to error page with query param
    const url = new URL("/unauthorized", request.url);
    url.searchParams.set("error", "unauthorized");

    return NextResponse.redirect(url);
  }

  // Default fallback
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/login", "/register", "/dashboard", "/dashboard/:path*"],
};
