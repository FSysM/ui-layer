import { Home, Compass, BookOpen } from "lucide-react";
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
import { useMe } from "@/features/auth/hooks/useMe"

const sidebarItems = [
  { name: "Home", href: "/dashboard/home", icon: Home, public: false },
  { name: "Browse", href: "/dashboard/browse", icon: Compass, public: true },
  { name: "Assignments", href: "/dashboard/assignments", icon: BookOpen, public: true },
  { name: "Submissions", href: "/dashboard/submissions", icon: BookOpen, public: false },
];

export function Sidepanel() {
  const { data: user } = useMe()

  return (
    <Sidebar className="w-64" >
      <SidebarHeader>
        FSysM
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.filter((item) => item.public || user).map((item) => (
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
        <h2 className="text-lg font-bold">
          {user?.name ?? ''}
        </h2>
        <p>
          {user?.role ?? ''}
        </p>
       </ SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}