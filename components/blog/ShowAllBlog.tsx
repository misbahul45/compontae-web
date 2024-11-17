"use client";
import { getLengthAllPosts, getPostsByPublishedAt } from "@/actions/post-action";
import { Post as PostSchema } from "@/schema/post-types";
import { useEffect, useState } from "react";
import Post from "./Post";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";

const LIMIT = 6;

const ShowAllBlog = () => {
    const [post, setPost] = useState<PostSchema[]>([]);
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
        const fetchPosts = async () => {
            if (isLoading) return;
            setIsLoading(true);
            try {
                const posts = await getPostsByPublishedAt({ no, limit: LIMIT });
                if (posts && posts.length > 0) {
                    setPost((prev) => {
                        const allPosts = [...prev, ...posts];
                        const postMap = new Map(allPosts.map((post) => [post.id, post]));
                        return Array.from(postMap.values());
                    });
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
            setIsLoading(false);
        };

        fetchPosts();
    }, [no, isLoading]);

    const handleFetchMorePost = () => {
        if (post.length < lengthPosts) {
            setNo((prev) => prev + 1);
        }
    };

    return (
        <>
            <div className="grid mt-8 sm:grid-cols-2 gap-4 w-full max-w-6xl mx-auto">
                {post.map((post) => (
                    <Post
                        key={post.id}
                        title={post.title}
                        date={post.published}
                        slug={post.slug}
                        content={post.description}
                        image={post.image}
                    />
                ))}
                {isLoading && post.length === 0 && (
                    <p className="flex text-center items-center gap-1 mt-12">
                        <Loader className="animate-spin mr-2 size-12" />
                        <span className="text-2xl font-semibold text-gray-400">Loading...</span>
                    </p>
                )}
            </div>

            {post.length < lengthPosts && !isLoading && (
                <Button
                    onClick={handleFetchMorePost}
                    variant={"outline"}
                    className="block mt-16 mx-auto px-12"
                >
                    Fetch more
                </Button>
            )}

            {no !== 0 && isLoading && post.length % LIMIT === 0 && (
                <p className="flex text-center items-center gap-1 mt-8">
                    <Loader className="animate-spin mr-2 size-12" />
                    <span className="text-xl font-semibold text-gray-400">Loading more...</span>
                </p>
            )}
        </>
    );
};

export default ShowAllBlog;
