'use client'
import { getPostsByPublishedAt } from "@/actions/post-action";
import { Post as PostSchema } from "@/schema/post-types";
import { useEffect, useState } from "react";
import Post from "./Post";
import { Loader2Icon } from "lucide-react";

const ShowAllBlog = () => {
    const [popularPost, setPopularPost] = useState<PostSchema[]>([]);

    useEffect(() => {
        const fetchPopularPost = async () => {
            try {
                const posts = await getPostsByPublishedAt();
                if (posts) {
                    setPopularPost(posts);
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
        {popularPost.length===0 && <p>
                <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                <span>Loading...</span>
            </p>}
    </div>
  )
}

export default ShowAllBlog