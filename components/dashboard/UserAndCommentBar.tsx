'use client';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fetchDailyCommentGrowth } from '@/actions/comment-action';
import { fetchDailyUserGrowth } from '@/actions/user-action';

/* eslint-disable @typescript-eslint/no-explicit-any */
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserAndCommentLineChart = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data user
        const dataUser = await fetchDailyUserGrowth();
        // Fetch data comment
        const dataComment = await fetchDailyCommentGrowth();

        // Gabungkan data pengguna dan komentar berdasarkan tanggal
        const mergedData: Record<string, any> = {};

        // Masukkan data user ke dalam mergedData
        dataUser.forEach((item: any) => {
          if (!mergedData[item.day]) {
            mergedData[item.day] = { day: item.day, userCount: 0, commentCount: 0 };
          }
          mergedData[item.day].userCount = item.count;
        });

        // Masukkan data comment ke dalam mergedData
        dataComment.forEach((item: any) => {
          if (!mergedData[item.day]) {
            mergedData[item.day] = { day: item.day, userCount: 0, commentCount: 0 };
          }
          mergedData[item.day].commentCount = item.count;
        });

        // Konversi menjadi array untuk mempersiapkan data ke Chart.js
        const sortedData = Object.values(mergedData).sort(
          (a: any, b: any) => new Date(a.day).getTime() - new Date(b.day).getTime()
        );

        const labels = sortedData.map((d: any) => new Date(d.day).toLocaleDateString());
        const userCounts = sortedData.map((d: any) => d.userCount);
        const commentCounts = sortedData.map((d: any) => d.commentCount);

        // Set data untuk Chart.js
        setChartData({
          labels,
          datasets: [
            {
              label: 'User Growth',
              data: userCounts,
              borderColor: '#FFA500', // Warna Oranye
              backgroundColor: 'rgba(255, 165, 0, 0.5)', // Oranye transparan
            },
            {
              label: 'Comment Growth',
              data: commentCounts,
              borderColor: '#800080', // Warna Ungu
              backgroundColor: 'rgba(128, 0, 128, 0.5)', // Ungu transparan
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='w-full max-w-4xl mx-auto'>
       <h3 className='text-2xl font-bold mb-4 text-center'>User and Comment Growth</h3>
      <Line data={chartData} options={options} />;
    </div>
  );
};

export default UserAndCommentLineChart;
