"use server"

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;


export const serverFetch = async(path)=>{
    const res = await fetch(`${serverUrl}${path}`);
    // handle 401
    return res.json();
}
export const serverMutation = async(path, data)=>{
    const res = await fetch(`${serverUrl}${path}`, {
        method: "POST",
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return res.json();
}