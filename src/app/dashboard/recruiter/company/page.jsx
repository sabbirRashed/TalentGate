import { getUserSession } from '@/lib/core/session';
import CompanyProfile from './CompanyProfile';
import { getRecruiterCompany } from '@/lib/api/company';

const CompanyPage = async() => {

    const user = await getUserSession();
    const company = await getRecruiterCompany(user?.id)
    console.log(company, ":company");
   
    return (
        <div>
            <CompanyProfile recruiter={user} recruiterCompany={company}/>
        </div>
    );
};

export default CompanyPage;