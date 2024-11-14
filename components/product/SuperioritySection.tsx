import { benefitsOfCompotae } from '@/constants';
import React from 'react';

interface Props {
  ref: React.RefObject<HTMLDivElement> | null;
}

const SuperioritySection = ({ ref }: Props) => {
  return (
    <div ref={ref} className="w-full max-w-6xl mx-auto lg:pt-16 md:pt-12 pt-10 px-4">
      <h1 className='text-center lg:text-4xl md:text-2xl text-xl font-bold mb-6'>Mengapa Pupuk Compotae Penting?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {benefitsOfCompotae.map((item, index) => {
          const colSpan = index % 5 === 0 ? 'lg:col-span-3' : index % 4 === 0 ? 'lg:col-span-2' : 'lg:col-span-1';
          const rowSpan = index % 3 === 0 ? 'lg:row-span-2' : 'lg:row-span-1';
          return (
            <div
              key={index}
              className={`p-6 rounded-xl flex flex-col space-y-4 shadow-xl shadow-slate-600/40
              ${colSpan} ${rowSpan} 
              ${index % 3 === 0 ? 'bg-blue-600 text-white' : index % 3 === 1 ? 'bg-cyan-500 text-white' : 'bg-green-600 text-white'}`}
            >
              <div className="flex items-center gap-4">
                <div className="flex justify-center items-center w-12 h-12 rounded-full bg-white">
                    <span className={`text-xl ${index % 3 === 0 ? 'text-blue-600' : index % 3 === 1 ? 'text-cyan-500' : 'text-green-600'}`}>
                    ★
                    </span>
                </div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
              </div>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuperioritySection;
