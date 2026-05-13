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
          <main className="flex flex-col gap-6 min-h-screen m-4 mx-auto">{children}</main>
        </SidebarInset>
      </SidebarProvider>
  );
}