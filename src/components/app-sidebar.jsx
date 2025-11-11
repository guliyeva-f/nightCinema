"use client"

import * as React from "react"
import {
  Settings2,
  Clapperboard,
  Image,
  Languages,
  Plus,
  Theater,
  Trash,
  Users,
  UserStar,
  Watch,
  Moon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ScrollArea } from "./ui/scroll-area"

export const data = {
  user: {
    name: "Admin",
    email: "admin@mail.ru",
    avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  },
  teams: [
    {
      name: "Admin Panel",
      logo: Moon,
      plan: "Night Cinema",
    }
  ],
  navMain: [
   {
      title: "Movies",
      url: "/admin/movies/add-movie",
      icon: Clapperboard,
      isActive: true,
      items: [
        {
          title: "Add Movie",
          url: "/admin/movies/add-movie",
          icon: Plus,
        },
        {
          title: "Edit & Delete Movie",
          url: "/admin/movies/edit-delete-movie",
          icon: Settings2,
        },
        // {
        //   title: "Delete Movie",
        //   url: "/admin/movies/delete-movie",
        //   icon: Trash,
        // },
      ],
    },
    {
      title: "Users",
      url: "/admin/users/add-user",
      icon: Users,
      items: [
        // {
        //   title: "Add User",
        //   url: "/admin/users/add-user",
        //   icon: Plus,
        // },
        // {
        //   title: "Edit User",
        //   url: "/admin/users/edit-user",
        //   icon: Settings2,
        // },
        {
          title: "Delete User",
          url: "/admin/users/delete-user",
          icon: Trash,
        },
      ],
    },
    {
      title: "Sessions",
      url: "/admin/sessions/add-session",
      icon: Watch,
      items: [
        {
          title: "Add Session",
          url: "/admin/sessions/add-session",
          icon: Plus,
        },
        {
          title: "Edit Session",
          url: "/admin/sessions/edit-session",
          icon: Settings2,
        },
        {
          title: "Delete Session",
          url: "/admin/sessions/delete-session",
          icon: Trash,
        },
      ],
    },
    {
      title: "Rooms",
      url: "/admin/rooms/add-room",
      icon: Theater,
      items: [
        {
          title: "Add Room",
          url: "/admin/rooms/add-room",
          icon: Plus,
        },
        {
          title: "Delete Room",
          url: "/admin/rooms/delete-room",
          icon: Trash,
        },
      ],
    },
    {
      title: "Photos",
      url: "/admin/photos/add-photo",
      icon: Image,
      items: [
        {
          title: "Add Photo",
          url: "/admin/photos/add-photo",
          icon: Plus,
        },
        {
          title: "Delete Photo",
          url: "/admin/photos/delete-photo",
          icon: Trash,
        },
      ],
    },
    {
      title: "Admins",
      url: "/admin/admins/add-admin",
      icon: UserStar,
      items: [
        {
          title: "Add Admin",
          url: "/admin/admins/add-admin",
          icon: Plus,
        },
        {
          title: "Edit Admin",
          url: "/admin/admins/edit-admin",
          icon: Settings2,
        },
        {
          title: "Delete Admin",
          url: "/admin/admins/delete-admin",
          icon: Trash,
        },
      ],
    },
    {
      title: "Languages",
      url: "/admin/languages/add-language",
      icon: Languages,
      items: [
        {
          title: "Add Language",
          url: "/admin/languages/add-language",
          icon: Plus,
        },
        {
          title: "Delete Language",
          url: "/admin/languages/delete-language",
          icon: Trash,
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <ScrollArea>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </ScrollArea>
  );
}