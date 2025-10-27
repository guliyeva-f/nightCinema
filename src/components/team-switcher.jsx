"use client"

import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export function TeamSwitcher({
  teams
}) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link to={'/'}>
          <SidebarMenuButton size="lg"
            className="data-[state=open]:bg-sidebar-accent cursor-pointer data-[state=open]:text-sidebar-accent-foreground px-3 mt-2">
            <div className="bg-red-800 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <activeTeam.logo className="size-6" />
            </div>
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate text-[16px] font-bold">{activeTeam.name}</span>
              <span className="truncate text-xs">{activeTeam.plan}</span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu >
  );
}
