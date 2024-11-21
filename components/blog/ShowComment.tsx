import { Comment } from '@/schema/comment-types'
import Image from 'next/image'
import React from 'react'
import SubShowComment from './SubShowComment'
import moment from 'moment'
import { MessageCircle, User2Icon } from 'lucide-react'

interface Props extends Comment{
  commentId:string
  children?:Comment[]
  setReplayId:React.Dispatch<React.SetStateAction<string>>
  role?:string
}
const ShowComment = ({ commentId, body, User, children, updatedAt, setReplayId, role}:Props) => {
    const { username, image }=User  
    const [showChildren, setShowChildren] = React.useState(false);
  return (
    <div className='py-1.5 px-4'>
        <div className='flex items-center gap-2'>
            {image && image!=='' && image!==null?
                  <Image
                  src={image}
                  alt={image+username}
                  width={40}
                  height={40}
                  className='rounded-full size-9'
              />
              :
              <div className='size-9 p-1 bg-gray-200 rounded-lg'>
                <User2Icon />
              </div>
            }
            <div>
              <p className='font-semibold text-gray-700 text-sm'><span>{username}</span> {role==='ADMIN' && 'Admin'}</p>
              <p className='text-xs text-slate-400'>{moment(updatedAt).format('DD MMM YYYY')}</p>
            </div>
        </div>
        <p className='mt-0.5 ml-0.5'>{body}</p>
         <div className="ml-0.5 flex justify-between items-center">
            {children && children?.length>0 && (
              <div className='flex items-center gap-1 cursor-pointer hover:text-gray-700 transition-all duration-100' onClick={() => setShowChildren(!showChildren)}>
                  <MessageCircle className='w-4 h-4' />
                  <p className='text-sm'>Replyed ({children?.length})</p>
              </div>
            )}
            <div onClick={()=>setReplayId(commentId)} className='text-sm text-gray-600 my-1 cursor-pointer hover:text-gray-700 transition-all duration-100'>Reply</div>
         </div>
        {(children && showChildren) && <SubShowComment childrenComment={children} />}
    </div>
  )
}

export default ShowComment