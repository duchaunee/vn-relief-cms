import { Separator } from "@radix-ui/react-separator";

import { ModeToggle } from "@/components/button/mode-toggle";
import { Login } from "@/components/auth";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CommandMenu } from "@/components/shared-layout/command/command-dialog";

export const Header = () => {
  return (
    <header className="sticky top-0 right-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-header">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Button className="bg-red-500 text-white">Cần cứu hộ khẩn cấp</Button>
      </div>
      <div className="flex items-center ml-auto">
        {/* <CommandMenu /> */}
        <Login />
        {/* <ModeToggle /> */}
      </div>
    </header>
  );
};
