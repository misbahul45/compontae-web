'use client'
import AboutSection from '@/components/product/AboutSection'
import HeroSection from '@/components/product/HeroSection'
import React from 'react'
import SuperioritySection from './SuperioritySection'
import GuideSection from './GuideSection'

interface Props{
    item:string
}
const Wrapper = ({ item }:Props) => {
  const buyRef=React.useRef<null | HTMLButtonElement>(null)
  const aboutRef=React.useRef<null | HTMLDivElement>(null)
  const superiorityRef=React.useRef<null | HTMLDivElement>(null)
  const guideRef=React.useRef<null | HTMLDivElement>(null)
  

  React.useEffect(()=>{
    if(item==="buy"){
      buyRef.current?.classList.replace("bg-green-500","bg-red-500")
      buyRef.current?.classList.replace("hover:bg-green-600","hover:bg-red-600")
    }else if(item==="about"){
      aboutRef.current?.scrollIntoView({
        behavior:"smooth",
        block:'start'
      })
    }else if(item==="superiority"){
        superiorityRef.current?.scrollIntoView({
            behavior:"smooth",
            block:'start'
        })
    }else if(item==="guide"){
      guideRef.current?.scrollIntoView({
        behavior:"smooth",
        block:'start'
      })
    }
  },[item])


  return (
    <div className='pb-28 pt-16 w-full'>
      <HeroSection ref={buyRef} />
      <AboutSection ref={aboutRef} />
      <SuperioritySection ref={superiorityRef} />
      <GuideSection ref={guideRef} />
    </div>
  )
}

export default Wrapper