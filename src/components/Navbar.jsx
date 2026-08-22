"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Bars, Xmark, Briefcase } from "@gravity-ui/icons";
import { authClient, signOut, } from "@/lib/auth-client";
import { useRouter } from "next/navigation";





export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const navLinks = [
    {
      name: "Browse Jobs",
      href: "/jobs",
    },
    {
      name: "Companies",
      href: "/companies",
    },
    {
      name: "Pricing",
      href: "/plans",
    },
  ];

  const dashboardLinks = {
    seeker: '/dashboard/seeker',
    recruiter: '/dashboard/recruiter'
  }

  if (user?.email) {
    navLinks.push(
      {
        name: "Dashboard",
        href: dashboardLinks[user?.role || 'seeker'],
      }
    )
  }

  useEffect(() => {
    if (!user) return;

    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000)

  }, [user])

  const handleLogOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login')
        }
      }
    })
  }

  return (
    <nav className="sticky top-0 z-50 px-4 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#1b1b1d]/80 px-6 py-4 backdrop-blur-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-violet-600">
            <Briefcase size={20} className="text-white" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="text-blue-500">Talent</span>
            <span className="text-orange-500">Gate</span>
          </h1>
        </Link>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-8 lg:flex">
          {/* Navigation */}
          <ul className="flex items-center gap-10">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-300 transition hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-white/15"></div>

          {isPending ? (
            <span className="text-sm text-white/50">Loading...</span>
          ) : user ? (
            <>
              {
                showWelcome && <span className="text-sm">
                  Welcome, {user.name?.split(" ")[0]} 👋
                </span>
              }

              <Button onClick={handleLogOut} variant="ghost">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
              >
                Sign In
              </Link>

              <Link href="/register">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-violet-600 px-7 font-medium text-white"
                  radius="md"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <Xmark /> : <Bars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${isMenuOpen ? "mt-3 max-h-[500px]" : "max-h-0"
          }`}
      >
        <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-[#1b1b1d]/95 p-6 backdrop-blur-xl">
          <ul className="space-y-5">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-300 transition hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-6 h-px bg-white/10"></div>

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-center font-medium text-violet-400"
            >
              Sign In
            </Link>

            <Button
              as={Link}
              href="/register"
              onPress={() => setIsMenuOpen(false)}
              className="bg-gradient-to-r from-blue-600 to-violet-600 text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}