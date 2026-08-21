import AccessDenied from "@/components/jobs/AccessDeniedUser";
import { getJobsById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getApplicationByApplicant } from "@/lib/api/application";
import Link from "next/link";


const ApplyJobs = async ({ params }) => {
    const { jobid } = await params;

    const user = await getUserSession();
    console.log(user);

    if (!user) {
        redirect(`/login?redirect=/jobs/${jobid}/apply`);
    }

    if (user?.role !== "seeker") {
        return <AccessDenied user={user} />
    }

    const applications = await getApplicationByApplicant(user?.id);
    const plan = {
        name: 'free',
        maxApplicationPerMonth: 3,

    }
    const job = await getJobsById(jobid);

    return (
        <div>
            <h2 className="">You have applied so far: {applications.length} out of {plan.maxApplicationPerMonth} this month</h2>
            <p>Purchess plan to apply more position. <Link href='/plan'>Plan</Link></p>
            {
                applications.length < plan.maxApplicationPerMonth && (
                    <JobApply job={job} applicant={user} />
                )
            }
        </div>
    );
};

export default ApplyJobs;