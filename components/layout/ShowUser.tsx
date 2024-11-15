import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface Props {
    image: string;
    username: string;
    email: string;
  }
  
const ShowUser = ({image,username, email}:Props) => {
  return (
    <div className="space-y-3">
        <div className="flex justify-center">
        {!image ? (
            <div className="flex flex-col items-center gap-2">
                <UserIcon className="size-28 p-2 rounded-full bg-slate-100" />
                <div className="text-slate-400 font-semibold text-center">
                    No User Image
                </div>
            </div>
        ) : (
            <Image
            src={image}
            alt="User"
            width={80}
            height={80}
            className="rounded-full size-28 border-2 shadow-xl"
            />
        )}
        </div>

        <div className="px-4 py-2 rounded-lg bg-slate-50 border-2 border-slate-200">
            <>{email}</>
        </div>

        <div className="px-4 py-2 rounded-lg bg-slate-50 border-2 border-slate-200">
            <>{username}</>
        </div>
  </div>
  )
}

export default ShowUser