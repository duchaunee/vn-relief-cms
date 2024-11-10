"use client";

import * as React from "react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Image
                src={"/logo/logo-vnrelief.png"}
                alt="logo-relief"
                width={38}
                height={38}
                className="rounded-md"
              ></Image>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">VNRelief</span>
                <span className="truncate text-xs">
                  Nền tảng cứu trợ thiên tai
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
