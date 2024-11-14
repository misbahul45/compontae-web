import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'


export const metadata: Metadata = {
  title: 'About Us - Compontae',
  description: 'Compontae adalah sebuah product compos dari limbah rumah tangga',
}

const page = () => {
  return (
    <div className='w-full pb-32 pt-20 px-6'>
      <Image src={'/logo.png'} alt="Compontae Logo" width={300} height={300}  className='mx-auto' />
      <h1 className='text-5xl text-center font-bold'>Compontae</h1>
      <div className='space-y-4 w-full max-w-2xl mx-auto mt-4'>
        <p className='text-lg text-justify'>
          Kami adalah perusahaan yang memiliki fokus utama pada inovasi dalam pengembangan dan produksi pupuk berbasis limbah rumah tangga. Dengan komitmen untuk menciptakan solusi ramah lingkungan dan berkelanjutan, kami memanfaatkan limbah organik dari rumah tangga sebagai bahan baku utama dalam proses pembuatan pupuk. Proses ini tidak hanya mengurangi jumlah limbah yang berakhir di tempat pembuangan akhir tetapi juga mendukung upaya pelestarian lingkungan dengan memberikan nilai tambah pada limbah organik.
        </p>
        <p className='text-lg text-justify'>
          Melalui penelitian dan teknologi terkini, kami terus meningkatkan kualitas pupuk yang kami hasilkan agar mampu memberikan nutrisi yang optimal untuk tanaman sekaligus memperbaiki struktur tanah secara alami. Pupuk kami dirancang untuk membantu petani, pemilik lahan, dan masyarakat umum dalam menghasilkan tanaman yang lebih subur tanpa perlu bergantung pada pupuk kimia yang dapat merusak lingkungan dalam jangka panjang.
        </p>
        <p className='text-lg text-justify'>
          Selain itu, kami juga berperan aktif dalam edukasi masyarakat mengenai pentingnya daur ulang dan pengelolaan limbah organik. Kami percaya bahwa dengan meningkatkan kesadaran dan pemahaman masyarakat, kita dapat bersama-sama menciptakan ekosistem pertanian yang lebih sehat dan berkelanjutan.
        </p>
      </div>
    </div>
  )
}

export default page