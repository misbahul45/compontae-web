import TeamChart from '@/components/company/TeamChart'
import { Metadata } from 'next'
import React from 'react'


export const metadata:Metadata = {
  title: 'Our Team - Compontae',
  description: 'Compontae adalah sebuah product compos dari limbah rumah tangga',
}

const page = () => {
  return (
    <div className='w-full pt-24 min-h-screen pb-28 flex flex-col justify-center items-center'>
      <h1 className='text-4xl font-bold'>OUR TEAM</h1>
      <p className='text-sm max-w-xl text-center text-gray-400'>Kami berkomitmen mengembangkan produk bernilai tinggi yang bermanfaat nyata bagi masyarakat dan lingkungan, berdaya saing, dan berkontribusi pada keberlanjutan serta kemajuan bersama.</p>
      <TeamChart />
    </div>
  )
}

export default page