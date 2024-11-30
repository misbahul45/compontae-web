import { getPostsByPublishedAt } from '@/actions/post-action'
import React from 'react'
import ShowAllBlog from '../blog/ShowAllBlog'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Post } from '@prisma/client'

const BlogSection = async() => {
  const posts=await getPostsByPublishedAt({
    no:0,
    limit:4
  })
  return (
    <section className='mt-8 px-4'>
        <h1 className='text-center text-green-700 lg:text-4xl md:text-2xl text-xl font-bold mb-6'>Blog Terbaru</h1>
        <Link href={'/blog/1'} className='flex justify-center items-center text-green-700 text-sm font-semibold group'>
          <p className='group-hover:underline'>Lihat Semua Resouce</p>
          <ChevronRight className='w-4 h-4 ml-1 group-hover:translate-x-1 transition-all duration-100'/>
        </Link>
        <ShowAllBlog getposts={posts as Post[]} list={1} />
    </section>
  )
}

export default BlogSection