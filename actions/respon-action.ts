'use server'
import prisma from "@/lib/db"
import { RespondenSchema } from "@/schema/responden-schema"

export const createRespon=async(respon:RespondenSchema)=>{
    try {
        await prisma.survei.create({
            data:{
                name:respon.name,
                respon:respon.respon,
                rating:Number(respon.rating),
                image:respon.image
            }
        })
        return true
    } catch (error) {
        if(error){
            return false
        }
    }
}

export const fetchResponden = async () => {
    try {
        return await prisma.survei.findMany({
            take: 6,
            orderBy: {
                createdAt: 'desc',
            },
        });
    } catch (error) {
        console.error('Error fetching responden:', error);
        return [];
    }
};

export const getTextRespon=async()=>{
    try {
        const respon=await prisma.survei.findMany({
            select:{
                respon:true
            }
        })
        return respon
    } catch (error) {
        console.log(error)
        return null
    }
}