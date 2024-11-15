import { Comment } from '@/schema/comment-types'
import Image from 'next/image'
import React from 'react'
import SubShowComment from './SubShowComment'
import moment from 'moment'
import { Separator } from '../ui/separator'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
interface Props extends Comment{}
const ShowComment = ({body, User, children, updatedAt}:Props) => {
    const { username, image }=User  
    const [showChildren, setShowChildren] = React.useState(false);
  return (
    <div className='py-1.5 px-4'>
        <div className='flex items-center gap-2'>
            <Image
                src={image}
                alt={image+username}
                width={40}
                height={40}
                className='rounded-full size-9'
            />
            <div>
              <p className='font-semibold text-gray-700 text-sm'>{username}</p>
              <p className='text-xs text-slate-400'>{moment(updatedAt).fromNow()}</p>
            </div>
        </div>
        <p className='mt-0.5 ml-0.5'>{body}</p>
         <div className="ml-0.5 flex justify-between items-center">
            <div className='text-sm text-gray-600 my-1 cursor-pointer hover:text-gray-700 transition-all duration-100'>Replay</div>
            <button className='block ml-auto w-fit h-fit text-sm text-gray-600 my-1 cursor-pointer hover:text-gray-700 transition-all duration-100' onClick={()=>setShowChildren(!showChildren)}>
                <ChevronRight className={showChildren ? 'rotate-90 transition-all duration-100' : ''} />
            </button>
         </div>
        {(children && showChildren) && <SubShowComment children={children} />}
    </div>
  )
}

export default ShowComment