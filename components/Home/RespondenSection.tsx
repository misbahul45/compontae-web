import prisma from '@/lib/db';
import Image from 'next/image';
import React from 'react';

const RespondenSection = async () => {
    const respon = await prisma.survei.findMany({
        take: 6,
        orderBy: {
            createdAt: 'desc',
        },
    });

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
                           <div className='flex items-start justify-center gap-4'>
                            <Image
                                    src="/respon-image.jpeg" // Update to dynamic path if available
                                    alt={`Feedback from ${respon.name}`}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
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
