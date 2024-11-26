'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Sisa Makanan', value: 39.65 },
  { name: 'Plastik', value: 19.21 },
  { name: 'Kertas/Karton', value: 10.83 },
  { name: 'Kayu/Ranting', value: 12.09 },
  { name: 'Logam', value: 3.24 },
  { name: 'Kain', value: 2.91 },
  { name: 'Karet/Kulit', value: 2.53 },
  { name: 'Kaca', value: 2.46 },
  { name: 'Lainnya', value: 7.08 },
];

const COLORS = [
  '#4F81BD',
  '#C0504D',
  '#F0C050',
  '#9BBB59',
  '#4BACC6',
  '#8064A2',
  '#C5C1B8',
  '#D99694',
  '#B4A0D1',
];

const ChartSampah = () => {
  return (
    <div style={{ textAlign: 'center' }} className='w-full overflow-auto mx-auto'>
      <h2 className='text-xl font-semibold text-center'>Komposisi Sampah Berdasarkan Jenis Sampah</h2>
      <PieChart width={450} height={450} className='mx-auto'>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}%`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <p className='text-sm text-gray-500'>Source : Sistem Informasi Pengelolaan Sampah Nasional (SIPSN)</p>
    </div>
  );
};

export default ChartSampah;
