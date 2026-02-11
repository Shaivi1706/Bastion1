
"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Shield, Home, Database, BarChart3, TrendingUp, Settings, Activity } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs"

const sidebarItems = [
    { title: "Overview", icon: Home, href: "/dashboard" },
    { title: "Schema", icon: Database, href: "/dashboard/schema" },
    { title: "Quality", icon: BarChart3, href: "/dashboard/quality" },
    { title: "Drift", icon: TrendingUp, href: "/dashboard/drift" },
    { title: "Agents", icon: Activity, href: "/dashboard/agents" },
    { title: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r bg-muted/10 p-4 md:flex">
                <div className="flex h-14 items-center border-b px-2 mb-4">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <Shield className="h-6 w-6 text-primary" />
                        <span>Bastion</span>
                    </Link>
                </div>
                <div className="flex-1 space-y-1">
                    {sidebarItems.map((item) => (
                        <Button
                            key={item.href}
                            asChild
                            variant={pathname === item.href ? "secondary" : "ghost"}
                            className={cn("w-full justify-start font-medium", pathname === item.href ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground hover:text-foreground")}
                        >
                            <Link href={item.href}>
                                <item.icon className={cn("mr-2 h-4 w-4", pathname === item.href ? "text-primary" : "text-muted-foreground")} />
                                {item.title}
                            </Link>
                        </Button>
                    ))}
                </div>
                <div className="mt-auto border-t pt-4">
                    <div className="flex items-center justify-between px-2">
                        <p className="text-xs text-muted-foreground">Logged in as</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 px-2">
                        <UserButton afterSignOutUrl="/" />
                        <span className="text-sm font-medium">User</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center border-b bg-background px-6 justify-between">
                    <h1 className="text-lg font-semibold">
                        {sidebarItems.find(i => i.href === pathname)?.title || "Overview"}
                    </h1>
                    <div className="flex items-center gap-4">
                        <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" appearance={{
                            elements: {
                                organizationSwitcherTrigger: "py-2 px-4 border rounded-md hover:bg-muted/50 transition-colors"
                            }
                        }} />
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6 bg-muted/5">
                    {children}
                </main>
            </div>
        </div>
    )
}
