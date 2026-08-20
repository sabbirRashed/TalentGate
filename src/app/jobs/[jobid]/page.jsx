import React from "react";
import { Avatar, Button, Card } from "@heroui/react";
import {
    MapPin,
    Briefcase,
    Display,
    Calendar,
    CircleDollar,
    ArrowRight,
    Check,
} from "@gravity-ui/icons";
import { getJobsById } from "@/lib/api/jobs";

export default async function JobDetailsPage({ params }) {
    const { jobid } = await params;
    const job = await getJobsById(jobid);

    if (!job) {
        return (
            <div className="bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center p-6">
                <p className="text-zinc-400 text-lg">Job listing not found.</p>
            </div>
        );
    }

    const {
        title,
        companyName,
        companyLogo,
        location,
        salaryMin,
        salaryMax,
        currency,
        deadline,
        responsibilities,
        requirements,
        benefits,
        type,
        isRemote,
    } = job;

    // Format salary output
    const formatAmount = (val) => (val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val);
    const currencySymbol = currency === "USD" ? "$" : `${currency} `;
    const salaryText =
        salaryMin && salaryMax
            ? `${currencySymbol}${formatAmount(salaryMin)} – ${currencySymbol}${formatAmount(salaryMax)} / year`
            : "Competitive Salary";

    // Format deadline date
    const formattedDeadline = deadline
        ? new Date(deadline).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "Open until filled";

    return (
        <div className="bg-zinc-950 text-zinc-100 min-h-screen px-4 py-12 sm:px-8 lg:px-12">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header Hero Section */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
                    <div className="flex items-start sm:items-center gap-5">
                        <Avatar className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-800 text-white font-bold shrink-0">
                            <Avatar.Image src={companyLogo} alt={companyName} />
                            <Avatar.Fallback>{companyName?.charAt(0)}</Avatar.Fallback>
                        </Avatar>

                        <div className="space-y-1">
                            <span className="text-sm font-semibold text-pink-500 tracking-wide uppercase">
                                {companyName}
                            </span>
                            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                                {title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-400 pt-1">
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-pink-400" />
                                    {location}
                                </span>
                                <span className="flex items-center gap-1.5 capitalize">
                                    <Display className="w-4 h-4 text-pink-400" />
                                    {isRemote ? "Remote" : type}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Primary Action Button */}
                    <div className="shrink-0">
                        <Button
                            as="a"
                            href={`/jobs/${jobid}/apply`}
                            className="w-full sm:w-auto bg-pink-600 hover:bg-pink-500 text-white font-semibold px-8 py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-pink-600/20"
                        >
                            <span>Apply Now</span>
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Overview Badges Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 flex items-center gap-4">
                        <div className="p-3 bg-zinc-800 rounded-xl text-pink-400 shrink-0">
                            <CircleDollar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Salary Range
                            </p>
                            <p className="text-sm font-bold text-white mt-0.5">{salaryText}</p>
                        </div>
                    </Card>

                    <Card className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 flex items-center gap-4">
                        <div className="p-3 bg-zinc-800 rounded-xl text-pink-400 shrink-0">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Employment Type
                            </p>
                            <p className="text-sm font-bold text-white capitalize mt-0.5">
                                {type} {isRemote ? "(Remote)" : ""}
                            </p>
                        </div>
                    </Card>

                    <Card className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 flex items-center gap-4">
                        <div className="p-3 bg-zinc-800 rounded-xl text-pink-400 shrink-0">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Application Deadline
                            </p>
                            <p className="text-sm font-bold text-white mt-0.5">{formattedDeadline}</p>
                        </div>
                    </Card>
                </div>

                {/* Content Body */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-10 space-y-8">
                    {/* Responsibilities */}
                    {responsibilities && (
                        <section className="space-y-3">
                            <h2 className="text-xl font-bold text-white">Responsibilities</h2>
                            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                                {responsibilities}
                            </p>
                        </section>
                    )}

                    {/* Requirements */}
                    {requirements && (
                        <section className="space-y-3 border-t border-zinc-800/80 pt-8">
                            <h2 className="text-xl font-bold text-white">Requirements</h2>
                            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                                {requirements}
                            </p>
                        </section>
                    )}

                    {/* Benefits */}
                    {benefits && (
                        <section className="space-y-3 border-t border-zinc-800/80 pt-8">
                            <h2 className="text-xl font-bold text-white">Perks & Benefits</h2>
                            <div className="flex flex-wrap gap-3 pt-2">
                                {benefits.split(",").map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="inline-flex items-center gap-2 bg-zinc-800/70 border border-zinc-700/50 px-4 py-2 rounded-xl text-xs sm:text-sm text-zinc-200"
                                    >
                                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span>{benefit.trim()}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

            </div>
        </div>
    );
}