'use server'
import prisma from "@/lib/db"
import { RespondenSchema } from "@/schema/responden-schema"

export const createRespon=async(respon:RespondenSchema)=>{
    try {
        await prisma.survei.create({
            data:{
                name:respon.name,
                respon:respon.respon,
                rating:Number(respon.rating)
            }
        })
        return true
    } catch (error) {
        if(error){
            return false
        }
    }
}