import { Home, Compass, BookOpen, MessageSquare } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

const sidebarItems = [
  { name: "Home", href: "/dashboard/home", icon: Home },
  { name: "Browse", href: "/dashboard/browse", icon: Compass },
  { name: "Tasks", href: "/dashboard/tasks", icon: BookOpen },
  { name: "Reviews", href: "/dashboard/reviews", icon: MessageSquare },
];

export function Sidepanel() {
  return (
    <Sidebar>
      <SidebarHeader>
        Thesys
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a href={item.href}>
                  <item.icon />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <h2 className="text-lg font-bold">John Doe</h2>
        <p>Role</p>
       </ SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}