import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const user = cookies().get("user");
  const isAuthPage = ["/dang-nhap", "/dang-ky"].includes(pathname);
  const isManagementPage = pathname.startsWith("/quan-ly");
  const isAccountPage = pathname.startsWith("/tai-khoan");

  // Nếu không có user và cố truy cập trang quản lý/tài khoản -> redirect về home
  if (!user) {
    if (isManagementPage || isAccountPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  const listRoleCode = JSON.parse(user.value).roles?.map(
    (role: any) => role.roleId.code
  );
  const roleNumbers = listRoleCode.map(Number);

  // Nếu đã đăng nhập mà vào trang auth -> redirect về home
  if (isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Chỉ check redirect cho URL gốc /quan-ly
  if (pathname === "/quan-ly") {
    if (roleNumbers.some((code) => [2, 3, 4].includes(code))) {
      return NextResponse.redirect(
        new URL("/quan-ly/tinh-nguyen-vien", request.url)
      );
    } else if (roleNumbers.includes(0)) {
      return NextResponse.redirect(new URL("/quan-ly/admin", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Check quyền truy cập các trang quản lý
  if (pathname.startsWith("/quan-ly/tinh-nguyen-vien")) {
    if (!roleNumbers.some((code) => [2, 3, 4].includes(code))) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/quan-ly/admin")) {
    if (!roleNumbers.includes(0)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/(.*)",
};
