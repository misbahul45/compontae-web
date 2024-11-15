'use client'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { CommentSchema } from '@/schema/comment-schema'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { SendHorizonal } from 'lucide-react'

interface Props{
    postId:string, 
}



const FormComment = ({ postId }:Props) => {

    const form=useForm({
        resolver:zodResolver(CommentSchema.createCommentSchema),
        mode:"onChange",
        defaultValues: {
            body:''
        }
    })

  return (
    <Form {...form}>
        <form className="space-y-2 w-full shadow-md shadow-slate-500/20 p-3 rounded-xl border-2 border-gray-300">
            <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea placeholder="Komentar" className='resize-none' {...field} />
                        </FormControl>
                    </FormItem>
                )}
            /> 
            <Button className='flex justify-center items-center gap-2 ml-auto'>
                <p>Kirim</p>
                <SendHorizonal className='size-6' />
            </Button>
        </form>
    </Form>
  )
}

export default FormComment