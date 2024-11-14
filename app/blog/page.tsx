import Carrousel from '@/components/blog/Carrousel'
import Post from '@/components/blog/Post'
import prisma from '@/lib/db'
import React from 'react'

const page = async() => {
  const popularPost=await prisma.post.findMany({
    orderBy: {
      Comment: {
        _count: 'desc',
      }
    },
  })

  return (
    <div className='w-full pt-16 pb-28 md:px-8 px-2 overflow-hidden'>
      <Carrousel />
      <div className='mt-8 w-full max-w-4xl mx-auto space-y-4'>
        {popularPost.map((post) => {
          return <Post key={post.id} title={post.title} date={post.published} slug={post.slug} content={post.description} image={post.image} />;
        })}
      </div>
    </div>
  )
}

export default page