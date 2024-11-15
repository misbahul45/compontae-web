'use client'
import React from 'react'
import FormComment from './FormComment'
import ShowComment from './ShowComment'
import { Separator } from '../ui/separator'
import { LoaderIcon, MessageSquareText } from 'lucide-react'
import { getAllComments } from '@/actions/comment-action'
import { getUser } from '@/actions/user-action'
import { useSession } from 'next-auth/react'
import { Comment as CommentType } from '@/schema/comment-types'

interface Props {
  postId: string
}

interface UserLogin {
  image: string | null
  id: string
  email: string
  username: string
}

const Comment = ({ postId }: Props) => {
  const { data: session } = useSession()
  const email = session?.user?.email || ''

  const [comments, setComments] = React.useState<CommentType[]>([])
  const [user, setUser] = React.useState<UserLogin | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [sendMessage, setSendMessage] = React.useState(false)

  const fetchComments = React.useCallback(async () => {
    setLoading(true)
    try {
      const fetchedComments = await getAllComments(postId)
      setComments(fetchedComments as CommentType[] || [])
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    } finally {
      setLoading(false)
    }
  }, [postId])

  const fetchUser = React.useCallback(async () => {
    if (!email) return
    try {
      const userData = await getUser(email)
      setUser(userData ?? null)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }, [email])

  React.useEffect(() => {
    fetchComments()
  }, [fetchComments, sendMessage])

  React.useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <div className='w-full max-w-3xl mx-auto'>
      <h1 className='text-center lg:text-4xl md:text-2xl sm:text-xl text-lg font-bold md:mb-4 mb-2 text-gray-500'>
        Semua Komentar
      </h1>

      {/* Form for adding new comments */}
      <FormComment 
        setSendMessage={setSendMessage} 
        userId={user?.id || ''} 
        postId={postId} 
      />

      <Separator className='my-4' />

      {/* Display loader or comments */}
      <div className='space-y-4'>
        {loading ? (
          <LoaderIcon className='mx-auto text-gray-400 animate-spin lg:w-14 lg:h-14 w-10 h-10' />
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <ShowComment key={comment.id} {...comment} />
          ))
        ) : (
          <div className='text-center'>
            <MessageSquareText className='mx-auto text-gray-400 lg:w-14 lg:h-14 w-10 h-10' />
            <p className='font-semibold md:text-lg text-md'>Belum ada komentar</p>
            <p className='text-gray-400'>Jadilah yang pertama untuk berkomentar!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment
