'use client'
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import UserSchema from '@/schema/user-schema'
import { z } from 'zod'
import Image from 'next/image'
import { LoaderIcon, UserIcon } from 'lucide-react'
import { UploadButton } from '@/lib/uploadthing'
import toast from 'react-hot-toast'
import { updateUser } from '@/actions/user-action'

interface FormUserProps {
    username:string
    email:string
    image:string
    setEdit:React.Dispatch<React.SetStateAction<boolean>>
}

const FormUser = ({username,email,image, setEdit}:FormUserProps) => {
    const [newImage, setNewImage]=React.useState(image)
    const [loading, setLoading]=React.useState(false)
    const form=useForm({
        mode:"onChange",
        resolver:zodResolver(UserSchema.UserEditSchema),
        defaultValues: {
            username: username,
            email: email,
            image: newImage,
            password:'',
            confirmPassword:'',
          },
    })

  React.useEffect(()=>{
    if(newImage){
        form.setValue('image', newImage)
    }
  },[newImage])

    const onSubmit=async(data:z.infer<typeof UserSchema.UserEditSchema>)=>{
        setLoading(true)
       try {
        await updateUser(data)
        toast.success('Succes update user')
        setEdit(false)
       } catch (error) {
        toast.error("error"+error)
       }finally{
        setLoading(false)
       }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-start">
        <div className='flex justify-center flex-col items-center space-y-2'>
            {newImage?
                <div className='relative size-16 rounded-full'>
                    <Image src={newImage} alt="avatar" fill priority sizes='100%' className='w-ful h-full rounded-full object-cover shaodw-lg border-2' />
                </div>
                :
                <UserIcon className='size-16 p-2 rounded-full bg-slate-50 mx-auto' />
            }
                <UploadButton className=''
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        setNewImage(res[0].url)
                        toast.success('Successfully upload image')
                    }}
                    onUploadError={(error: Error) => {
                        toast.error(error.message)
                    }}
                />
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input autoFocus placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Confirm password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
            <Button type="submit" disabled={loading}>
                {loading?
                    <LoaderIcon className='size-6 rounded-full animate-spin' />
                    :
                    "Update Profile"
                }
            </Button>
            <Button onClick={()=>setEdit(false)} type="button" variant={'outline'}>Cancel</Button>
        </div>
      </form>
    </Form>
  )
}

export default FormUser