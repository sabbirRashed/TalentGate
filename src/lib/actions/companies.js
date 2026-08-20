"use server"

import { serverMutation } from "../core/server"

export const createNewCompany = async(newCompanyData, status="pending")=>{
    return serverMutation('/api/companies', newCompanyData)
}

// const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
// export const createNewCompany = async(companyData)=>{
//     const res = await fetch(`${serverUrl}/api/companies`, {
//         method: "POST",
//         headers:{
//             "content-type": "application/json",
//         },
//         body: JSON.stringify(companyData)
//     });
//     return res.json();
// }