'use client'
import { getPostsByPublishedAt } from "@/actions/post-action";
import { Post as PostSchema } from "@/schema/post-types";
import { useEffect, useState } from "react";
import Post from "./Post";
import { Loader } from "lucide-react";

const ShowAllBlog = () => {
    const [popularPost, setPopularPost] = useState<PostSchema[]>([]);
    const [no, setNo] = useState(0);
    useEffect(() => {
        const fetchPopularPost = async () => {
            try {
                const posts = await getPostsByPublishedAt({no, limit:6});
                if (posts) {
                    setPopularPost((prev) => [...prev, ...posts]);
                }   
            } catch (error) {
                console.log(error);
            }
        }

        fetchPopularPost();
    }, [])
  return (
    <div className='mt-8 grid sm:grid-cols-2 gap-4 w-full max-w-6xl mx-auto space-y-4'>
        {popularPost?.map((post) => {
            return <Post key={post.id} title={post.title} date={post.published} slug={post.slug} content={post.description} image={post.image} />;
        })}
        {popularPost.length===0 && <p className="flex text-center items-center gap-1 mt-12">
                <Loader className="animate-spin mr-2 size-12" />
                <span className="text-2xl font-semibold text-gray-400">Loading...</span>
            </p>
        }
    </div>
  )
}

export default ShowAllBlog