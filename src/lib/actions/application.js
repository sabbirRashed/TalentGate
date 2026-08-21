"use server"

import { serverMutation } from "../core/server"

export const submitApplication = async(applicantsData)=>{
    return serverMutation(`/api/application`, applicantsData);
}