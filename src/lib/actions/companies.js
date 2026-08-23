"use server"

import { revalidatePath } from "next/cache"
import { serverMutation } from "../core/server"

export const createNewCompany = async(newCompanyData, status="pending")=>{
    return serverMutation('/api/companies', newCompanyData)
}

export const updateCompany = async(companyId, data)=>{
    const result = serverMutation(`/api/companies/${companyId}`, data, "PATCH");
    revalidatePath('/dashboard/admin/companies')
    return result;
}
