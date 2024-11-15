'use server'
import Groq from "groq-sdk"

const AIKEY=process.env.AI_KEY

const groq=new Groq({
    apiKey:AIKEY,
})

export const requestToAI=async(message:string)=>{
    const reply=await groq.chat.completions.create({
        messages:[
            {
                role:"user",
                content:message
            }
        ],
        model:'llama3-70b-8192'
    })
    return reply.choices[0].message.content
}
