"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Input } from "@heroui/react";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        setLoading(true);

        const form = new FormData(e.currentTarget);

        const formData = Object.fromEntries(form.entries());

        console.log(formData);

        // Better Auth Here

        setLoading(false);
    };

    return (
        <section className="min-h-screen bg-[#09090B] px-4 py-10">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl">
                <div className="grid lg:grid-cols-2">
                    {/* ================= LEFT SIDE ================= */}

                    <div
                        className="relative hidden min-h-[700px] lg:flex"
                        style={{
                            backgroundImage: "url('/images/globe.png')",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                        }}
                    >
                        <div className="absolute inset-0 bg-black/70" />

                        <div className="relative z-10 flex h-full flex-col justify-between p-8">
                            <div>
                                <Link href="/">
                                    <h1 className="text-3xl font-extrabold">
                                        <span className="text-blue-500">Talent</span>
                                        <span className="text-orange-500">Nest</span>
                                    </h1>
                                </Link>

                                <div className="mt-20">
                                    <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                                        Join Thousands of Professionals
                                    </span>

                                    <h2 className="mt-6 text-4xl font-bold leading-tight text-white">
                                        Start Your Career
                                        <br />
                                        Journey Today.
                                    </h2>

                                    <p className="mt-5 max-w-md leading-8 text-gray-300">
                                        Create your account to discover exciting opportunities,
                                        connect with recruiters, and manage your applications in
                                        one place.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <h3 className="text-3xl font-bold text-white">50K+</h3>
                                    <p className="mt-2 text-gray-400">Jobs</p>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold text-white">12K+</h3>
                                    <p className="mt-2 text-gray-400">Companies</p>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold text-white">2M+</h3>
                                    <p className="mt-2 text-gray-400">Candidates</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ----------------RIGHT SIDE-----------------*/}

                    <div className="flex items-center justify-center p-8 md:p-10">
                        <div className="w-full max-w-md">
                            {/* Mobile Logo */}

                            <div className="mb-8 text-center lg:hidden">
                                <Link href="/">
                                    <h1 className="text-3xl font-extrabold">
                                        <span className="text-blue-500">Talent</span>
                                        <span className="text-orange-500">Gate</span>
                                    </h1>
                                </Link>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white">
                                    Create Account
                                </h2>

                                <p className="mt-2 text-gray-400">
                                    Join TalentNest and discover your next opportunity.
                                </p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-5">
                                <Input
                                    name="name"
                                    label="Full Name"
                                    placeholder="John Doe"
                                    variant="bordered"
                                    className='w-full'
                                />

                                <Input
                                    name="email"
                                    type="email"
                                    label="Email Address"
                                    placeholder="john@example.com"
                                    variant="bordered"
                                    className='w-full'
                                />

                                <Input
                                    name="password"
                                    type="password"
                                    label="Password"
                                    placeholder="••••••••"
                                    variant="bordered"    
                                    className='w-full'
                                />

                                <Input
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                    placeholder="••••••••"
                                    variant="bordered"
                                    size={'lg'}
                                    className='w-full'
                                />

                                <Button
                                    type="submit"
                                    isLoading={loading}
                                    fullWidth
                                    className="bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                                >
                                    Create Account
                                </Button>

                                {/* Divider */}

                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/10"></div>
                                    </div>

                                    <div className="relative flex justify-center">
                                        <span className="bg-[#09090B] px-4 text-sm text-gray-500">
                                            OR
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    fullWidth
                                    size="lg"
                                    variant="bordered"
                                    className="border-white/10"
                                    startContent={
                                        <Image
                                            src="/images/google.png"
                                            alt="Google"
                                            width={20}
                                            height={20}
                                        />
                                    }
                                >
                                    Continue with Google
                                </Button>

                                <p className="pt-2 text-center text-sm text-gray-400">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="font-semibold text-violet-400 hover:text-violet-300"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}