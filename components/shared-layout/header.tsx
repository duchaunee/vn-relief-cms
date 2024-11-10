"use client";

import { Separator } from "@radix-ui/react-separator";

import { ModeToggle } from "@/components/button/mode-toggle";
import { Login } from "@/components/auth";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CommandMenu } from "@/components/shared-layout/command/command-dialog";

import { useIsMobile } from "@/hooks/use-mobile";
import { useIsClient } from "@/hooks/use-client";

export const Header = () => {
  const isMobile = useIsMobile();
  const isClient = useIsClient();

  return (
    <header className="sticky top-0 right-0 flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-header transition-[width,height] ease-linear">
      <div className={`flex items-center gap-2 ${isMobile ? "flex-1" : ""}`}>
        <SidebarTrigger
          className="h-9 w-9 bg-secondary text-muted-foreground"
          size="icon"
        />
        <Separator orientation="vertical" className="mr-[2px] h-4" />
        <Button className="bg-red-600 text-white hover:bg-red-500">
          Cần cứu hộ khẩn cấp
        </Button>
      </div>
      <div className="flex items-center gap-3 ml-auto">
        {isClient && !isMobile && <CommandMenu />}
        <Login />
        <ModeToggle />
      </div>
    </header>
  );
};
