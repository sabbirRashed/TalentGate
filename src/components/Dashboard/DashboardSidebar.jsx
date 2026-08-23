
import { House, Briefcase, SquarePlus, Magnifier, Envelope, Gear, LayoutSideContentLeft, Bookmark, FileText, CreditCard, Persons, CircleCheck, ChartColumn } from "@gravity-ui/icons";
import { BiBuilding, BiBuildings } from "react-icons/bi";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";

export async function DashboardSidebar() {
    const user = await getUserSession();

    const recruiterNavLinks = [
        { icon: House, href: "/dashboard/recruiter", label: "Home" },
        { icon: Briefcase, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: SquarePlus, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
        { icon: BiBuildings, href: "/dashboard/recruiter/company", label: "Company Profile" },
        { icon: Magnifier, href: "/dashboard/recruiter", label: "Search" },
        { icon: Envelope, href: "/dashboard/recruiter", label: "Messages" },
        { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
    ];

    const jobSeekerNavItems = [
        { icon: House, href: "/dashboard/seeker", label: "Dashboard" },
        { icon: Magnifier, href: "/dashboard/seeker/jobs", label: "Jobs" },
        { icon: Bookmark, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs" },
        { icon: FileText, href: "/dashboard/seeker/applications", label: "Applications" },
        { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
        { icon: Gear, href: "/dashboard/seeker/settings", label: "Settings" },
    ];

    const adminNavLinks = [
        { icon: House, href: "/dashboard/admin", label: "Overview" },
        { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Manage Jobs" },
        { icon: Persons, href: "/dashboard/admin/users", label: "Manage Users" },
        { icon: CircleCheck, href: "/dashboard/admin/applications", label: "Applications" },
        { icon: BiBuilding, href: "/dashboard/admin/companies", label: "Companies" },
        { icon: ChartColumn, href: "/dashboard/admin/analytics", label: "Analytics" },
        { icon: FileText, href: "/dashboard/admin/logs", label: "Audit Logs" },
        { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
    ];

    const navlinksMap = {
        seeker: jobSeekerNavItems,
        recruiter: recruiterNavLinks,
        admin: adminNavLinks
    }

    const navItems = navlinksMap[user?.role]


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