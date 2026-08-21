import AccessDenied from "@/components/jobs/AccessDeniedUser";
import { getJobsById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getApplicationByApplicant } from "@/lib/api/application";
import Link from "next/link";
import { Briefcase, ArrowRight, ShieldExclamation, Thunderbolt, CircleCheck } from "@gravity-ui/icons";

const ApplyJobs = async ({ params }) => {
    const { jobid } = await params;

    const user = await getUserSession();

    if (!user) {
        redirect(`/login?redirect=/jobs/${jobid}/apply`);
    }

    if (user?.role !== "seeker") {
        return <AccessDenied user={user} />;
    }

    const applications = await getApplicationByApplicant(user?.id);

    // Plan configuration
    const plan = {
        name: "Free Plan",
        maxApplicationPerMonth: 3,
    };

    const job = await getJobsById(jobid);

    const appliedCount = applications?.length || 0;
    const remainingApplications = Math.max(0, plan.maxApplicationPerMonth - appliedCount);
    const hasReachedLimit = appliedCount >= plan.maxApplicationPerMonth;
    const usagePercentage = Math.min(100, (appliedCount / plan.maxApplicationPerMonth) * 100);

    return (
        <section className="min-h-screen bg-[#09090B] text-white py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="border-b border-white/10 pb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-violet-300 bg-violet-500/10 border border-violet-500/30 px-4 py-1.5 rounded-full inline-block mb-3">
                        Job Application
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Applying for <span className="text-gray-300">{job?.title || "Position"}</span>
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        {job?.companyName || "Company"} • {job?.location || "Remote"}
                    </p>
                </div>

                {/* Plan Allowance & Usage Card */}
                <div className="bg-white/3 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3.5">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-violet-400 shrink-0">
                                <Briefcase size={22} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-base font-semibold text-white">
                                        Monthly Application Limit
                                    </h2>
                                    <span className="text-[10px] bg-white/5 text-gray-400 px-2.5 py-0.5 rounded-full font-mono border border-white/10">
                                        {plan.name}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    You have submitted <strong className="text-white font-medium">{appliedCount}</strong> out of{" "}
                                    <strong className="text-white font-medium">{plan.maxApplicationPerMonth}</strong> applications this month.
                                </p>
                            </div>
                        </div>

                        {/* Upgrade CTA Link */}
                        <Link
                            href="/plans"
                            className="inline-flex items-center justify-center gap-2 text-xs font-medium bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-violet-500/30 text-violet-300 hover:text-violet-200 hover:border-violet-500/60 px-4 py-2.5 rounded-xl transition-all group shrink-0"
                        >
                            <Thunderbolt size={15} className="text-violet-400 group-hover:rotate-12 transition-transform" />
                            <span>Upgrade Plan</span>
                            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Usage Progress Bar */}
                    <div className="space-y-2">
                        <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/5">
                            <div
                                className={`h-full transition-all duration-500 rounded-full ${hasReachedLimit
                                        ? "bg-rose-500"
                                        : "bg-gradient-to-r from-blue-600 to-violet-600"
                                    }`}
                                style={{ width: `${usagePercentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-gray-400 font-medium px-0.5">
                            <span>{remainingApplications} remaining this month</span>
                            <span>{usagePercentage.toFixed(0)}% used</span>
                        </div>
                    </div>
                </div>

                {/* Conditional Form or Limit Reached Notice */}
                {!hasReachedLimit ? (
                    <div className="bg-white/3 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                        <JobApply job={job} applicant={user} />
                    </div>
                ) : (
                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-8 text-center space-y-4 backdrop-blur-xl">
                        <div className="w-12 h-12 bg-rose-500/20 border border-rose-500/30 rounded-2xl flex items-center justify-center mx-auto text-rose-400">
                            <ShieldExclamation size={24} />
                        </div>
                        <div className="max-w-md mx-auto space-y-2">
                            <h3 className="text-lg font-semibold text-white">
                                Application Limit Reached
                            </h3>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                You have used all {plan.maxApplicationPerMonth} available job applications for this month on your {plan.name}. Upgrade your plan to submit unlimited applications instantly.
                            </p>
                        </div>
                        <div className="pt-2">
                            <Link
                                href="/plan"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-colors shadow-lg"
                            >
                                View Pricing Plans
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ApplyJobs;