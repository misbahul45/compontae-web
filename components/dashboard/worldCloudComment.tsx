'use client';

import { fetchComments } from '@/actions/comment-action';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const WordCloud = dynamic(() => import('react-d3-cloud'), { ssr: false });

interface WordData {
  text: string;
  value: number;
}

const processCommentsForWordCloud = async (): Promise<WordData[]> => {
  try {
    const comments = await fetchComments();
    
    // Pastikan data komentar ada dan sesuai
    console.log("Fetched Comments:", comments);

    if (!comments || comments.length === 0) {
      console.error('No comments found');
      return [];
    }

    // Gabungkan semua komentar menjadi satu string
    const allText = comments.map((comment: { body: string }) => comment.body).join(' ');

    // Pisahkan teks menjadi kata-kata dan hitung frekuensi
    const words = allText
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3); // Hapus kata yang terlalu pendek

      const wordFrequency: Record<string, number> = words.reduce((acc: Record<string, number>, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {});

    const formattedData: WordData[] = Object.entries(wordFrequency).map(([text, value]) => ({
      text,
      value,
    }));

    console.log("Processed Word Data:", formattedData);

    return formattedData;
  } catch (error) {
    console.error("Error fetching or processing comments:", error);
    return [];
  }
};

const CommentWordCloud = () => {
  const [words, setWords] = useState<WordData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const wordData = await processCommentsForWordCloud();
      console.log("Fetched Word Data:", wordData);
      setWords(wordData);
    };

    fetchData();
  }, []);

  const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

  return (
    <div className=''>
      <h3 className='text-2xl font-bold mb-4 text-center'>Word Cloud Komentar</h3>
      <WordCloud
    data={words}
    height={200}
    font="Times"
    fontStyle="italic"
    fontWeight="bold"
    fontSize={(word) => Math.log2(word.value) * 5}
    spiral="archimedean"
    rotate={(word) => word.value % 360}
    padding={5}
    random={Math.random}
    fill={(_:unknown, i:string) => schemeCategory10ScaleOrdinal(i)}
    onWordClick={(event, d) => {
      console.log(`onWordClick: ${d.text}`);
    }}
    onWordMouseOver={(event, d) => {
      console.log(`onWordMouseOver: ${d.text}`);
    }}
    onWordMouseOut={(event, d) => {
      console.log(`onWordMouseOut: ${d.text}`);
    }}
  />
    </div>
  );
};

export default CommentWordCloud;
