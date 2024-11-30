'use client';

import { fetchComments } from '@/actions/comment-action';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { getTextRespon } from '@/actions/respon-action';

const WordCloud = dynamic(() => import('react-d3-cloud'), { ssr: false });

interface WordData {
  text: string;
  value: number;
}

const processCommentsForWordCloud = async (): Promise<WordData[]> => {
  try {
    const comments = await fetchComments();
    const respon=await getTextRespon();
    if (!comments || comments.length === 0 || !respon || respon.length === 0) {
      console.error('No comments found');
      return [];
    }

    const allTextComments = comments.map((comment: { body: string }) => comment.body).join(' ');
    const allTextRespon=respon.map((comment: { respon: string }) => comment.respon).join(' ');

    const allText = `${allTextComments} ${allTextRespon}`;
    const words = allText
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3 || word==='sangat' || word==='bagi' || word==='polae' || word==='yang' || word.includes('sangat') || word.includes('bagi') || word.includes('polae') || word.includes('yang'));

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
      setWords(wordData);
    };

    fetchData();
  }, []);

  const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

  return (
    <div className=''>
      <h3 className='text-2xl font-bold mb-4 text-center'>Word Cloud</h3>
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
    onWordMouseOver={(event, d) => {
      console.log("Mouse over word:", d.text);
      event.target.style.cursor='pointer';
    }}
  />
    </div>
  );
};

export default CommentWordCloud;
