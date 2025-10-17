"use client";

import { useEffect, useState } from "react";
import { CodePostCard } from "./CodePostCard";
import { CodePostCardProps } from "@/types/PostCard";
import { deletePost } from "@/utils/deletePost";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import Loader from "../Loader";

interface PostListProps {
    initialPosts: CodePostCardProps[];
}

export function PostList({ initialPosts }: PostListProps) {
    const [posts, setPosts] = useState<CodePostCardProps[]>(initialPosts);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        Prism.highlightAll();
    }, []);
    
    const handleDelete = async (id: number) => {
        try {
            await deletePost(id);
            setPosts((prev) => prev.filter((post) => post.id !== id));
            setIsOpenModal(false);
            showToast.success("Snippet eliminato con successo!", {
                duration: 4000,
                progress: true,
                position: "bottom-center",
                transition: "slideInUp",
                icon: '',
                sound: true,
            });
            router.refresh();
        } catch (err) {
            console.error("Errore durante l'eliminazione:", err);
            showToast.error("Problema nell'eliminazione dello snippet!", {
                duration: 4000,
                progress: true,
                position: "bottom-center",
                transition: "slideInUp",
                icon: '',
                sound: true,
            });
        }
    };

    const handleOpenModal = () => {
        setIsOpenModal(!isOpenModal);
    }
    
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
                    onOpen={handleOpenModal}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    className="language-jsx"
                />
            ))}
        </div>
    );
}
