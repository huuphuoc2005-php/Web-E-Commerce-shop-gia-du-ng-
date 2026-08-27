import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");
  const isLoginRoute = path === "/admin/login";

  const userId = request.cookies.get("user_id")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  const sessionSig = request.cookies.get("session_sig")?.value;

  const isValidAdminSession =
    userId &&
    userRole === "ADMIN" &&
    sessionSig &&
    (await verifySession(userId, userRole, sessionSig));

  // Nếu là Admin đã đăng nhập mà truy cập trang login (/admin/login) -> Tự động chuyển thẳng vào Admin Dashboard
  if (isLoginRoute && isValidAdminSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Nếu truy cập các trang Admin mà CHƯA đăng nhập với quyền Admin -> Chuyển về trang đăng nhập (/admin/login)
  if (isAdminRoute && !isLoginRoute && !isValidAdminSession) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
