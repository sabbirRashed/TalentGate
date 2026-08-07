import { Briefcase } from "@gravity-ui/icons";

export default function NewJobsBadge({
    count = "50,000+",
    label = "New Jobs This Month",
}) {
    return (
        <div className="flex w-full max-w-xl items-center justify-center gap-2">
            {/* Left fading line */}
            <span className="h-px flex-1 bg-gradient-to-l from-white/20 to-transparent" />

            {/* Pill */}
            <div className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-3 py-2 pr-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-sm shadow-orange-500/30">
                    <Briefcase className="h-4 w-4 text-white" />
                </span>

                <p className="font-mono text-xs tracking-wide sm:text-sm">
                    <span className="font-bold text-white">{count}</span>{" "}
                    <span className="uppercase tracking-[0.15em] text-gray-400">
                        {label}
                    </span>
                </p>
            </div>

            {/* Right fading line */}
            <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>
    );
}