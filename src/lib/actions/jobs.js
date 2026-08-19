"use server"

import { serverMutation } from "../core/server"

export const postNewjob = async(newJobs)=>{
    return serverMutation('/api/jobs', newJobs);
}

// const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
// export const postNewjob = async(newJobs)=>{
//     const res = await fetch(`${serverUrl}/api/jobs`, {
//         method: "POST",
//         headers: {
//             "content-type": "application/json"
//         },
//         body: JSON.stringify(newJobs)
//     });
//     const result = res.json();
//     return result;
// }