import React from 'react';
import { Card, Button } from '@heroui/react';
import { ShieldExclamation, ArrowLeft, ArrowRight } from '@gravity-ui/icons';
import Link from 'next/link';

export default function AccessDenied({ user }) {
    return (
        <div className="bg-zinc-950 text-zinc-100 min-h-[70vh] flex items-center justify-center px-4 py-12">
            <Card className="max-w-md w-full bg-zinc-900 border border-zinc-800 text-center p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6">

                {/* Icon Badge */}
                <div className="mx-auto w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500">
                    <ShieldExclamation className="w-8 h-8" />
                </div>

                {/* Heading & Subtitle */}
                <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        Seeker Access Only
                    </h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Applications are restricted to Job Seeker accounts.
                        {user?.role ? (
                            <span> You are currently logged in as a <span className="text-pink-400 font-semibold capitalize">{user.role}</span>.</span>
                        ) : (
                            <span> Please log in with a Job Seeker account to apply.</span>
                        )}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Link href={'/jobs'}>
                        <Button
                            variant="flat"
                            className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Jobs</span>
                        </Button>
                    </Link>

                    <Link href={'/dashboard/recruiter'}>
                        <Button
                            className="w-full bg-pink-600 hover:bg-pink-500 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm shadow-lg shadow-pink-600/20"
                        >
                            <span>Dashboard</span>
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

            </Card>
        </div>
    );
}