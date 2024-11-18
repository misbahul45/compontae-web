"use client";
import { getLengthAllPosts, getPostsByPublishedAt } from "@/actions/post-action";
import { Post as PostSchema } from "@/schema/post-types";
import { useEffect, useState } from "react";
import Post from "./Post";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const LIMIT = 6;

interface Props{
    posts:PostSchema[] 
}

const ShowAllBlog = ({ posts }:Props) => {
    const [lengthPosts, setLengthPosts] = useState(0);
    const [no, setNo] = useState(1);
    const router=useRouter()

    useEffect(() => {
        const fetchLengthPosts = async () => {
            try {
                const totalPosts = await getLengthAllPosts();
                setLengthPosts(totalPosts);
            } catch (error) {
                console.error("Failed to fetch length of posts:", error);
            }
        };
        fetchLengthPosts();
    }, []);

    const handleFetchMorePost = () => {
        setNo(no+1);
    };

    useEffect(()=>{
        router.push(`/blog/${no}`)
    },[no])

    return (
        <>
            <div className="grid mt-8 sm:grid-cols-2 gap-4 w-full max-w-6xl mx-auto">
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        title={post.title}
                        date={post.published}
                        slug={post.slug}
                        content={post.description}
                        image={post.image}
                    />
                ))}
                {posts.length === 0 && (
                    <p className="flex text-center items-center gap-1 mt-12">
                        <Loader className="animate-spin mr-2 size-12" />
                        <span className="text-2xl font-semibold text-gray-400">Loading...</span>
                    </p>
                )}
            </div>

            {posts.length < lengthPosts && (
                <Button
                    onClick={handleFetchMorePost}
                    variant={"outline"}
                    className="block mt-16 mx-auto px-12"
                >
                    Fetch more
                </Button>
            )}

            {no !== 0 && posts.length % LIMIT === 0 && (
                <p className="flex text-center items-center gap-1 mt-8">
                    <Loader className="animate-spin mr-2 size-12" />
                    <span className="text-xl font-semibold text-gray-400">Loading more...</span>
                </p>
            )}
        </>
    );
};

export default ShowAllBlog;
