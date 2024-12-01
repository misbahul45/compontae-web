'use client';
import { MANFAAT_PRODUK } from '@/constants';
import React from 'react';


const HomeCarrousel = () => {
    const carrouselRef=React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
       if(carrouselRef.current){
            carrouselRef.current.scrollTo({
                left: 100,
                behavior: 'smooth',
          });
       } 
    },[])

  return (
    <div ref={carrouselRef} className='absolute snap-mandatory snap-x lg:-bottom-32 md:-bottom-28 -bottom-24 left-0 flex gap-4 w-full pl-12 overflow-auto shadow-inner shadow-slate-900/20 pr-4 no-scrollbar pb-8'>
      {MANFAAT_PRODUK.map((item) => {
        return (
          <div key={item.id} className='relative flex-none snap-center lg:h-40 md:h-32 h-28 md:w-64 w-56 text-center flex justify-center items-center backdrop-blur-md shadow-lg shadow-slate-900/20 bg-white/90 px-4 rounded-lg'>
            <p className='md:text-lg text-sm font-semibold'>{item.title}</p>
            <div className='absolute top-1 lg:text-md md:text-sm text-xs left-2 md:py-2 py-1 md:px-4 px-2.5 font-semibold text-white rounded-full bg-gradient-to-br from-cyan-400 to-green-500'>Manfaat</div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeCarrousel;
