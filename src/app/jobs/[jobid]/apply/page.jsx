import AccessDenied from "@/components/jobs/AccessDeniedUser";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";


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

    return (
        <div>
            This is job Apply page.
        </div>
    );
};

export default ApplyJobs;