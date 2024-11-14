import React from 'react'

interface Props{
    ref:React.RefObject<HTMLDivElement> | null
}

const AboutSection = ({ ref }:Props) => {
  return (
    <div ref={ref} className='w-full max-w-5xl mx-auto space-y-3 lg:pt-16 md:pt-12 pt-10 px-4'>
        <h1 className='text-center lg:text-4xl md:text-2xl text-xl font-bold'>About Compontae</h1>
        <p>Compotae adalah produk pupuk organik yang dibuat dengan teknik Bokashi, berasal dari kata "Compos" (kompos) dan "Plantae" (tanaman). Produk ini berfokus pada pengolahan limbah organik rumah tangga menjadi pupuk berkualitas tinggi yang ramah lingkungan. Compotae bertujuan untuk membantu masyarakat dalam mengelola sampah organik dengan cara yang mudah dan praktis, sekaligus memberikan manfaat bagi tanaman dan pertanian.</p>
    </div>
  )
}

export default AboutSection