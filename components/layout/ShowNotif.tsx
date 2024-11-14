'use client';

import React, { useEffect, useState } from 'react';
import { getAllNotification } from '@/actions/notification-action';

const ShowNotif = () => {
  const [notification, setNotification] = useState<Array<{ title: string, body: string }>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const notif = await getAllNotification();
        setNotification(notif);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotification();
  }, []);

  return (
    <ul className='absolute top-[120%] w-96 max-w-md right-0 bg-white shadow-md rounded-md p-4 z-50'>
      {loading ? (
        <p className='text-sm text-gray-500'>Loading...</p>
      ) : notification.length > 0 ? (
        notification.map((notif, index) => (
          <li key={index} className='mb-2 p-2 rounded hover:bg-gray-100'>
            <h1 className='font-semibold'>{notif.title}</h1>
            <p className='text-sm text-gray-700'>{notif.body}</p>
          </li>
        ))
      ) : (
        <p className='text-sm text-gray-500'>No notifications found.</p>
      )}
    </ul>
  );
};

export default ShowNotif;
