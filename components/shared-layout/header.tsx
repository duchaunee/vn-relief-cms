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
      <div className={`flex items-center gap-3 ${isMobile ? "flex-1" : ""}`}>
        <SidebarTrigger
          className="h-9 w-9 bg-icon text-muted-foreground hover:bg-icon-hover/background"
          size="icon"
        />
        <Image
          src={"/logo/logo-header.png"}
          alt="logo-relief"
          width={120}
          height={120}
          className="rounded-md"
        ></Image>
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
