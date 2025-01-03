"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Bell,
  CalendarCheck,
  ChevronDown,
  CircleX,
  Headphones,
  Info,
  LogOut,
  Menu,
  MessageSquareText,
  Undo2,
  UserCog,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { handleLogout } from "@/lib/axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configs/firebase";

import Cookies from "js-cookie";
import { USER_APIS } from "@/apis/user";

const Header = () => {
  const [date, setDate] = useState<Date>();

  //user
  const [userFromMongodb, setUserFromMongodb] = useState<{} | null>(null);

  useEffect(() => {
    const handleSaveDateState = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userFromMongodb: any = await USER_APIS.getByUidFirebase(
            user.uid
          );
          Cookies.set("user", JSON.stringify(userFromMongodb.data));
          setUserFromMongodb(userFromMongodb.data);
        } else {
          setUserFromMongodb(null);
          Cookies.remove("user");
        }
      });
    };
    handleSaveDateState(); //init

    window.addEventListener("saveDataState", handleSaveDateState);

    return () =>
      window.removeEventListener("saveDataState", handleSaveDateState);
  }, []);

  const pathName = usePathname();

  const toggleSidebar = () => {
    document.getElementById("sidebar")?.classList.toggle("open");
    document.getElementById("overlay")?.classList.toggle("open");
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      profile: "avatar.svg",
      user: "Brooklyn Simmons",
      message:
        'recommended this online shop to byu electronics, <strong class="text-black">Advantage Electric</strong>',
      time: "5 minutes ago",
      shop: "Advantage Electric",
    },
    {
      id: 2,
      profile: "avatar-two.svg",
      user: "Sophia Williams",
      message:
        'invites you ABC.fig file with you, <strong class="text-black">check item now</strong>',
      time: "10 minutes ago",
      shop: "New item",
    },
    {
      id: 3,
      profile: "avatar-three.svg",
      user: "Ava Davis",
      message:
        'changed <strong class="text-black">the cosmetic payment</strong> due date to Sunday 05 March 2023',
      time: "15 minutes ago",
      shop: "New item",
    },
  ]);

  const removeNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-white px-4 py-[10px] shadow-sm lg:px-5">
      <div className="flex items-center justify-between gap-5">
        <Link href="/" className="inline-block shrink-0 lg:ml-2.5">
          <Image
            src="/logo/logo-header.png"
            width={145}
            height={34}
            alt="Logo"
            className="h-auto w-32 lg:w-[145px]"
          />
        </Link>

        <Link href="/">
          <Image
            src="/logo/logo-header-admin.png"
            width={170}
            height={45}
            alt="Logo"
            className=""
          />
        </Link>

        <div className="inline-flex items-center gap-3 sm:gap-5">
          <div className="hidden lg:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="group flex cursor-pointer items-center gap-2.5 rounded-lg [&[data-state=open]>button>svg]:rotate-180">
                  <div className="size-8 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src="/logo/logo-vnrelief.png"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                      alt="Profile Img"
                    />
                  </div>
                  <div className="hidden space-y-[2px] lg:block">
                    <h5 className="line-clamp-1 text-[12px]/3 font-medium">
                      Chào mừng,
                    </h5>
                    <h2 className="line-clamp-1 text-xs font-bold text-green-600">
                      Đức Hậu
                    </h2>
                  </div>
                  <button
                    type="button"
                    className=" text-black transition group-hover:opacity-70"
                  >
                    <ChevronDown className="h-4 w-4 shrink-0 duration-300" />
                  </button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={12}
                className="min-w-[200px] space-y-1 rounded-lg p-1.5 text-sm font-medium"
              >
                <DropdownMenuItem className="p-0">
                  <Link
                    href="/"
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 ${
                      pathName === "/" && "!bg-gray-400 !text-black"
                    }`}
                  >
                    <Undo2 className="size-[18px] shrink-0" />
                    Quay lại trang thông tin
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 ${
                      pathName === "/dang-xuat" && "!bg-gray-400 !text-black"
                    }`}
                  >
                    <LogOut className="size-[18px] shrink-0" />
                    Đăng xuất
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <button
            type="button"
            className="order-3 duration-300 hover:opacity-80 lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
