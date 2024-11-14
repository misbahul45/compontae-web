import { useRouter } from 'next/navigation'
import React from 'react'

interface Props{
    ref: React.RefObject<HTMLButtonElement> | null
}

const HeroSection = ({ ref }: Props) => {
    const router=useRouter()
  return (
    <div className="w-full h-[calc(100vh-11rem)] mx-auto max-w-[95%] bg-[url('/bg-product.jpg')] bg-cover rounded-xl shadow-xl shadow-slate-600/50">
        <div className='flex flex-col justify-center space-y-4 w-full h-full bg-black/30 md:pl-24 px-4'>
            <h1 className='md::text-4xl text-6xl font-bold bg-gradient-to-r from-blue-500 via-cyan-400 to-green-600 inline-block text-transparent bg-clip-text'>Compontae</h1>
            <div className='text-white w-full max-w-lg space-y-3 lg:text-sm text-xl'>
                <p>🌱<b>Compontae</b>: Solusi Pupuk Organik Ramah Lingkungan! 🌿</p>

                <p>Tingkatkan kesuburan tanah dan hasil panen Anda dengan Compontae, pupuk kompos bokashi berkualitas tinggi yang kaya akan nutrisi alami. Cocok untuk tanaman buah, sayuran, dan hias. Pilihan terbaik untuk pertanian sehat dan berkelanjutan! 🌾💚</p>

                <p>💬 Yuk, beralih ke pertanian organik yang lebih baik dengan <b>Compontae!</b> Kesehatan tanah, hasil panen melimpah!</p>
            </div>
            <button onClick={()=>router.push('')} ref={ref} className='px-4 py-2 bg-green-700 w-fit rounded-lg text-white font-semibold shadow-xl shadow-slate-800/20 hover:scale-105 hover:bg-green-900 transition-all duration-100'>
                Buy Product
            </button>
        </div>
    </div>
  )
}

export default HeroSection