'use client';
import React from "react";
import {
  Card,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import moment from "moment";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

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
    <Card className="lg:flex items-start gap-4 px-4 py-4 w-full h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-100">
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="object-cover w-full lg:size-40 rounded-lg shadow-lg shadow-slate-600/30"
          priority
        />
      <div className="w-full">
        <div className="md:flex justify-between gap-2">
            <CardTitle className="text-gray-800 line-clamp-2 font-semibold md:text-lg text-md">{title}</CardTitle>
            <p className="text-gray-400 text-nowrap text-xs">{moment(date).fromNow()}</p>
        </div>
        <div className="mt-2 md:line-clamp-3 line-clamp-2 text-xs" dangerouslySetInnerHTML={{ __html: content }}></div>
      <Button onClick={()=>router.push(`/blog/read/${slug}`)} className="mt-4 w-fit bg-violet-600 hover:bg-violet-700">Read More</Button>
      </div>
    </Card>
  );
};

export default Post;
