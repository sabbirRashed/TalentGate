import { getJobsById } from "@/lib/api/jobs";


const JobDetails = async({params}) => {
    const {jobid} = await params;
    const job = await getJobsById(jobid);
    console.log(job, ":jobdetails");
    
    return (
        <div>
            Hello from job details page.{jobid}
        </div>
    );
};

export default JobDetails;