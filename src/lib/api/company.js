import { protectedFetch, serverFetch } from "../core/server"
import { getUserSession } from "../core/session";

export const getCompanies = async()=>{
    return protectedFetch('/api/companies');
}


export const getRecruiterCompany = async(recruiterId)=>{
    return protectedFetch(`/api/my/company?recruiterId=${recruiterId}`);
}

export const getLogedInRecruiterCompany = async()=>{
    const user = await getUserSession();
    return getRecruiterCompany(user?.id)
}