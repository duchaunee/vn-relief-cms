"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { dataSidebar } from "@/constants/side-bar";
import { Info } from "lucide-react";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="flex-1 border-r border-r-gray-300"
    >
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent className="overflow-clip">
        <NavMain items={dataSidebar.navMain} />
        {/* <NavProjects projects={dataSidebar.projects} /> */}
      </SidebarContent>

      <SidebarFooter className="overflow-clip">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/ve-chung-toi">
              <SidebarMenuButton
                className="h-8"
                tooltip="Chi tiết về VN Relief"
              >
                <Info size={40} />
                <span>Chi tiết về VN Relief</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
