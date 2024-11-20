'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormStatus } from '@/hooks/useFormStatus'
import { sleep } from '@/lib/utils'
import UserSchema from '@/schema/user-schema'
import { UserLoginType } from '@/schema/user-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeClosed, EyeIcon, Loader2, Lock, Mail } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { data }=useSession()
  const router = useRouter()
  const { loading, setLoading, } = useFormStatus();

  const form = useForm<z.infer<typeof UserSchema.UserLoginSchema>>({
    mode: 'onChange',
    resolver: zodResolver(UserSchema.UserLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<UserLoginType> = async (values) => {
    setLoading(true);
    try {
      await sleep()
      const isValid = await signIn('credentials', values)
      if(!isValid){
        toast.error('Invalid email or password');
        return;
      }
      form.reset()
      toast.success('Login successful!');
      router.refresh()
    } catch (e) {
      toast.error('Something went wrong. Please try again later.' + e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(data?.user){
      router.push('/blog/1')
    }
  },[loading, data, router])

  return (
    <section className='min-h-screen flex flex-col justify-center bg-blue-600 pb-32 px-4'>
      <ul className="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
      <Image src="/logo.png" alt="Logo" width={200} height={200} className='block mx-auto' />
      <h1 className='text-white font-bold sm:text-3xl text-center text-2xl'><span className='text-green-500'>Ayo!</span> Mari Kita Selamatkan Dunia</h1>
      <div className='mt-4 z-50'>
        <div className='w-full max-w-sm mx-auto p-4 rounded-lg shadow-xl shadow-slate-700/70 bg-white'>
          <div className="flex items-center justify-center">
            <h2 className='text-cyan-400 text-2xl font-semibold text-center'>login</h2>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input placeholder="Input your email" {...field} className='pl-8 peer' />
                        <Mail className={`absolute top-1/2 -translate-y-1/2 left-1 h-4 ${field.value === '' ? "text-slate-400" : "text-black"} peer-focus:text-black`} />
                      </div>
                    </FormControl>
                    {form.formState.errors.email && (
                      <FormMessage />
                    )}
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
                      <div className='relative'>
                        <Input placeholder="Input your password" {...field} type={showPassword ? "text" : "password"} className='pl-8 peer' />
                        <Lock className={`absolute top-1/2 -translate-y-1/2 left-1 h-4 ${field.value === '' ? "text-slate-400" : "text-black"} peer-focus:text-black`} />
                        <button type="button" className={`absolute top-1/2 -translate-y-1/2 right-1 h-4 ${showPassword ? "text-black" : "text-slate-400"} peer-focus:text-black`} onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeIcon /> : <EyeClosed />}
                        </button>
                      </div>
                    </FormControl>
                    {form.formState.errors.password && (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className='w-full flex justify-center bg-blue-600 hover:bg-blue-700'>
                {loading ? <Loader2 className='w-6 h-6 animate-spin' /> : "Login"}
              </Button>
            </form>
          </Form>
          <p className='text-center mt-4'>Don&apos;t have an account? <Link href="/register" className='text-blue-600'>Register</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login
