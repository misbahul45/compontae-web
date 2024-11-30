import { getLengthAllComment } from '@/actions/comment-action';
import { getLengthAllPosts } from '@/actions/post-action';
import { getLengthAllUser } from '@/actions/user-action';
const ShowLengthData = async () => {
  const lengthPost = await getLengthAllPosts();
  const lengthUser = await getLengthAllUser();
  const lengthComment = await getLengthAllComment();

  const data = [
    {
      title: 'Post',
      value: lengthPost,
    },
    {
      title: 'User',
      value: lengthUser,
    },
    {
      title: 'Comment',
      value: lengthComment,
    },
  ];

  return (
    <div className="w-full max-w-4xl px-6 grid gap-8 grid-cols-1 sm:grid-cols-3 mx-auto py-8">
      {data.map((item, i) => (
        <div
          key={i}
          className="bg-white shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          <p className="text-xl font-semibold text-gray-800">{item.title}</p>
          <p className="text-3xl font-bold text-indigo-600">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowLengthData;
