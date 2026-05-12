"use client"

import { ReactNode } from "react";

import Header from "@/components/layout/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Sidepanel } from "@/components/layout/Sidepanel";
import PageHeader from "@/components/layout/PageHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
      <SidebarProvider>
        <Sidepanel />
        <SidebarInset>
        <Header />
          <main className="flex overflow-y-auto w-full">{children}</main>
        </SidebarInset>
      </SidebarProvider>
  );
}