"use client";

import { useEffect, useState } from "react";
import { CodePostCard } from "./CodePostCard";
import { CodePostCardProps } from "@/types/PostCard";
import { deletePost } from "@/utils/deletePost";
import { showToast } from "nextjs-toast-notify";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Loader from "../Loader";

interface PostListProps {
    initialPosts: CodePostCardProps[];
    onPostRemoved?: (id: number) => void;
}

export function PostList({ initialPosts, onPostRemoved }: PostListProps) {
    const [posts, setPosts] = useState<CodePostCardProps[]>(initialPosts);
    const [modalPostId, setModalPostId] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    useEffect(() => { Prism.highlightAll(); }, []);

    const handleDelete = async (id: number) => {
        try {
            await deletePost(id);
            setPosts(prev => prev.filter(post => post.id !== id));
            if (onPostRemoved) onPostRemoved(id);
            setModalPostId(null);

            showToast.success("Snippet eliminato con successo!", {
                duration: 4000, progress: true, position: "bottom-center", transition: "slideInUp"
            });
        } catch (err) {
            console.error("Errore durante l'eliminazione:", err);
            showToast.error("Problema nell'eliminazione dello snippet!", {
                duration: 4000, progress: true, position: "bottom-center", transition: "slideInUp"
            });
        }
    };

    const handleOpenModal = (id: number) => setModalPostId(id);
    const handleCloseModal = () => setModalPostId(null);

    if (!mounted) return <Loader />;

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
                    onOpen={() => handleOpenModal(post.id)}
                    isOpenModal={modalPostId === post.id}
                    setIsOpenModal={handleCloseModal}
                    className="language-jsx"
                />
            ))}
        </div>
    );
}
