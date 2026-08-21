"use server"

import { serverMutation } from "../core/server"

export const createNewCompany = async(newCompanyData, status="pending")=>{
    return serverMutation('/api/companies', newCompanyData)
}
