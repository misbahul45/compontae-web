'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { MANFAAT_PRODUK, TUJUAN_PRODUK } from '@/constants'
import Item from './Item'
import { Leaf, Briefcase, Globe, Recycle } from "lucide-react";

const ChartSampah= dynamic(() => import('./ChartSampah'), { ssr: false })
const icons=[
    <Leaf className='text-green-500 lg:size-16 md:size-12 size-8' />,
    <Briefcase className='text-green-500 lg:size-16 md:size-12 size-8' />,
    <Globe className='text-green-500 lg:size-16 md:size-12 size-8' />,
    <Recycle className='text-green-500 lg:size-16 md:size-12 size-8' />
  ]

const AboutSection = () => {
  return (
    <section className='w-full relative md:px-8 px-4 pt-4 space-y-12 md:mt-32 mt-20'>
        <div>
            <h1 className='text-center lg:text-4xl md:text-2xl text-xl font-bold'>Aspirasi & Latar Belakang</h1>
            <div className="flex lg:flex-row flex-col gap-4 md:mt-6 mt-4">
                <div className="flex-1">
                    <ChartSampah />
                </div>
                <div className="flex-1 space-y-4 px-2">
                    <p className='text-lg text-justify'>Sampah, terutama sampah organik rumah tangga, menjadi masalah besar di Indonesia, dengan sampah makanan mencapai 40% dari total sampah. Ini berkontribusi pada pencemaran lingkungan dan peningkatan emisi gas rumah kaca yang memperburuk perubahan iklim. Di sisi lain, sektor pertanian mengalami kekurangan pupuk, dengan kebutuhan 13 juta ton per tahun yang sebagian besar masih harus diimpor.</p>
                    <p className='text-lg text-justify'>Solusi yang relevan adalah produksi pupuk kompos organik dari limbah rumah tangga, yang efektif dalam meningkatkan kesuburan tanah dan mengurangi dampak negatif penggunaan pupuk kimia. Penggunaan pupuk organik juga memberikan manfaat jangka panjang untuk struktur tanah dan ketahanan pangan, yang semakin penting seiring pertumbuhan populasi dan kebutuhan pangan nasional.</p>
                    <p className='text-lg text-justify'>Dengan latar belakang ini, produksi pupuk kompos organik menawarkan peluang bisnis strategis. Selain mengurangi limbah, bisnis ini mendukung produktivitas pertanian, ketahanan pangan, dan memberi nilai ekonomi pada limbah rumah tangga.</p>
                </div>
            </div>
        </div>
        <div>
            <h1 className='text-center lg:text-4xl md:text-2xl text-xl font-bold'>Tujuan Produk Kami</h1>
            <div className='w-full max-w-3xl mx-auto mt-6 grid sm:grid-cols-2 grid-cols-1 md:gap-6 gap-3 px-8'>
                {TUJUAN_PRODUK.map((tujuan, index) => (
                    <Item key={index} title={tujuan.title}>
                        <div className='p-2 rounded-full border-2 border-green-500'>{icons[index]}</div>
                    </Item>
                ))}
            </div>
        </div>
    </section>
  )
}

export default AboutSection