"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Swords,
  Users,
  Ticket,
  Settings,
  Trophy,
  Mail,
  PersonStanding,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// SFL Tailored Admin Links
const adminLinks = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Articles", url: "/admin/articles", icon: Swords },
  { title: "Profile", url: "/admin/profile", icon: Users },
  { title: "Emails", url: "/admin/emails", icon: Mail },
  { title: "Contacts", url: "/admin/contacts", icon: PersonStanding },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon">
      {/* HEADER / LOGO */}
      <SidebarHeader className="flex h-16 items-center justify-center border-b border-border bg-background px-4">
        <Link
          href="/admin"
          className="w-full text-center font-black italic tracking-widest text-primary uppercase"
        >
          <img
            src="/images/ts-brands/ts-logo-min-1.png"
            alt="True Sports Logo"
            className="mx-auto h-auto w-24"
          />
        </Link>
      </SidebarHeader>

      {/* CONTENT & LINKS */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-widest opacity-50">
            Console
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminLinks.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={isActive}
                      tooltip={item.title}
                      size="lg"
                      className={
                        isActive
                          ? "bg-red-600/10 text-red-600 hover:bg-blue-600/20 hover:text-blue-600"
                          : ""
                      }
                    >
                      <item.icon className="h-8 w-8" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <img
        src="/images/ts-brands/ts-logo-min-1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-2 -right-8 w-48 opacity-10 select-none brightness-0"
      />

      <SidebarRail />
    </Sidebar>
  );
}
