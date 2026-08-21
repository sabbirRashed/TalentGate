import AccessDenied from "@/components/jobs/AccessDeniedUser";
import { getJobsById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getApplicationByApplicant } from "@/lib/api/application";


const ApplyJobs = async ({ params }) => {
    const { jobid } = await params;

    const user = await getUserSession();
    console.log(user);

    if (!user) {
        redirect(`/login?redirect=/jobs/${jobid}/apply`);
    }

    if (user?.role !== "seeker") {
        return <AccessDenied user={user}/>
    }

    const applications = await getApplicationByApplicant(user?.id)
    const job = await getJobsById(jobid);

    return (
        <div>
            <JobApply job={job} applicant={user}/>
        </div>
    );
};

export default ApplyJobs;