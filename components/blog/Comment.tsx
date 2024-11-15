'use client'
import React from 'react'
import FormComment from './FormComment'
import { getAllComments } from '@/actions/comment-action'
import { Comment as CommentType } from '@/schema/comment-types'
import { useSession } from 'next-auth/react'
import { getUser } from '@/actions/user-action'

interface Props{
    postId:string
}
interface UserLogin{
    image: string | null; 
    id: string; 
    email: string; 
    username: string 
}

const Comment = ({ postId }:Props) => {
    const [comments,setComments]=React.useState<CommentType[]>([])

    const { data } = useSession();
    const email=data?.user.email

    const [user, setUser]=React.useState<UserLogin | undefined>(undefined)

    React.useEffect(()=>{
        const fecthAllComment=async()=>{
            const comment=await getAllComments(postId) as CommentType[]
            if(comment){
                setComments(comment)
            }
        }
        fecthAllComment()
    },[])

    React.useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const userLogin=await getUser(email as string)
                if(userLogin){
                    setUser(userLogin)
                } 
            } catch (error) {
                console.log(error)
            }
        }
        if(email){
            fetchUser()
        }
    },[email])



  return (
    <div className='w-full max-w-3xl mx-auto'>
        <h1 className='text-center lg:text-4xl md:text-2xl sm:text-xl text-lg font-bold md:mb-4 mb-2 text-gray-500'>Semua Komentar</h1>
        <FormComment postId={postId} />
    </div>
  )
}

export default Comment