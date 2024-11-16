"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { dataSidebar } from "@/constants/side-bar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="flex-1">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={dataSidebar.navMain} />
        {/* <NavProjects projects={dataSidebar.projects} /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={dataSidebar.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
