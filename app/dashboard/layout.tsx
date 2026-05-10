"use client"

import { ReactNode } from "react";

import Header from "@/components/layout/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Sidepanel } from "@/components/layout/Sidepanel";
import { ProtectedLayout } from "@/components/auth/ProtectedLayout";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedLayout>
      <SidebarProvider>
        <Sidepanel />
        <SidebarInset>
          <Header />
          <main className="flex-1 overflow-y-auto w-full">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedLayout>
  );
}