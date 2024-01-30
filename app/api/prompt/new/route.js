import { connectToDB } from "@utils/database";
import Prompt   from "@models/prompt";
export const POST = async(req,res)=>{
    const{userId, prompt, tag} = await req.json();
        // console.log(userId, prompt, tag);
    try{
        await connectToDB();
        const newPrompt= new Prompt({
            creator: userId,
            prompt:prompt,
            tag:tag,
        })

        await newPrompt.save();
        // Respose constructor to create the response object.(body, options)
        return new Response(JSON.stringify(newPrompt), {status:201})

    }catch(error){
        console.log(error);
        return new Response("Failed to create prompt", {status:500});
    }
}