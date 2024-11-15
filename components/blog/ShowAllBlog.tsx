"use client";
import { getLengthAllPosts, getPostsByPublishedAt } from "@/actions/post-action";
import { Post as PostSchema } from "@/schema/post-types";
import { useEffect, useState } from "react";
import Post from "./Post";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";

const LIMIT = 6;

const ShowAllBlog = () => {
    const [popularPost, setPopularPost] = useState<PostSchema[]>([]);
    const [lengthPosts, setLengthPosts] = useState(0);
    const [no, setNo] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        const fetchPopularPost = async () => {
            setIsLoading(true);
            try {
                const posts = await getPostsByPublishedAt({ no, limit: LIMIT });
                if (posts && posts.length > 0) {
                    const uniquePosts = posts.filter(
                        (post) => !popularPost.some((p) => p.id === post.id)
                    );
                    setPopularPost((prev) => {
                        const allPosts = [...prev, ...uniquePosts];
                        const postMap = new Map(allPosts.map((post) => [post.id, post]));
                        const uniquePostsById = Array.from(postMap.values());
                        return uniquePostsById;
                    });                    
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
            setIsLoading(false);
        };

        fetchPopularPost();
    }, [no, popularPost]);

    const handleFetchMorePost = () => {
        setNo((prev) => prev + 1);
    };

    return (
        <>
            <div className="grid mt-8 sm:grid-cols-2 gap-4 w-full max-w-6xl mx-auto">
                {popularPost.map((post) => (
                    <Post
                        key={post.id}
                        title={post.title}
                        date={post.published}
                        slug={post.slug}
                        content={post.description}
                        image={post.image}
                    />
                ))}
                {isLoading && popularPost.length === 0 && (
                    <p className="flex text-center items-center gap-1 mt-12">
                        <Loader className="animate-spin mr-2 size-12" />
                        <span className="text-2xl font-semibold text-gray-400">Loading...</span>
                    </p>
                )}
            </div>

            {popularPost.length < lengthPosts && !isLoading && (
                <Button
                    onClick={handleFetchMorePost}
                    variant={"outline"}
                    className="block mt-16 mx-auto px-12"
                >
                    Fetch more
                </Button>
            )}
            
            {isLoading && popularPost.length > 0 && (
                <p className="flex text-center items-center gap-1 mt-8">
                    <Loader className="animate-spin mr-2 size-12" />
                    <span className="text-xl font-semibold text-gray-400">Loading more...</span>
                </p>
            )}
        </>
    );
};

export default ShowAllBlog;
