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
import { useMe } from "@/features/auth/hooks/useMe"

const sidebarItems = [
  { name: "Home", href: "/dashboard/home", icon: Home },
  { name: "Browse", href: "/dashboard/browse", icon: Compass },
  { name: "Assignments", href: "/dashboard/assignments", icon: BookOpen },
  { name: "Submissions", href: "/dashboard/submissions", icon: BookOpen },
  { name: "Reviews", href: "/dashboard/reviews", icon: MessageSquare },
];

export function Sidepanel() {
  const { data: user } = useMe()

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
        <h2 className="text-lg font-bold">
          {user?.name ?? 'Loading...'}
        </h2>
        <p>
          {user?.role ?? ''}
        </p>
       </ SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}