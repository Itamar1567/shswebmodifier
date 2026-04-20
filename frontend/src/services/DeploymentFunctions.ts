const backend_url = "http://localhost:5100/";

export async function RedeployWebsite(): Promise<string>{
    try{
        const res = await fetch(`${backend_url}api/netlify`, {method: "GET"})
        const data = await res.json()

        if(!res.ok){
            console.log("Unable to redeploywebsite: " + data.error)
            throw new Error("Unable to redeploywebsite")
        }

        return data.message
    }
    catch(error){
        console.log("Unable to redeploywebsite: " + error)
        throw new Error("Unable to redeploywebsite")
    }
} 