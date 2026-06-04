const backend_endpoint = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function RedeployWebsite(token: string): Promise<string>{
    try{
        const res = await fetch(`${backend_endpoint}api/netlify`, {method: "GET", headers: {
            Authorization: `Bearer ${token}`,
        }})
        const data = await res.json()

        if(!res.ok){
            console.log("Unable to redeploywebsite: " + data.error)
            throw new Error("Unable to redeploywebsite")
        }

        return data.message
    }
    catch(error){
        console.log("Unable to redeploy website: " + error)
        throw new Error("Unable to redeploy website")
    }
} 