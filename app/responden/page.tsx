import FormResponden from '@/components/responden/FormResponden'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata={
  title: 'Responden - Compontae',
  description: 'Compontae adalah sebuah product compos dari limbah rumah tangga',
}
const page = () => {

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center pt-16 pb-28'>
      <h1 className='md:text-4xl sm:text-2xl text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-500'>Give feedback to improve our product</h1>
      <FormResponden />
    </div>
  )
}

export default page