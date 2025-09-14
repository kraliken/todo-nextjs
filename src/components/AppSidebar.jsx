import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { Archive, ClipboardList, FileSpreadsheet, ListTodo, Plus } from "lucide-react";
import Link from "next/link";

export const sidebarLinks = [
    {
        label: "Feladatok",
        icon: <ClipboardList />,
        href: "/",
        colorKey: "",
    },
    {
        label: "Létrehozás",
        icon: <Plus />,
        href: "/todo/create",
        colorKey: "",
    },
    {
        label: "Riportok",
        icon: <FileSpreadsheet />,
        href: "/todo/reports",
        colorKey: "",
    },
    {
        label: "Archív",
        icon: <Archive />,
        href: "/todo/archive",
        colorKey: "",
    }
]

export async function AppSidebar() {

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/">
                                <ListTodo />
                                <span>Todo</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarLinks.map(link => (
                                <SidebarMenuItem key={link.label}>
                                    <SidebarMenuButton asChild>
                                        <Link href={link.href}>
                                            {link.icon}
                                            {link.label}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar >
    )
}