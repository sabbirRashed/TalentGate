import Link from "next/link";
import {
    LogoFacebook,
    LogoLinkedin,
    LogoGithub,
} from "@gravity-ui/icons";

const footerLinks = {
    Product: [
        {
            title: "Job Discovery",
            href: "/jobs",
        },
        {
            title: "Worker AI",
            href: "/ai",
        },
        {
            title: "Companies",
            href: "/companies",
        },
        {
            title: "Salary Data",
            href: "/salary",
        },
    ],

    Navigation: [
        {
            title: "Help Center",
            href: "/help",
        },
        {
            title: "Career Library",
            href: "/career-library",
        },
        {
            title: "Contact",
            href: "/contact",
        },
    ],

    Resources: [
        {
            title: "Brand Guideline",
            href: "/brand",
        },
        {
            title: "Newsroom",
            href: "/newsroom",
        },
    ],
};

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#0b0b0d] text-gray-400">
            <div className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
                    {/* Left */}
                    <div className="space-y-8">
                        {/* Logo */}
                        <Link href="/" className="inline-flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-violet-600">
                                <span className="font-bold text-white">T</span>
                            </div>

                            <h2 className="text-3xl font-extrabold">
                                <span className="text-blue-500">Talent</span>
                                <span className="text-orange-500">Gate</span>
                            </h2>
                        </Link>

                        <p className="max-w-xs leading-8 text-gray-500">
                            The AI-native career platform. Built for people who
                            take their work seriously.
                        </p>

                        {/* Social */}
                        <div className="flex gap-3">
                            {[
                                {
                                    icon: <LogoFacebook />,
                                    href: "#",
                                },
                                {
                                    icon: <LogoGithub />,
                                    href: "#",
                                },
                                {
                                    icon: <LogoLinkedin />,
                                    href: "#",
                                },
                            ].map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 transition hover:bg-violet-600 hover:text-white"
                                >
                                    {item.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold text-violet-400">
                            Product
                        </h3>

                        <ul className="space-y-4">
                            {footerLinks.Product.map((item) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.href}
                                        className="transition hover:text-white"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold text-violet-400">
                            Navigation
                        </h3>

                        <ul className="space-y-4">
                            {footerLinks.Navigation.map((item) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.href}
                                        className="transition hover:text-white"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold text-violet-400">
                            Resources
                        </h3>

                        <ul className="space-y-4">
                            {footerLinks.Resources.map((item) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.href}
                                        className="transition hover:text-white"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-20 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
                    <p>© {new Date().getFullYear()} TalentGate. All rights reserved.</p>

                    <div className="flex gap-6">
                        <Link href="/terms" className="hover:text-white">
                            Terms & Conditions
                        </Link>

                        <Link href="/privacy" className="hover:text-white">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}