import JobCard from "@/components/jobs/JobCard";
import { getAllJobs } from "@/lib/api/jobs";

export default async function JobsPage() {
    const jobs = (await getAllJobs()) || [];

    return (
        <div className="bg-zinc-950 p-8 min-h-screen">
            <h2 className="text-2xl font-bold text-white mb-6">
                Jobs ({jobs.length})
            </h2>

            {jobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                    {jobs.map((job) => (
                        <JobCard key={job._id || job.id} job={job} />
                    ))}
                </div>
            ) : (
                <p className="text-zinc-400">No jobs found.</p>
            )}
        </div>
    );
}