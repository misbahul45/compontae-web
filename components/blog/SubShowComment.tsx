import { Comment } from '@/schema/comment-types'
import React from 'react'
import Image from 'next/image'
import moment from 'moment'

interface Props {
    childrenComment:Comment[]
}

const SubShowComment = ({ childrenComment, }: Props) => {
  return (
    <div className='border-l-2 border-slate-300 mt-2 pl-2.5 space-y-1'>
      {childrenComment.map((comment)=>(
              <div key={comment.id} className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <Image
                      src={comment.User.image}
                      alt={comment.User.username}
                      width={40}
                      height={40}
                      className='rounded-full size-9'
                  />
                  <div>
                    <p className='font-semibold text-gray-700 text-sm'>{comment.User.username}</p>
                    <p className='text-xs text-slate-400'>{moment(comment.updatedAt).fromNow()}</p>
                  </div>
              </div>
              <p className='mt-0.5 ml-0.5'>{comment.body}</p>
            </div>
      ))}
    </div>
  )
}

export default SubShowComment