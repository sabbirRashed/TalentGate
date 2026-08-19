import { getUserSession } from '@/lib/core/session';
import CompanyProfile from './CompanyProfile';

const CompanyPage = async() => {

    const user = await getUserSession();
   
    return (
        <div>
            <CompanyProfile recruiter={user}/>
        </div>
    );
};

export default CompanyPage;