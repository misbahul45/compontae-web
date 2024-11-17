import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import HomeCarrousel from './HomeCarrousel'


const HeroSection = () => {
  return (
    <div className='py-24 bg-[url("/home-hero.jpg")] w-full md:h-screen px-2 bg-cover bg-no-repeat flex flex-col justify-center items-center relative'>
        <div className='flex items-center gap-2'>
            <h1 className='text-center lg:text-7xl md:text-5xl sm:text-4xl text-2xl text-white font-bold md:mb-4 mb-2'>Compontae</h1>
        </div> 
        <h2 className='text-center lg:text-3xl md:text-2xl text-md text-white font-bold max-w-5xl mx-auto'>Mari kita jaga alam dengan tindakan nyata, mulai dari mengurangi sampah plastik hingga menanam pohon. Bumi adalah warisan kita, jangan biarkan ia terluka!</h2>
        <div className='flex gap-4 items-center mt-10'>
            <h3 className='md:text-2xl text-sm text-white'>Apa itu Compontae?</h3>
            <Link href={'/product/buy'} className='px-6 py-2.5 rounded-md bg-green-500 text-white flex items-center hover:bg-green-700 group font-semibold transition-all duration-100'>
                <p>Selengkapnya</p>
                <MoveUpRight className='ml-1 w-4 group-hover:w-5 transition-all duration-100'/>
            </Link>
        </div>
        <HomeCarrousel />
    </div>
  )
}

export default HeroSection