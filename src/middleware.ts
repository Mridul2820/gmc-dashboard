import { NextRequest, NextResponse } from "next/server";
import { gmcAuthToken } from "./constant";

export default function middleware(req: NextRequest) {
  let loggedin = req.cookies.get(gmcAuthToken);
  const { pathname } = req.nextUrl;
  const privateRoutes = ["/dashboard"];
  if (!loggedin) {
    if (privateRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}
export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
