'use client'
import { LucideMessageSquareText } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Chat = () => {
    const pathName=usePathname();
  return (
    <Link href={'/chat'} className={`fixed bottom-8 right-3 p-2 rounded-lg bg-green-500 group hover:bg-green-600 transition-all duration-100 ${pathName==='/chat'?'hidden':''}`}>
        <LucideMessageSquareText className='size-6 text-white group-hover:size-10 transition-all duration-100' />
    </Link>
  )
}

export default Chat