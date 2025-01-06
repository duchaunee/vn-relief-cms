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

  // Check quyền truy cập trang quản lý
  if (isManagementPage) {
    if (!roleNumbers.some((code) => [0, 2, 3, 4].includes(code))) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/(.*)",
};
