import { Comment } from '@/schema/comment-types'
import Image from 'next/image'
import React from 'react'
import SubShowComment from './SubShowComment'
interface Props extends Comment{}
const ShowComment = ({body, User, children}:Props) => {
    const { username, image }=User  
  return (
    <div>
        <div className='flex items-center gap-2'>
            <Image
                src={image}
                alt={image+username}
                width={40}
                height={40}
                className='rounded-full size-9'
            />
            <p>{username}</p>
        </div>
        <p>{body}</p>
        {children && <SubShowComment children={children} />}
    </div>
  )
}

export default ShowComment