import { Post as PostSchema } from "@/schema/post-types";
import Post from "./Post";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"  
import { Separator } from "../ui/separator";


interface Props{
    getposts:PostSchema[] 
    lengthPosts?:number
    list:number
}

const ShowAllBlog = ({ getposts, lengthPosts, list }:Props) => {

    return (
        <>
            <div className="grid mt-8 sm:grid-cols-2 gap-4 w-full max-w-6xl mx-auto">
                {getposts.map((post) => (
                    <Post
                        key={post.id}
                        title={post.title}
                        date={post.published}
                        slug={post.slug}
                        content={post.description}
                        image={post.image}
                    />
                ))}
            </div>
            {lengthPosts && (
                <>
                    <Separator className="my-8" />
                    <Pagination>
                        <PaginationContent>
                            <PaginationPrevious href={`/blog/${list-1}`} />
                            {Array.from({ length: Math.ceil(lengthPosts / 6) })
                                .map((_, index) => (
                                    <PaginationItem
                                        key={index}
                                    >
                                        <PaginationLink className={list===(index+1) ? "bg-slate-800 text-white" : "hover:bg-slate-500 hover:text-white"} href={`/blog/${index + 1}`}>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                            ))}
                            <PaginationEllipsis />
                            <PaginationNext href={`/blog/${list===Math.ceil(lengthPosts / 6) ? list : list+1}`} />
                        </PaginationContent>
                    </Pagination>
                </>
            )}
        </>
    );
};

export default ShowAllBlog;
