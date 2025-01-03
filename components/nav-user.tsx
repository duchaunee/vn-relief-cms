"use client";

import { BadgeCheck, Bell, CreditCard, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/configs/firebase";
import toast from "react-hot-toast";
import {
  getCurrentUser,
  handleLogout,
  isAuthenticatedByRole,
} from "@/lib/axios";

import Cookies from "js-cookie";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const currentUser = getCurrentUser();
  console.log("\n🔥 ~ file: nav-user.tsx:38 ~ currentUser::\n", currentUser);

  return (
    <SidebarMenu className="w-fit">
      <SidebarMenuItem>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            className="size-9 rounded-sm overflow-hidden cursor-pointer"
            asChild
          >
            <Avatar>
              <AvatarImage
                src={currentUser.avatar || user.avatar}
                alt={currentUser.name}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={currentUser.avatar || user.avatar}
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {currentUser.name}
                  </span>
                  <span className="truncate text-xs">{currentUser.phone}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/tai-khoan">
                <DropdownMenuItem>
                  <BadgeCheck />
                  Thông tin tài khoản
                </DropdownMenuItem>
              </Link>
              {/* Néu đã đăng nhập, và không phải user thường + TVĐCT, thì mới show cái này (TNV. admin) */}
              {!isAuthenticatedByRole("user") &&
                !isAuthenticatedByRole("rescue-team") && (
                  <Link href="/quan-ly">
                    <DropdownMenuItem>
                      <CreditCard />
                      Trang quản lý
                    </DropdownMenuItem>
                  </Link>
                )}
              {/* <Link href="/thong-bao">
                <DropdownMenuItem className="flex lg:hidden">
                  <Bell />
                  Thông báo
                </DropdownMenuItem>
              </Link> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
