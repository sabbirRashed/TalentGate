"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Accordion, AccordionItem } from "@heroui/react";
import { CircleCheck, ChevronDown, Thunderbolt, Rocket, Briefcase } from "@gravity-ui/icons";

export default function PricingPage() {
    const [userType, setUserType] = useState("seekers"); // "seekers" | "recruiters"

    const seekerPlans = [
        {
            id: "seeker_free",
            name: "Free",
            price: "$0",
            period: "/forever",
            description: "Essential tools to kickstart your job search and apply to top roles.",
            popular: false,
            ctaText: "Get Started Free",
            features: [
                "Browse & save up to 10 jobs",
                "Apply to up to 3 jobs per month",
                "Basic candidate profile",
                "Standard email alerts",
            ],
        },
        {
            id: "seeker_pro",
            name: "Pro",
            price: "$19",
            period: "/month",
            description: "Accelerate your search with higher application caps and tracking.",
            popular: true,
            ctaText: "Upgrade to Pro",
            features: [
                "Apply to up to 30 jobs per month",
                "Unlimited saved jobs",
                "Advanced application tracking",
                "Real-time salary insights",
                "Standard email alerts",
            ],
        },
        {
            id: "seeker_premium",
            name: "Premium",
            price: "$39",
            period: "/month",
            description: "Maximum visibility and unlimited reach to secure your dream role.",
            popular: false,
            ctaText: "Get Premium",
            features: [
                "Everything in Pro",
                "Unlimited job applications",
                "Profile boost to top recruiters",
                "Early access to newly posted jobs",
                "Priority 24/7 customer support",
            ],
        },
    ];

    const recruiterPlans = [
        {
            id: "recruiter_free",
            name: "Free",
            price: "$0",
            period: "/forever",
            description: "Perfect for early startups testing the waters and posting initial roles.",
            popular: false,
            ctaText: "Start Hiring Free",
            features: [
                "Up to 3 active job posts",
                "Basic applicant management",
                "Standard listing visibility",
                "Great for first year of hiring",
            ],
        },
        {
            id: "recruiter_growth",
            name: "Growth",
            price: "$49",
            period: "/month",
            description: "Designed for growing teams needing steady pipeline and tracking.",
            popular: true,
            ctaText: "Scale with Growth",
            features: [
                "Up to 10 active job posts",
                "Full applicant tracking system (ATS)",
                "Basic recruitment analytics",
                "Dedicated email support",
                "Standard listing visibility",
            ],
        },
        {
            id: "recruiter_enterprise",
            name: "Enterprise",
            price: "$149",
            period: "/month",
            description: "Comprehensive platform features for scaling organizations and agencies.",
            popular: false,
            ctaText: "Get Enterprise",
            features: [
                "Up to 50 active job posts",
                "Advanced analytics & reporting dashboard",
                "Featured job listing placement",
                "Team collaboration & permission roles",
                "Custom company branding",
                "Priority 24/7 support",
            ],
        },
    ];

    const currentPlans = userType === "seekers" ? seekerPlans : recruiterPlans;

    const faqs = [
        {
            question: "Can I cancel my subscription at any time?",
            answer: "Yes, absolutely. You can cancel or downgrade your subscription at any time directly from your account settings. You will maintain full access to your paid plan features until the end of your current billing cycle.",
        },
        {
            question: "What is your refund policy?",
            answer: "We offer a 7-day money-back guarantee for all initial paid plan upgrades if you are not completely satisfied with our service. Contact our support team within 7 days of purchase for a hassle-free refund.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major international credit and debit cards (Visa, Mastercard, American Express), as well as digital payments via Stripe.",
        },
        {
            question: "How does switching between plans work?",
            answer: "When you upgrade or downgrade your plan, your billing will be prorated automatically. Upgrades take effect immediately, while downgrades take effect at the start of the next billing cycle.",
        },
    ];

    return (
        <section className="min-h-screen bg-[#09090B] text-white px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-16">

                {/* Page Header */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-300 inline-block">
                        Flexible Pricing
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                        Simple, Transparent Plans for Everyone
                    </h1>
                    <p className="text-base text-gray-400">
                        Choose the right plan tailored to your career goals or hiring needs.
                    </p>

                    {/* Interactive Toggle */}
                    <div className="pt-6 flex justify-center">
                        <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                            <button
                                type="button"
                                onClick={() => setUserType("seekers")}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${userType === "seekers"
                                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                <Briefcase size={16} />
                                For Job Seekers
                            </button>
                            <button
                                type="button"
                                onClick={() => setUserType("recruiters")}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${userType === "recruiters"
                                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                <Rocket size={16} />
                                For Recruiters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {currentPlans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative flex flex-col justify-between rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300 ${plan.popular
                                ? "bg-white/5 border-violet-500/50 shadow-2xl shadow-violet-500/10 scale-105 z-10"
                                : "bg-white/3 border-white/10 hover:border-white/20"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-3.5 py-1 text-xs font-semibold text-white shadow-md">
                                        <Thunderbolt size={12} /> Most Popular
                                    </span>
                                </div>
                            )}

                            <div>
                                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                <p className="mt-2 text-xs text-gray-400 min-h-[32px]">{plan.description}</p>

                                <div className="mt-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold tracking-tight text-white">
                                        {plan.price}
                                    </span>
                                    <span className="text-sm font-medium text-gray-400">{plan.period}</span>
                                </div>

                                <div className="my-6 border-t border-white/10" />

                                <ul className="space-y-3.5 text-xs text-gray-300">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3">
                                            <CircleCheck size={16} className="text-violet-400 shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 pt-4">
                                <form action="/api/checkout_sessions" method="POST">
                                    <input type="hidden" name="plan_id" value={plan.id} />
                                    <section>
                                        <button type="submit" role="link"
                                            className={`px-4 py-3  w-full font-semibold text-sm rounded-xl transition-all ${plan.popular
                                                ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg hover:opacity-90"
                                                : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                                                }`}>
                                            {plan.ctaText}
                                        </button>
                                    </section>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Accordion Section */}
                <div className="max-w-3xl mx-auto pt-10 space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
                        <p className="text-sm text-gray-400">Everything you need to know about billing and management.</p>
                    </div>

                    <Accordion
                        variant="splitted"
                        className="px-0 gap-4"
                        itemClasses={{
                            base: "bg-white/3 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-2 transition-colors hover:border-white/20",
                            title: "text-base font-semibold text-white",
                            subtitle: "text-xs text-gray-400",
                            trigger: "py-4",
                            content: "text-xs text-gray-300 leading-relaxed pb-4",
                        }}
                    >
                        {faqs.map((faq, idx) => (
                            <AccordionItem
                                key={idx}
                                aria-label={faq.question}
                                title={faq.question}
                                indicator={<ChevronDown className="text-violet-400" />}
                            >
                                {faq.answer}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

            </div>
        </section>
    );
}