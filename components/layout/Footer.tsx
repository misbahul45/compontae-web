import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='relative w-full bg-green-700 pt-24'>
        <div className='w-[80%] absolute left-1/2 -top-20 -translate-x-1/2 bg-white rounded-lg flex md:gap-4 gap-2 items-center lg:pl-16 md:pl-12 px-4 shadow-xl shadow-black/20'>
            <Image src={'/logo-2.png'} alt="Compontae Logo" width={100} height={100} className='rounded-full size-24 md:size-44' />
            <div>
                <h1 className='lg:text-4xl md:text-2xl text-xl font-bold'>Butuh Bantuan?</h1>
                <Link href={'mailto:'} className='lg:text-2xl md:text-xl text-lg  text-green-400 font-semibold'>Hubungi Kami</Link>
            </div>
        </div>
        <div className='flex md:flex-row flex-col gap-4 w-[80%] mx-auto'>
            <div className="flex-1 flex flex-col items-center space-y-2">
                <div className='flex items-center gap-2'>
                    <Image src={'/logo-2.png'} alt="Compontae Logo" width={50} height={50} className='rounded-full' />
                    <h1 className='text-4xl font-bold text-white'>Compontae</h1>
                </div>
                <h2 className='text-xl text-white  text-center font-semibold'>
                    Mari kita jaga alam dengan tindakan nyata.
                </h2>
                <p className='text-lg text-center text-white'>Jl. Dr. Ir. H. Soekarno, Mulyorejo, Kec. Mulyorejo, Surabaya, Jawa Timur 60115</p>
            </div>
            <div className="flex-1 text-center">
                <h1 className='text-3xl font-bold text-white'>Perusahaan</h1>
                <ul className='text-lg text-white'>
                    <li className='text-md hover:text-slate-200 transition-all duration-100'><Link href={'/company/about'}>Tentang Kami</Link></li>
                    <li className='text-md hover:text-slate-200 transition-all duration-100'><Link href={'/help'}>Butuh Bantuan</Link></li>
                </ul>
            </div>
            <div className="flex-1 text-center">
                <h1 className='text-3xl font-bold text-white'>Social Media</h1>
                <ul className='text-lg text-white'>
                    <li className='text-md hover:text-slate-200 transition-all duration-100'><Link href={'https://wa.me/+6281333513901'}>Whatsapp</Link></li>
                    <li className='text-md hover:text-slate-200 transition-all duration-100'><Link href={'https://www.instagram.com/compontae.id/'}>Instagram</Link></li>
                    <li>
                        <Link href={'/responden'} className='bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-slate-50'>Give Feedback</Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className='w-full text-center bg-white py-4 mt-4 font-semibold text-gray-400'>
            <p>Copyright &copy; 2024 Compontae</p>
        </div>
    </footer>
  )
}

export default Footer