import React from 'react';

const VideoSection = () => {
    return (          
        <div className="relative mt-8 flex flex-col items-center justify-center mb-12">
            <h1 className='text-center lg:text-4xl md:text-2xl text-xl font-bold mb-3'>OUR VIDEO</h1>
            <div className='w-full flex items-center snap-x justify-start overflow-x-auto no-scrollbar gap-4 px-4'>
                <video controls className='snap-center flex-none rounded-lg shadow-lg max-h-96'>
                    <source src="video.mp4" type="video/mp4" />
                    <source src="video.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>

                <video controls className='snap-center flex-none rounded-lg shadow-lg max-h-96'>
                    <source
                        src="https://utfs.io/f/L7c2JRqY80pwdTK7bEApQVZmhvCiwI134RqXrYBGUHdFE6S8"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <video controls className='snap-center flex-none rounded-lg shadow-lg max-h-96'>
                    <source
                        src="https://utfs.io/f/L7c2JRqY80pwkvO14GUEgZi84aQ0cDNRPsl3HLIvtb19ABo6"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}

export default VideoSection;
