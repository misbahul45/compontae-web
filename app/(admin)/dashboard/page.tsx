import ShowLengthData from '@/components/dashboard/ShowLengthData';
import UserAndCommentBar from '@/components/dashboard/UserAndCommentBar';
import CommentWordCloud from '@/components/dashboard/worldCloudComment';
import { Separator } from '@/components/ui/separator';

const Page = async () => {
  return (
    <div className='pt-20 pb-24'>
      <h1 className='text-center lg:text-7xl md:text-5xl sm:text-4xl text-2xl font-bold md:mb-4 mb-2'>Dashboard</h1>
      <ShowLengthData/>
      <UserAndCommentBar />
      <Separator className='my-8' />
      <CommentWordCloud />
    </div>
  );
};

export default Page;
