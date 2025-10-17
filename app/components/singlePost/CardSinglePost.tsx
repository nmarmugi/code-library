'use client';

import Link from "next/link";
import EditAndPreviewPost from "./EditAndPreviewPost";
import EditNamePost from "./EditNamePost";
import { useEffect, useState } from "react";
import Loader from "../Loader";

interface CardSinglePost {
    id: number;
    title: string;
    code: string;
    created_at: string;
}

export default function CardSinglePost({id, title, code, created_at}: CardSinglePost) {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <Loader />;
    
    return (
        <article
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-1 relative"
        >
            <div className="p-6">
                <EditNamePost id={id} code={code} title={title} />

                <EditAndPreviewPost id={id} code={code} />

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <Link href={'/'} className="cursor-pointer text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
                        ← Torna alla home
                    </Link>
                    <span className="flex items-center gap-1">
                        🕒 {new Date(created_at).toLocaleDateString('it-IT')}
                    </span>
                </div>
            </div>
        </article>
    );
}
