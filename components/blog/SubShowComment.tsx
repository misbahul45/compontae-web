import { Comment } from '@/schema/comment-types'
import React from 'react'
import ShowComment from './ShowComment'

interface Props {
    children:Comment[]
}

const SubShowComment = ({ children }: Props) => {
  return (
    <>
        {children?.map((comment)=>(
            <ShowComment key={comment.id} {...comment} />
        ))}
    </>
  )
}

export default SubShowComment