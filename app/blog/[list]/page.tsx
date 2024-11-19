import { getPostsByPublishedAt } from '@/actions/post-action'
import Carrousel from '@/components/blog/Carrousel'
import FormSearch from '@/components/blog/FormSearch'
import ShowAllBlog from '@/components/blog/ShowAllBlog'
import { Post } from '@/schema/post-types'
import React from 'react'

interface Props{
  params:Promise<{
    list:string
  }>
  searchParams:Promise<{
    type?:string
    search?:string
  }>
}

const page = async({ params, searchParams }: Props) => {
  const { list } = await params
  const { type, search } = await searchParams
  const posts=await getPostsByPublishedAt({
    type,
    search,
    no:Number(list),limit:6
  })
  return (
    <div className='w-full pt-16 pb-28 md:px-8 px-2 overflow-hidden'>
      <Carrousel />
      <FormSearch list={Number(list)} />
      <ShowAllBlog posts={posts as Post[]} list={list} />
    </div>
  )
}

export default page