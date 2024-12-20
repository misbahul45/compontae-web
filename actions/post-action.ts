'use server'
import prisma from "@/lib/db";
import { createSlug } from "@/lib/utils";
import PostSchema from "@/schema/post-schema";
import { Post } from "@/schema/post-types";
import { Prisma } from "@prisma/client";


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

export const getPostsByPublishedAt = async ({
    no,
    limit,
    type,
    search,
  }: { no?: number; limit: number; type?: string; search?: string }) => {
    try {
      const whereCondition = {
        ...(search && {
          title: {
            contains: search.replace(/\s+/g, " "),
            mode: Prisma.QueryMode.insensitive,
          },
        }),
      };
  
      const orderByCondition =
        type === "latest"
          ? { published: "desc" as Prisma.SortOrder }
          : type === "popular"
          ? { Comment: { _count: "desc" as Prisma.SortOrder } }
          : undefined;
  
      const posts = await prisma.post.findMany({
        where: whereCondition,
        orderBy: orderByCondition,
        take: limit,
        skip: no ? (no-1) * limit : 0,
      });
      return posts;
    } catch (error) {
      console.log(JSON.stringify(error));
      return null;
    }
  };
  
  
export const getLengthAllPosts=async()=>{
  try {
    const posts=await prisma.post.count()
    return posts
  } catch (error) {
    console.log(error)
    return null
  }
}