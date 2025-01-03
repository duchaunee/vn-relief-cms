import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const user = cookies().get("user");
  const isAuthPage = ["/dang-nhap", "/dang-ky"].includes(pathname);
  const isManagementPage = pathname.startsWith("/quan-ly");
  const isAccountPage = pathname.startsWith("/tai-khoan");

  if (!user) {
    if (isManagementPage || isAccountPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
  console.log("\n🔥 ~ file: middleware.ts:13 ~ user::\n", user);

  const listRoleCode = JSON.parse(user.value).roles?.map(
    (role: any) => role.roleId.code
  );

  if (isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isManagementPage) {
    if (listRoleCode.includes(0)) {
      return NextResponse.redirect(new URL("/quan-ly/admin", request.url));
    } else if (listRoleCode.some((code) => [2, 3, 4].includes(code))) {
      return NextResponse.redirect(
        new URL("/quan-ly/tinh-nguyen-vien", request.url)
      );
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/(.*)",
};
