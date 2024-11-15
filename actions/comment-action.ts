'use server'
import prisma from "@/lib/db"

export const getAllComments = async (postId: string) => {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        User: {
          select: {
            username: true,
            image: true,
            updatedAt: true,
          },
        },
        children: {
          include: {
            User: {
              select: {
                username: true,
                image: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
    return comments;
  };

export const createComment=async({ postId, body, parentId, userId }:{ postId:string,body:string, parentId?:string, userId:string })=>{
    return await prisma.comment.create({
        data:{
            userId,
            ...(parentId ? {parentId} : {}),
            body,
            postId
        }
    })
}