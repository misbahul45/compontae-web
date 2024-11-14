import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { carouselItems } from "@/constants";

const Carrousel = () => {


  return (
    <Carousel className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem
            key={index}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    priority
                    className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black/50 text-white">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-sm">{item.description}</p>
                </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute z-10 top-1/2 -translate-y-1/2 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
        <ChevronLeftIcon className="w-5 h-5 text-gray-800" />
      </CarouselPrevious>
      <CarouselNext className="absolute z-10 top-1/2 -translate-y-1/2 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
        <ChevronRightIcon className="w-5 h-5 text-gray-800" />
      </CarouselNext>
    </Carousel>
  );
};

export default Carrousel;
