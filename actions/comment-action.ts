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

   const sendBackComment=comments.filter((c)=>c.parentId===null);
    return sendBackComment;
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

export const fetchDailyCommentGrowth = async () => {
  const startDate = new Date('2024-01-01'); // Tanggal awal analisis
  const endDate = new Date(); // Tanggal sekarang

  const commentGrowth = await prisma.comment.groupBy({
    by: ['createdAt'], // Kelompokkan berdasarkan tanggal
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
    where: {
      createdAt: {
        gte: startDate, // Mulai dari tanggal tertentu
        lte: endDate,   // Hingga tanggal tertentu
      },
    },
  });

  const dailyData = commentGrowth.reduce((acc: Record<string, number>, entry) => {
    const day = entry.createdAt.toISOString().slice(0, 10); // Format ke 'YYYY-MM-DD'
    if (!acc[day]) acc[day] = 0;
    acc[day] += entry._count.id;
    return acc;
  }, {});

  return Object.entries(dailyData).map(([day, count]) => ({
    day,
    count,
  }));
};

export const fetchComments = async () => {
  const comments = await prisma.comment.findMany({
    select: {
      body: true, // Ambil hanya isi komentar
    },
  });

  return comments;
};

export const getLengthAllComment = async () => {
   return await prisma.comment.count();
}
