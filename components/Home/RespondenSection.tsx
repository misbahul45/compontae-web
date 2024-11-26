import { fetchResponden } from '@/actions/respon-action';
import Image from 'next/image';
import React from 'react';

const RespondenSection = async () => {
    const respon = await fetchResponden()

    return (
        <div className="pb-12">
            <h1 className="font-extrabold text-center lg:text-5xl sm:text-4xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-cyan-500 to-green-600">
                It&apos;s time to give feedback
            </h1>
            <div className="sm:columns-2 columns-1 w-full max-w-4xl mx-auto mt-8 space-y-4">
                {respon.length > 0 ? (
                    respon.map((respon) => (
                        <div
                            key={respon.id}
                            className="space-y-2 w-full max-w-sm shadow-2xl p-4 bg-white rounded-md"
                        >
                            <Image src={respon.image} alt="User" width={200} height={200} className="w-full max-w-sm rounded-lg shadow-xl shadow-slate-700/20" />
                           <div className='flex items-start justify-center gap-4'>
                                <div className="space-y-1">
                                    <h2 className="font-semibold text-lg">{respon.name}</h2>
                                    <div className='flex'>
                                        {Array.from({ length:respon.rating }, (_, index) => (
                                            <span key={index} className="text-yellow-500">
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                           </div>
                            <p className="text-justify text-sm text-gray-700">
                                {respon.respon}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        No feedback available yet. Be the first to contribute!
                    </p>
                )}
            </div>
        </div>
    );
};

export default RespondenSection;
