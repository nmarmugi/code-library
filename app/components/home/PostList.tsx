"use client";

import { useState } from "react";
import { CodePostCard } from "./CodePostCard";
import { CodePostCardProps } from "@/types/PostCard";
import { deletePost } from "@/utils/deletePost";
import { useRouter } from "next/navigation";

interface PostListProps {
    initialPosts: CodePostCardProps[];
}

export function PostList({ initialPosts }: PostListProps) {
    const [posts, setPosts] = useState<CodePostCardProps[]>(initialPosts);
    const router = useRouter();
    
    const handleDelete = async (id: number) => {
        try {
            await deletePost(id);
            setPosts((prev) => prev.filter((post) => post.id !== id));
            router.refresh();
        } catch (err) {
            console.error("Errore durante l'eliminazione:", err);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <CodePostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    code={post.code}
                    created_at={post.created_at}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}
