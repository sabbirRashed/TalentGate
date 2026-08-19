"use server"

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const serverMutation = async(api, data)=>{
    const res = await fetch(`${serverUrl}${api}`, {
        method: "POST",
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return res.json();
}