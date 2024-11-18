import { getPostsByPublishedAt } from '@/actions/post-action'
import Carrousel from '@/components/blog/Carrousel'
import ShowAllBlog from '@/components/blog/ShowAllBlog'
import { Post } from '@/schema/post-types'
import React from 'react'

interface Props{
  params:Promise<{
    list:string
  }>
}

const page = async({ params }: Props) => {
  const { list } = await params
  const posts=await getPostsByPublishedAt({no:Number(list),limit:6})
  return (
    <div className='w-full pt-16 pb-28 md:px-8 px-2 overflow-hidden'>
      <Carrousel />
      <ShowAllBlog posts={posts as Post[]} />
    </div>
  )
}

export default page