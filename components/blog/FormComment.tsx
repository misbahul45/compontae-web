'use client'
import React from 'react'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { CommentSchema } from '@/schema/comment-schema'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { LoaderIcon, SendHorizonal } from 'lucide-react'
import { sleep } from '@/lib/utils'
import { createComment } from '@/actions/comment-action'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Props{
    postId:string, 
    userId:string,
    parentId?:string
    setParentId?:React.Dispatch<React.SetStateAction<string>>,
    setSendMessage:React.Dispatch<React.SetStateAction<boolean>>
}



const FormComment = ({ postId, userId, setSendMessage }:Props) => {
    const [loading, setLoading] = React.useState(false);
    const router=useRouter()

    const form=useForm({
        resolver:zodResolver(CommentSchema.createCommentSchema),
        mode:"onChange",
        defaultValues: {
            body:''
        }
    })

    const onSubmit=async(data:z.infer<typeof CommentSchema.createCommentSchema>)=>{
        if(!userId){
            toast.error("Please login first")
            router.push('/login')
            return;
        }
        try {
            setSendMessage(false)
            setLoading(true)
            await sleep()
            await createComment({body:data.body, postId, userId})
            setLoading(false)
            setSendMessage(true)
            form.reset()
        } catch (error) {
            toast.error("error"+error)
        }
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full shadow-md shadow-slate-500/20 p-3 rounded-xl border-2 border-gray-300">
            <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea placeholder="Create a comment" className='resize-none' {...field} />
                        </FormControl>
                    </FormItem>
                )}
            /> 
            <Button disabled={loading} className='flex justify-center items-center gap-2 ml-auto'>
               {loading ?
                 <LoaderIcon className='size-6 animate-spin' />
                :
                <>
                    <p>Kirim</p>
                    <SendHorizonal className='size-6' />
                </>
                }
            </Button>
        </form>
    </Form>
  )
}

export default FormComment