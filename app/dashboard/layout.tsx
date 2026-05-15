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
          <main
            className="
              min-h-screen
              w-full
              p-[clamp(1rem,2vw,2rem)]
            "
          >
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
  );
}