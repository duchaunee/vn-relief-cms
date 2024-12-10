"use client";

import { Separator } from "@radix-ui/react-separator";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

import Notification from "@/components/notification/notification";

import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import Link from "next/link";
import { dataSidebar } from "@/constants/side-bar";
import { NavUser } from "../nav-user";
import Hotline from "../hotline";
import { cn } from "@/lib/utils";

export const Header = () => {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  return (
    <header className="sticky top-0 right-0 lg:mb-0 flex z-[30] h-14 shrink-0 items-center gap-2 px-4 bg-header transition-[width,height] ease-linear border-b border-b-gray-300">
      <div className={`flex items-center gap-2 ${isMobile ? "flex-1" : ""}`}>
        <SidebarTrigger
          className={cn(
            "h-9 w-9 text-black rounded-md",
            state == "expanded" &&
              "text-blue-600 hover:text-blue-600 bg-blue-50"
          )}
          size="icon"
        />
        <Separator className="shrink-0 bg-gray-300 w-[1px] lg:mr-2 h-6" />
        <Link href="/">
          <Image
            src={"/logo/logo-header.png"}
            alt="logo-relief"
            width={140}
            height={140}
            className="rounded-md mt-[6px]"
          ></Image>
        </Link>
      </div>
      <div className="flex items-center gap-2.5 ml-auto">
        {/* {isClient && !isMobile && <CommandMenu />} */}
        <Hotline />
        <Separator className="shrink-0 bg-gray-300 w-[1px] h-6" />
        <Notification />
        {/* <ButtonSignIn /> */}
        <NavUser user={dataSidebar.user} />
      </div>
    </header>
  );
};
