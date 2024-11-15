import { Comment } from '@/schema/comment-types'
import React from 'react'
import ShowComment from './ShowComment'

interface Props {
    childrenComment:Comment[]
}

const SubShowComment = ({ childrenComment }: Props) => {
  return (
    <>
        {childrenComment?.map((comment)=>(
            <ShowComment key={comment.id} {...comment} />
        ))}
    </>
  )
}

export default SubShowComment