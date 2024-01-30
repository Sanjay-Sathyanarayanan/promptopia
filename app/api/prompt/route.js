import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async(req,res)=>{
    try{
        await connectToDB();
    const allPrompts = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(allPrompts), {status:201})
    }catch(error){
        console.log(error);
        return new Response('Failed to get the prompts from the database.', {status:500})
    }

}