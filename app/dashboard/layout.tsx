"use client"

import { ReactNode } from "react";

import { Header }  from "@/components/layout/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Sidepanel } from "@/components/layout/Sidepanel";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <Sidepanel />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-y-auto w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}