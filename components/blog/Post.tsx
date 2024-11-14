'use client';
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import moment from "moment";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  content: string; 
  image: string;
  date: Date;
  slug:string
}

const Post = ({ title, content, image, date,slug }: Props) => {
  const router=useRouter()
  return (
    <Card onClick={()=>router.push(`/blog/read/${slug}`)} className="md:flex px-4 py-4 w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl cursor-pointer transition-all duration-100">
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="object-cover w-full lg:size-56 md:size-52 rounded-lg shadow-lg shadow-slate-600/30"
          priority
        />
      <CardHeader className="w-full">
        <div className="md:flex justify-between gap-2">
            <CardTitle className="text-gray-800 text-center font-semibold md:text-lg text-md">{title}</CardTitle>
            <p className="text-gray-400 text-nowrap text-xs">{moment(date).fromNow()}</p>
        </div>
        <div className="mt-2 lg:line-clamp-4 md:line-clamp-3 line-clamp-2" dangerouslySetInnerHTML={{ __html: content }}></div>
      </CardHeader>
    </Card>
  );
};

export default Post;
