import Carrousel from '@/components/blog/Carrousel'
import ShowAllBlog from '@/components/blog/ShowAllBlog'
import React from 'react'

const page = async() => {
  return (
    <div className='w-full pt-16 pb-28 md:px-8 px-2 overflow-hidden'>
      <Carrousel />
      <ShowAllBlog />
    </div>
  )
}

export default page