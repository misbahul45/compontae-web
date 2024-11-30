'use client';

import { fetchResponden } from '@/actions/respon-action';
import { RespondenSchema } from '@/schema/responden-schema';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

const RespondenSection = () => {
    const [respon, setRespon] = useState<RespondenSchema[]>([]);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchResponden();
            setRespon(data);
        };
        fetchData();
    }, []);

    return (
        <div className="w-full px-4">
            <div className="pb-12 w-full max-w-6xl mx-auto bg-gradient-to-r from-blue-700 via-cyan-500 to-green-600 shadow-inner rounded-lg py-4">
                <h1 className="font-extrabold text-center lg:text-5xl sm:text-4xl text-2xl text-white">
                    Our Feedback
                </h1>
                <Marquee gradient={false} className="rounded-2xl py-3 w-full [mask-image:_linear-gradient(to_right,transparent_0,_black_60px,_black_calc(100%-60px),transparent_100%)]">
                    {respon.map((res) => (
                        <div
                            key={res.id}
                            className="flex-shrink-0 w-72 h-full mx-4 space-y-2 shadow-2xl p-4 bg-white rounded-md"
                        >
                            <Image
                                src={res.image}
                                alt="User"
                                width={200}
                                height={200}
                                className="w-full md:h-32 h-24 object-cover rounded-lg shadow-xl shadow-slate-700/20"
                            />
                            <div className="flex items-start justify-center gap-4">
                                <div className="space-y-1">
                                    <h2 className="font-semibold text-lg">{res.name}</h2>
                                    <div className="flex justify-center">
                                        {Array.from({ length: res.rating }, (_, index) => (
                                            <span key={index} className="text-yellow-500 text-lg">
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-justify text-xs font-semibold text-gray-700 line-clamp-2">{res.respon}</p>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default RespondenSection;
