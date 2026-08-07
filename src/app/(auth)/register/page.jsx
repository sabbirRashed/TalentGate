"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, TextField, Label, Input, FieldError } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

const inputClass =
    "w-full border border-white/15 bg-white/5 focus:border-violet-500 transition-colors";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [formMessage, setFormMessage] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setFormMessage(null)

        setLoading(true);

        const form = new FormData(e.currentTarget);
        const formData = Object.fromEntries(form.entries());

        try {
            const { data, error } = await authClient.signUp.email(formData,
                {
                    onSuccess: () => {
                        setFormMessage({ type: "success", text: "Account created successfully!" });
                    },
                    onError: (ctx) => {
                        setFormMessage({ type: "error", text: ctx.error.message || "Something went wrong. Please try again." });
                    },
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-[#09090B] px-4 py-10">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl backdrop-blur-xl">
                <div className="grid lg:grid-cols-2">
                    {/* -----------------LEFT SIDE----------------- */}

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
                                        <span className="text-orange-500">Gate</span>
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
                                    Join TalentGate and discover your next opportunity.
                                </p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-5">
                                <TextField
                                    name="name"
                                    isRequired
                                    validate={(value) =>
                                        value.trim().length < 2
                                            ? "Name must be at least 2 characters."
                                            : null
                                    }
                                >
                                    <Label>Full name</Label>
                                    <Input
                                        placeholder="Enter your full name"
                                        className={inputClass}
                                    />
                                    <FieldError />
                                </TextField>

                                <TextField
                                    name="email"
                                    type="email"
                                    isRequired
                                    validate={(value) =>
                                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                            ? null
                                            : "Enter a valid email address."
                                    }
                                >
                                    <Label>Email</Label>
                                    <Input
                                        placeholder="Enter your email"
                                        className={inputClass}
                                    />
                                    <FieldError />
                                </TextField>

                                <TextField
                                    name="password"
                                    type="password"
                                    isRequired
                                    validate={(value) =>
                                        value.length < 8
                                            ? "Password must be at least 8 characters."
                                            : null
                                    }
                                >
                                    <Label>Password</Label>
                                    <Input
                                        placeholder="Enter your password"
                                        className={inputClass}
                                    />
                                    <FieldError />
                                </TextField>


                                {
                                    formMessage && <p className={`px-4 py-2 rounded-lg ${formMessage.type === 'success'? "bg-emerald-600/10 text-emerald-600 border border-emerald-600": "bg-rose-500/10 text-rose-500 border border-rose-500 "} `}>{formMessage.text}</p>
                                }

                                <Button
                                    type="submit"
                                    isPending={loading}
                                    isDisabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                                >
                                    {loading ? "Creating Account..." : "Create Account"}
                                </Button>
                            </form>

                            {/* Divider */}

                            <div className="relative py-2 mt-5">
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
                                variant="outline"
                                className="border-white/10 mt-5"
                            >
                                <FcGoogle />   Continue with Google
                            </Button>

                            <p className="pt-2 text-center text-sm text-gray-400 mt-5">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-semibold text-violet-400 hover:text-violet-300"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}