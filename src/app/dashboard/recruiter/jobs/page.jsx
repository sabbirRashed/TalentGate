import JobsTable from "@/components/Dashboard/JobsTable";
import { getCompanyJobs } from "@/lib/api/jobs";
import { Card, Button } from "@heroui/react";
import { Briefcase, Plus } from "@gravity-ui/icons";
import Link from "next/link";
import { getLogedInRecruiterCompany } from "@/lib/api/company";

const RecruiterJobs = async () => {
  const company = await getLogedInRecruiterCompany();
  const companyJobs = (await getCompanyJobs(company._id)) || [];


  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Manage All Jobs
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            View, manage, and update your active job openings.
          </p>
        </div>

        {companyJobs.length > 0 && (
          <Link href="/dashboard/recruiter/jobs/new">
            <Button className="bg-white hover:bg-zinc-200 text-black font-semibold text-sm rounded-xl px-4 py-2 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Post New Job
            </Button>
          </Link>
        )}
      </div>

      {/* Conditional Content */}
      {companyJobs.length === 0 ? (
        <Card className="bg-[#18181b] border border-zinc-800/80 p-12 text-center flex flex-col items-center justify-center rounded-2xl shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-400 mb-4">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">No Jobs Posted Yet</h3>
          <p className="text-sm text-zinc-400 max-w-sm mt-1 mb-6">
            You haven't created any job openings for this company yet. Start publishing listings to attract top talent.
          </p>
          <Link href="/dashboard/jobs/new">
            <Button className="bg-white hover:bg-zinc-200 text-black font-semibold text-sm rounded-xl px-5 py-2.5 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create First Job
            </Button>
          </Link>
        </Card>
      ) : (
        <JobsTable jobs={companyJobs} />
      )}
    </div>
  );
};

export default RecruiterJobs;