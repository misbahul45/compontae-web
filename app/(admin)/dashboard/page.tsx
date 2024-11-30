import ShowLengthData from '@/components/dashboard/ShowLengthData';
import UserAndCommentBar from '@/components/dashboard/UserAndCommentBar';
import CommentWordCloud from '@/components/dashboard/worldCloudComment';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { getLengthAllComment } from '@/actions/comment-action';
import { getLengthAllPosts } from '@/actions/post-action';
import { getLengthAllUser } from '@/actions/user-action';

export async function getServerSideProps() {
  const lengthPost = await getLengthAllPosts();
  const lengthUser = await getLengthAllUser();
  const lengthComment = await getLengthAllComment();

  return {
    props: {
      lengthPost,
      lengthUser,
      lengthComment,
    },
  };
}

const Page = ({ lengthPost, lengthUser, lengthComment }: { lengthPost: number; lengthUser: number; lengthComment: number }) => {
  return (
    <div className='pt-20 pb-24'>
      <h1 className='text-center lg:text-7xl md:text-5xl sm:text-4xl text-2xl font-bold md:mb-4 mb-2'>Dashboard</h1>
      <ShowLengthData
        lengthComment={lengthComment}
        lengthPost={lengthPost}
        lengthUser={lengthUser}
      />
      <UserAndCommentBar />
      <Separator className='my-8' />
      <CommentWordCloud />
    </div>
  );
};

export default Page;
