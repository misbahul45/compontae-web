import AboutSection from '@/components/Home/AboutSection'
import BlogSection from '@/components/Home/BlogSection'
import HeroSection from '@/components/Home/HeroSection'
import RespondenSection from '@/components/Home/RespondenSection'
import VideoSection from '@/components/Home/VideoSection'
import React from 'react'


const page = () => {
  return (
    <div className='pb-28 overflow-hidden'>
      <HeroSection />
      <AboutSection />
      <VideoSection />
      <RespondenSection />
      <BlogSection />
    </div>
  )
}

export default page