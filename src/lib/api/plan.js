import { serverFetch } from "../core/server"

export const getPlanByPlanId = async(plan_id)=>{
    return serverFetch(`/api/plan?plan_id=${plan_id}`)
}