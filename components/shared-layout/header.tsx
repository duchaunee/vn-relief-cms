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

export const Header = () => {
  const isMobile = useIsMobile();
  const isClient = useIsClient();

  return (
    <header className="lg:sticky fixed w-full top-0 right-0 lg:mb-0 flex z-[20] h-14 shrink-0 items-center gap-2 px-4 bg-header transition-[width,height] ease-linear border-b border-b-gray-300">
      <div className={`flex items-center gap-2 ${isMobile ? "flex-1" : ""}`}>
        <SidebarTrigger
          className="h-9 w-9 bg-icon text-muted-foreground hover:bg-icon-hover/background"
          size="icon"
        />
        <Image
          src={"/logo/logo-center.png"}
          alt="logo-relief"
          width={140}
          height={140}
          className="rounded-md mt-3"
        ></Image>
      </div>
      <div className="flex items-center gap-3 ml-auto">
        {isClient && !isMobile && <CommandMenu />}
        <Notification />
        <Login />
        {/* <ModeToggle /> */}
      </div>
    </header>
  );
};
