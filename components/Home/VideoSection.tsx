import React from 'react';

const VideoSection = () => {
    return (          
        <div className="relative mt-8 flex flex-col items-center justify-center mb-12">
            <h1 className='text-center lg:text-4xl md:text-2xl text-xl font-bold mb-3'>OUR VIDEO</h1>
            <div className='w-full flex items-center snap-x justify-start overflow-x-auto no-scrollbar gap-4 px-4'>
                <iframe className='snap-center flex-none rounded-lg shadow-lg h-96 w-[60vw]' width="560" height="315" src="https://www.youtube.com/embed/iiP8tQzts7c?si=lI4HnzsH9XE7uyus" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />

                <iframe className='snap-center flex-none rounded-lg shadow-lg h-96 w-[60vw]' src="https://www.youtube.com/embed/ChcjDp1womw?si=8uiEXjfs8u3gIwOa" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />

                <iframe className='snap-center flex-none rounded-lg shadow-lg h-96 w-[60vw]' src="https://www.youtube.com/embed/L9US2_N8YVY?si=Cy8SOUOssZmxlbrX" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen />

            </div>
        </div>
    );
}

export default VideoSection;
