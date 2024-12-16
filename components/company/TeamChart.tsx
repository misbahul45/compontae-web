'use client'
import React, { useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import Image from 'next/image';

export default function TeamChart() {
  const [data] = useState<{
    label: string;
    expanded: boolean;
    data: string;
    img: string;
    children?: {
      label: string;
      expanded: boolean;
      data: string;
      img: string;
      children?: {
        label: string;
        expand: boolean;
        data: string;
        img: string;
      }[];
    }[];
  }[]>([
    {
      label: 'Leader Program',
      expanded: true,
      data: 'Erliana Fatma Irianto (013241029)',
      img: '/erlin.jpg',
      children: [
        {
          label: 'Alat & Bahan',
          expanded: true,
          data: 'M. Zuhad Mubarok (421241075)',
          img: '/zuzu.jpg',
          children: [
            {
              label: 'Pembuatan Produk',
              expand: true,
              data: 'Misbahul Muttaqin (187241037)',
              img: '/takin.jpg'
            },
            {
              label: 'Pembuatan Produk',
              expand: true,
              data: 'Bimo Cahyo Pamungkas (186241085)',
              img: '/bimo.jpg'
            },
          ]
        },
        {
          label: 'Evaluasi Produk',
          expanded: true,
          data: 'M. Afra Athaillah Marom (151241015)',
          img: '/afra.jpg',
          children: [
            {
              label: 'Promosi & Penjualan',
              expand: true,
              data: 'Putri Fadhilatul Ilmiah (432241020)',
              img: '/putri.jpg'
            },
            {
              label: 'Promosi & Penjualan',
              expand: true,
              data: 'Syakila Azalia Fatika (113241141)',
              img: '/syakila.jpg'
            },
          ]
        },
      ],
    },
  ]);

  interface Node {
    label: string;
    expanded: boolean;
    data: string;
    img: string;
    children?: Node[];
  }

  const nodeTemplate = (node:Node) => {
    return (
      <div className="flex flex-col items-center w-full max-w-xs">
        <Image
          alt={node.label}
          src={node.img}
          width={80}
          height={80}
          className='lg:size-48 md:size-40 size-32 object-cover rounded-lg'
        />
        <h1 className="mt-2 font-medium text-sm text-center">{node.label}</h1>
        <h2 className="text-xs text-center">{node.data}</h2>
      </div>
    );
  };

  return (
    <div className="card overflow-x-auto w-full">
      <OrganizationChart
        value={data}
        nodeTemplate={nodeTemplate}
        className="w-full max-w-full"
      />
    </div>
  );
}
