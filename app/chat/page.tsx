import { ChatProvider } from '@/components/chat/ChatProvider'
import FormChat from '@/components/chat/FormChat'
import ShowChat from '@/components/chat/ShowChat'
import React from 'react'

const page = () => {
  return (
    <div className='w-full max-w-4xl mx-auto pt-20 pb-32 md:px-8 px-2'>
        <h1 className='text-4xl font-bold mb-8 text-center bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 text-transparent'>Compontae Chatbot</h1>
        <ChatProvider>
            <div className="flex flex-col gap-4">
                <FormChat />
                <ShowChat />
            </div>
        </ChatProvider>
    </div>
  )
}

export default page