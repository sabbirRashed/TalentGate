import AccessDenied from "@/components/jobs/AccessDeniedUser";
import { getJobsById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";


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

    const job = await getJobsById(jobid);

    return (
        <div>
            This is job Apply page.
            <JobApply job={job} applicant={user}/>
        </div>
    );
};

export default ApplyJobs;