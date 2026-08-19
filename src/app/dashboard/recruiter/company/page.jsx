import { getUserSession } from '@/lib/core/session';
import CompanyProfile from './CompanyProfile';

const CompanyPage = async() => {

    const user = await getUserSession();
    console.log('userSession:', user);
    return (
        <div>
            <CompanyProfile recruiter={user}/>
        </div>
    );
};

export default CompanyPage;