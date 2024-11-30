'use client';

import { getLengthAllComment } from '@/actions/comment-action';
import { getLengthAllPosts } from '@/actions/post-action';
import { getLengthAllUser } from '@/actions/user-action';
import { useEffect, useState } from 'react';

const ShowLengthData = () => {
  const [data, setData] = useState([
    { title: 'Post', value: 0 },
    { title: 'User', value: 0 },
    { title: 'Comment', value: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lengthPost, lengthUser, lengthComment] = await Promise.all([
          getLengthAllPosts(),
          getLengthAllUser(),
          getLengthAllComment(),
        ]);


        setData([
          { title: 'Post', value: lengthPost as number },
          { title: 'User', value: lengthUser as number },
          { title: 'Comment', value: lengthComment as number },
        ]);
      } catch (error) {
        console.error('Failed to fetch data:', JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-xl py-8">Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl px-6 grid gap-8 grid-cols-1 sm:grid-cols-3 mx-auto py-8">
      {data.map((item, i) => (
        <div
          key={i}
          className="bg-white shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          <p className="text-xl font-semibold text-gray-800">{item.title}</p>
          <p className="text-3xl font-bold text-indigo-600">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowLengthData;
