"use server"

import { serverMutation } from "../core/server"

export const postSubscription = async(newSubscription)=>{
    return serverMutation('/api/subscription', newSubscription)
}