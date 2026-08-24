'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import { ShieldExclamation, House, ArrowLeft } from '@gravity-ui/icons';

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center p-6 text-zinc-100 relative overflow-hidden">
            {/* Background Subtle Radial Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-md w-full text-center relative z-10 space-y-6">
                {/* Icon & Status Badge */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-rose-950/40 border border-rose-800/50 flex items-center justify-center text-rose-500 shadow-lg shadow-rose-950/20">
                        <ShieldExclamation width={32} height={32} />
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-rose-950/50 border border-rose-800/40 text-rose-400">
                        Error 403
                    </span>
                </div>

                {/* Messaging */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Access Restricted
                    </h1>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        You don't have the required permissions to view this page. If you believe this is a mistake, please contact your administrator.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-3 pt-2">
                    <Button
                        size="md"
                        variant="bordered"
                        onPress={() => window.history.back()}
                        className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 font-medium"
                    >
                        <ArrowLeft width={16} height={16} className="mr-1" />
                        Go Back
                    </Button>

                    <Button
                        as={Link}
                        href="/"
                        size="md"
                        className="bg-zinc-100 hover:bg-white text-zinc-950 font-semibold"
                    >
                        <House width={16} height={16} className="mr-1" />
                        Return Home
                    </Button>
                </div>
            </div>
        </div>
    );
}