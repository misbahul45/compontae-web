'use server'
import prisma from "@/lib/db"


export const getLengthNotification=async()=>{
    return await prisma.notification.count()
}

export const createNotification=async(title:string, description:string)=>{
    return await prisma.notification.create({
        data:{
            title,
            body:description
        }
    })
}

export const getAllNotification=async()=>{
    return await prisma.notification.findMany({})
}

export const deletAllNotification=async(userEmail?:string)=>{
    await prisma.notification.deleteMany({
        where:{
            userEmail,
            OR:[
                {userEmail:null},
                {postId:null}
            ]
        }
    })
}