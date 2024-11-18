'use server'
import prisma from "@/lib/db";
import { createSlug } from "@/lib/utils";
import PostSchema from "@/schema/post-schema";
import { Post } from "@/schema/post-types";


export const createPost=async(data:Partial<Post>)=>{
    try {
        const validatePost=PostSchema.validatePostSchema(data);
        if(!validatePost.success) throw new Error(validatePost.error.message);
        
        const slug=createSlug(data.title as string)

        await prisma.post.create({
            data:{
                title:data.title as string,
                description:data.description as string,
                image:data.image as string,
                slug
            }
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getPostsByPublishedAt=async({ no, limit }:{no?:number, limit?:number})=>{
    try {
        const posts=await prisma.post.findMany({
            orderBy:{
                published:'desc'
            },
            skip:(no && (no-1) * 10),
            take:limit || 10
        })
        return posts
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getLengthAllPosts=async()=>{
    return await prisma.post.count()
}