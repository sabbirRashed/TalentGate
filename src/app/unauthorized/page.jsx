import Link from 'next/link'
import { Button } from '@heroui/react'
import { Lock, ArrowRight, ArrowLeft, ShieldCheck } from '@gravity-ui/icons'

export default function Unauthorized() {
    return (
        <main className="relative min-h-screen w-full bg-[#09090B] text-white flex flex-col justify-between overflow-hidden selection:bg-rose-500/30">

            {/* Background Layer: Radial Gradients & Subtle Grid */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-rose-600/15 via-violet-600/10 to-transparent blur-[130px] rounded-full" />
                <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full" />

                {/* Grid Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                        backgroundSize: '24px 24px'
                    }}
                />
            </div>

            {/* Header Brand Anchor */}
            <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center font-extrabold text-xs">
                        SR
                    </div>
                    <span>Platform</span>
                </Link>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <span>Secure Authorization System</span>
                </div>
            </header>

            {/* Hero Main Content */}
            <section className="relative z-10 w-full max-w-3xl mx-auto px-6 py-12 text-center my-auto space-y-8">

                {/* Security Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 backdrop-blur-md">
                    <Lock size={14} className="text-rose-400" />
                    <span className="text-xs font-semibold text-rose-300 uppercase tracking-widest">
                        Error 401 — Access Restricted
                    </span>
                </div>

                {/* Typography Hierarchy */}
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
                        Authentication Required
                    </h1>
                    <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto font-normal leading-relaxed">
                        You do not have active permission to view this resource. Please sign in with an authorized account or navigate back to safety.
                    </p>
                </div>

                {/* Interactive Actions */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                    <Link href="/login" className="w-full sm:w-auto min-w-[160px]">
                        <Button
                            size="lg"
                            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-xs rounded-xl shadow-xl shadow-blue-900/20 hover:opacity-90 transition-all"
                        >
                            Sign In
                            <ArrowRight size={16} />
                        </Button>
                    </Link>

                    <Link href="/" className="w-full sm:w-auto min-w-[160px]">
                        <Button
                            size="lg"
                            className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 backdrop-blur-md transition-all"
                        >
                            <ArrowLeft size={16} />
                            Return Home
                        </Button>
                    </Link>
                </div>

                {/* System Reference Bar */}
                <div className="pt-8 flex items-center justify-center gap-6 text-[11px] text-gray-500 border-t border-white/5 max-w-lg mx-auto">
                    <span>Session ID: <code className="text-gray-400">0x401_UNAUTH</code></span>
                    <span>•</span>
                    <span>Status: <span className="text-rose-400">401 Forbidden</span></span>
                </div>

            </section>


        </main>
    )
}