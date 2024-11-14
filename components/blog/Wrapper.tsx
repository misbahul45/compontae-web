'use client'
import dynamic from 'next/dynamic';

const CreateBlog = dynamic(() => import('@/components/blog/CreateBlog'), {
    ssr: false,
});

const Wrapper = () => {
  return (
    <div>
        <CreateBlog />
    </div>
  )
}

export default Wrapper