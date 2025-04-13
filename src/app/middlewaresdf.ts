import { authAccessKey } from "@/constant/authkey";
import {
  logout,
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { store } from "@/redux/store";
import { removeCookie } from "@/utils/cookieHelper";
import { jwtDecode } from "jwt-decode"; // Ensure the correct import
import { NextRequest, NextResponse } from "next/server";
import { useDispatch } from "react-redux";

const AuthRoutes = ["/login", "/"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const state = store.getState();
  const user = selectCurrentUser(state);
  const token = selectCurrentToken(state);

  // Access cookies using the cookies object from the request
  const cookies = request.cookies;
  const accessToken = cookies.get(authAccessKey)?.value;

  // Allow public routes like login and landing page
  if (!accessToken || !user || !token) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      removeCookie(authAccessKey);
      dispatch(logout());
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  try {
    // Decode the token to check user role or expiration
    const decodedData = jwtDecode(accessToken) as any;
    const role = decodedData?.role;

    // Restrict sellers to their specific routes
    // if (role === "SELLER") {
    //   const allowedSellerRoutes = [
    //     "/dashboard/seller/sales/products/pos",
    //     "/dashboard/settings", // Add the settings route here
    //   ];
    //   // If the pathname matches any of the allowed seller routes, let the request proceed
    //   if (allowedSellerRoutes.includes(pathname)) {
    //     return NextResponse.next();
    //   }
    //   // If not, redirect to the allowed seller route
    //   return NextResponse.redirect(
    //     new URL(allowedSellerRoutes[0], request.url)
    //   ); // Default to the first allowed route
    // }

    // Allow admins and super admins to access dashboard routes
    // if (
    //   (role === "ADMIN" || role === "SUPER_ADMIN") &&
    //   pathname.startsWith("/dashboard")
    // ) {
    //   return NextResponse.next();
    // }

    // Redirect authenticated users away from login or landing page to dashboard
    if (pathname === "/" || pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    removeCookie(authAccessKey); // Remove invalid token
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to home for unauthorized or invalid token
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/", "/login"],
};
