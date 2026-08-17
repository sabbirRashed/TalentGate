
import { LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
    const navItems = [
        { icon: House, href: "/dashboard/recruiter", label: "Home" },
        { icon: House, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: House, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
        { icon: Person, href: "/dashboard/companyProfile/", label: "Company Profile" },
        { icon: Magnifier, href: "/dashboard/recruiter", label: "Search" },
        { icon: Envelope, href: "/dashboard/recruiter", label: "Messages" },
        { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
    ];

    const sidebarContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                href={item.href}
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                type="button"
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
            {/* Desktop device view */}
            <aside className="hidden w-64 min-h-screen shrink-0 border-r border-default p-4  lg:block">
                {sidebarContent}
            </aside>


            {/* Small device view */}
            <Drawer >
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {sidebarContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}