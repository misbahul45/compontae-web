import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

export const metadata:Metadata = {
  title: 'Visi & Misi - Compontae',
  description: 'Compontae adalah sebuah product compos dari limbah rumah tangga',
}

const page = () => {
  return (
    <div className='w-full mx-auto max-w-3xl pt-20 pb-32 space-y-3 px-6'>
       <Image src={'/logo.png'} alt='logo' width={250} height={250} className='mx-auto' />
       <h1 className='text-center text-3xl font-bold'>Visi & Misi Our Team</h1>
       <h2 className='font-semibold text-2xl'>Visi</h2>
       <p className='text-lg text-justify'>Mewujudkan lingkungan yang lestari dengan mendukung praktik pertanian yang berkelanjutan melalui pemanfaatan limbah organik menjadi sumber nutrisi berkualitas bagi tanah dan tanaman.</p>
       <h2 className='font-semibold text-2xl'>Misi</h2>
       <ol className='list-decimal'>
        <li><strong>Mengembangkan Produk Ramah Lingkungan</strong>: Menghasilkan pupuk organik berkualitas tinggi yang membantu memperbaiki kesehatan tanah dan mendorong pertumbuhan tanaman tanpa merusak ekosistem.</li>
        <li><strong>Mengurangi Limbah Rumah Tangga</strong>: Memanfaatkan limbah organik dari rumah tangga sebagai bahan baku utama untuk mengurangi jumlah limbah yang dibuang dan mengurangi polusi.</li>
        <li><strong>Inovasi dan Penelitian</strong>: Terus melakukan penelitian dan pengembangan produk untuk memastikan pupuk yang dihasilkan memenuhi kebutuhan nutrisi tanaman secara optimal.</li>
        <li><strong>Edukasi Masyarakat</strong>: Mendorong kesadaran masyarakat tentang pentingnya pengelolaan limbah organik dan manfaat daur ulang dalam upaya pelestarian lingkungan.</li>
        <li><strong>Kolaborasi untuk Keberlanjutan</strong>: Bekerja sama dengan petani, pemilik lahan, dan komunitas lokal untuk mewujudkan sistem pertanian yang lebih sehat dan berkelanjutan.</li>
      </ol>

    </div>
  )
}

export default page