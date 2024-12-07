"use client";

import { Separator } from "@radix-ui/react-separator";

import { ModeToggle } from "@/components/button/mode-toggle";
import { Login } from "@/components/auth";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

import Notification from "@/components/notification/notification";

import { CommandMenu } from "@/components/shared-layout/command/command-dialog";

import { useIsMobile } from "@/hooks/use-mobile";
import { useIsClient } from "@/hooks/use-client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";

export const Header = () => {
  const isMobile = useIsMobile();
  const isClient = useIsClient();

  return (
    <header className="sticky top-0 right-0 lg:mb-0 flex z-[30] h-14 shrink-0 items-center gap-2 px-4 bg-header transition-[width,height] ease-linear border-b border-b-gray-300">
      <div className={`flex items-center gap-2 ${isMobile ? "flex-1" : ""}`}>
        <SidebarTrigger
          className="h-9 w-9 text-black hover:bg-[#f4f4f5]"
          size="icon"
        />
        <Separator
          orientation="vertical"
          className="shrink-0 bg-gray-300 w-[1px] lg:mr-2 h-6"
        />
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
      <div className="flex items-center gap-3 ml-auto">
        {isClient && !isMobile && <CommandMenu />}
        <Notification />
        <Button
          variant="outline"
          className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
        >
          <Link href="/dang-nhap">Đăng nhập</Link>
        </Button>
        {/* <ModeToggle /> */}
      </div>
    </header>
  );
};
