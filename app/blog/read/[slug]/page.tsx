import Post from '@/components/blog/Post'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/db'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

interface PageProps {
  params:Promise<{
    slug:string
  }>
}


const page = async({ params }: PageProps) => {
  const { slug }=await params
  const cleanSlug = slug.toLowerCase().replace(/[^\w\s-]/g, '');
  const post=await prisma.post.findUnique({
    where:{
      slug:cleanSlug
    },
    include: {
      Comment:{
        include:{
          User:{
            select:{
              username:true,
              image:true,
              updatedAt:true
            }
          }
        }
      }
    }
  })

  const popularPost=await prisma.post.findMany({
    where:{
      slug:{
        not:cleanSlug
      }
    },
    orderBy: {
      Comment: {
        _count: 'desc',
      },
    },
  })

  if(!post) return notFound()

  console.log(slug===popularPost[1].slug)
  return (
    <div className='pt-20 pb-28 space-y-4 gap-4 px-4'>
      <div className='w-full max-w-4xl space-y-4 mx-auto'>
        <h1 className='text-3xl font-bold text-center'>{post?.title}</h1>
        <Image src={post?.image as string} alt={post?.title as string} width={500} height={500} className='w-full h-auto max-h-96 rounded-xl object-cover shadow-xl shadow-slate-700/30' />
        <div dangerouslySetInnerHTML={{ __html: post?.description as string }}/>
      </div>
      <Separator />
      <div>
        <h1 className='mb-4 lg:text-4xl md:text-3xl text-xl font-bold text-center'>Post Terpopuler</h1>
        {popularPost.map((post) => {
          return <Post key={post.id} title={post.title} date={post.published} slug={post.slug} content={post.description} image={post.image} />;
        })}
      </div>
    </div>
  )
}

export default page