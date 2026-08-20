import { getAllJobs } from "@/lib/api/jobs";
import JobClientWrapper from "@/components/jobs/JobClientWrapper";

export default async function JobsPage() {
    const jobs = (await getAllJobs()) || [];

    return (
        <div className="bg-zinc-950 text-zinc-100 min-h-screen px-4 py-12 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Page Header / Hero Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-8">
                    <div className="space-y-2 max-w-2xl">
                        <span className="text-xs font-semibold tracking-widest text-pink-500 uppercase">
                            Careers Portal
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                            Explore Opportunities
                        </h1>
                        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                            Discover engineering roles across high-performance computing, AI, and systems architecture.
                        </p>
                    </div>

                    {/* Job Counter / Quick Stats */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <div className="flex flex-col">
                                <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                                    Active Openings
                                </span>
                                <span className="text-xl font-bold text-white">
                                    {jobs.length} {jobs.length === 1 ? 'Position' : 'Positions'}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Interactive Client-side Filter & Grid Section */}
                <main>
                    <JobClientWrapper initialJobs={jobs} />
                </main>

            </div>
        </div>
    );
}