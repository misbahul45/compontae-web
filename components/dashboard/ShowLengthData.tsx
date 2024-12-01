import { getLengthAllComment } from '@/actions/comment-action';
import { getLengthAllPosts } from '@/actions/post-action';
import { getAllLengthRespon } from '@/actions/respon-action';
import { getLengthAllUser } from '@/actions/user-action';

export const revalidate = 60

const ShowLengthData = async () => {
  try {
    const [lengthPost, lengthUser, lengthComment, lengthResponden] = await Promise.all([
      getLengthAllPosts(),
      getLengthAllUser(),
      getLengthAllComment(),
      getAllLengthRespon(),
    ]);

    const data = [
      { title: 'Post', value: lengthPost as number },
      { title: 'User', value: lengthUser as number },
      { title: 'Comment', value: lengthComment as number },
      { title: 'Responden', value: lengthResponden as number },
    ];

    return (
      <div className="w-full max-w-4xl px-6 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto py-8">
        {data.map((item, i) => (
          <div
            key={i}
            className="bg-slate-100 shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <p className="text-xl font-semibold text-gray-800">{item.title}</p>
            <p className="text-3xl font-bold text-indigo-600">{item.value}</p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch data:', JSON.stringify(error));
    return (
      <div className="text-center text-xl py-8 text-red-500">
        Failed to load data.
      </div>
    );
  }
};

export default ShowLengthData;
