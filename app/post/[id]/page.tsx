'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CardSinglePost from "@/app/components/singlePost/CardSinglePost";
import { CodePostCardProps } from "@/types/PostCard";
import Loader from '@/app/components/Loader';
import { getPostById } from '@/utils/getPostById';

export default function Post() {
    const { id } = useParams();
    const [post, setPost] = useState<CodePostCardProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id || Array.isArray(id)) return;

        async function loadPost() {
            try {
                const data = await getPostById(id as string);
                setPost(data);
            } catch (err) {
                console.error("Errore nel recupero del post:", err);
            } finally {
                setLoading(false);
            }
        }

        loadPost();
    }, [id]);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <CardSinglePost
                    id={post!.id}
                    title={post!.title}
                    code={post!.code}
                    created_at={post!.created_at}
                />
            </div>
        </div>
    );
}
