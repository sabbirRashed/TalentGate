"use client";

import { Button } from "@heroui/react";
import {
    Briefcase,
    Magnifier,
    MapPin,
} from "@gravity-ui/icons";

const trendingJobs = [
    "Product Designer",
    "AI Engineering",
    "DevOps Engineer",
];

export default function HeroContent() {
    return (
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 text-center lg:pt-28">
            {/* Badge */}
            <div className="mb-8 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 backdrop-blur-xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-amber-400">
                    <Briefcase className="h-4 w-4 text-white" />
                </div>

                <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 sm:text-sm">
                    <span className="font-bold text-white">50,000+</span> New Jobs This
                    Month
                </p>
            </div>

            {/* Heading */}
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
                Find Your Dream Job Today
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
                TalentNest connects top talent with world-class companies. Browse
                thousands of curated opportunities and land your next role faster.
            </p>

            {/* Search */}
            <form className="mt-12 flex w-full max-w-4xl flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl lg:flex-row lg:items-center">
                {/* Job */}
                <div className="flex flex-1 items-center gap-3 px-4 py-3">
                    <Magnifier className="h-5 w-5 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Job title, skill or company"
                        className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
                    />
                </div>

                {/* Divider */}
                <div className="mx-3 hidden h-8 w-px bg-white/10 lg:block"></div>

                <div className="my-2 h-px bg-white/10 lg:hidden"></div>

                {/* Location */}
                <div className="flex flex-1 items-center gap-3 px-4 py-3">
                    <MapPin className="h-5 w-5 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Location or Remote"
                        className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
                    />
                </div>

                {/* Search Button */}
                <Button
                    isIconOnly
                    color="primary"
                    className="mt-3 h-14 w-full rounded-xl lg:mt-0 lg:ml-3 lg:w-14"
                >
                    <Magnifier className="h-5 w-5" />
                </Button>
            </form>

            {/* Trending */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                <span className="text-sm text-gray-400">
                    Trending Positions
                </span>

                <div className="flex flex-wrap justify-center gap-3">
                    {trendingJobs.map((job) => (
                        <button
                            key={job}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 transition hover:border-violet-500 hover:bg-violet-500/10 hover:text-white"
                        >
                            {job}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}