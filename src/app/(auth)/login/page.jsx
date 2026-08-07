"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, TextField, Label, Input, FieldError, Spinner } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

const inputClass =
    "w-full border border-white/15 bg-white/5 focus:border-violet-500 transition-colors";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [formMessage, setFormMessage] = useState(null); // { type: "error" | "success", text: string }

    const handleLogin = async (e) => {
        e.preventDefault();
        setFormMessage(null);

        const form = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(form.entries());

        await authClient.signIn.email(
            { email, password },
            {
                onRequest: () => {
                    setIsPending(true);
                },
                onSuccess: () => {
                    setIsPending(false);
                    setFormMessage({ type: "success", text: "Signed in! Redirecting…" });
                    router.push("/");
                },
                onError: (ctx) => {
                    setIsPending(false);
                    setFormMessage({
                        type: "error",
                        text: ctx.error.message || "Invalid email or password.",
                    });
                },
            }
        );
    };

    return (
        <section className="min-h-screen bg-[#09090B] px-4 py-10">
            <div className="mx-auto flex max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl ">
                {/*-------------------- left side-------------------*/}
                <div
                    className="relative min-h-[700px] hidden w-1/2 lg:flex"
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
                            {/* Logo */}
                            <Link href="/">
                                <h1 className="text-3xl font-extrabold">
                                    <span className="text-blue-500">Talent</span>
                                    <span className="text-orange-500">Gate</span>
                                </h1>
                            </Link>

                            <div className="mt-20">
                                <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
                                    Find Your Dream Career
                                </span>

                                <h2 className="mt-6 text-4xl font-bold leading-tight text-white">
                                    Connecting Talent
                                    <br />
                                    with Opportunity.
                                </h2>

                                <p className="mt-5 max-w-md  leading-8 text-gray-300">
                                    Discover thousands of jobs, connect with top companies, and
                                    take the next step toward your career goals.
                                </p>
                            </div>

                        </div>


                        <div>
                            {/* Stats */}
                            <div className=" grid grid-cols-3 gap-6">
                                <div>
                                    <h3 className="text-3xl font-bold text-white">50K+</h3>
                                    <p className="mt-1 text-gray-400">Jobs</p>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold text-white">12K+</h3>
                                    <p className="mt-1 text-gray-400">Companies</p>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold text-white">2M+</h3>
                                    <p className="mt-1 text-gray-400">Candidates</p>
                                </div>
                            </div>

                            <p className="mt-5 text-sm text-gray-500">
                                © {new Date().getFullYear()} TalentGate
                            </p>
                        </div>


                    </div>
                </div>

                {/* ----------- Right Side --------------- */}
                <div className="flex flex-1 items-center justify-center p-8 sm:p-12">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="mb-10 text-center lg:hidden">
                            <Link href="/">
                                <h1 className="text-2xl font-extrabold">
                                    <span className="text-blue-500">Talent</span>
                                    <span className="text-orange-500">Gate</span>
                                </h1>
                            </Link>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-4xl font-bold text-white">
                                Welcome Back 👋
                            </h2>

                            <p className="mt-3 text-gray-400">
                                Sign in to continue your hiring journey.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
                                <Label>Email Address</Label>
                                <Input placeholder="Enter your email" className={inputClass} />
                                <FieldError />
                            </TextField>

                            <TextField
                                name="password"
                                type={showPassword ? "text" : "password"}
                                isRequired
                            >
                                <Label>Password</Label>
                                <div className="relative">
                                    <Input
                                        placeholder="Enter your password"
                                        className={`${inputClass} pr-12`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-default-400"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeSlash /> : <Eye />}
                                    </button>
                                </div>
                                <FieldError />
                            </TextField>

                            <div className="text-right">
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-violet-400 hover:text-violet-300"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {formMessage && (
                                <p
                                    className={`text-sm px-4 py-2 rounded-xl  ${formMessage.type === "error"
                                            ? "bg-rose-500/10 text-rose-500 border border-rose-500 "
                                            : "bg-emerald-600/10 text-emerald-600 border border-emerald-600 "
                                        }`}
                                >
                                    {formMessage.text}
                                </p>
                            )}

                            <Button
                                type="submit"
                                isPending={isPending}
                                isDisabled={isPending}
                                color="primary"
                                size="lg"
                                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                            >
                                {isPending ? (
                                    <>
                                        <Spinner color="current" size="sm" />
                                        Signing in…
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>

                            {/* Divider */}
                            <div className="relative my-2">
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
                                variant="outline"
                                size="lg"
                                className="w-full border-white/10 "
                            >
                                <FcGoogle /> Continue with Google
                            </Button>

                            <p className="pt-3 text-center text-sm text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    href="/register"
                                    className="font-semibold text-violet-400 hover:text-violet-300"
                                >
                                    Create one
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}