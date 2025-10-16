import CopyButton from "@/app/components/CopyButton";
import { ErrorState } from "@/app/components/ErrorState";
import EditAndPreviewPost from "@/app/components/singlePost/EditAndPreviewPost";
import { supabase } from "@/lib/supabase/client";
import { CodePostCardProps } from "@/types/PostCard";
import Link from "next/link";

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default async function Post({ params }: PageProps) {
    const { id } = await params;

    const { data: post, error } = await supabase
        .from('code-posts')
        .select('*')
        .eq('id', id)
        .single<CodePostCardProps>()

    if (error || !post) {
        return <ErrorState />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <article
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-1 relative"
                >

                    <div className="p-6">
                        <div className="flex items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                {post.title}
                            </h2>
                            <CopyButton code={post.code} />
                        </div>

                        <EditAndPreviewPost id={post.id} code={post.code} />

                        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                            <Link href={'/'} className="cursor-pointer text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
                                ← Torna alla home
                            </Link>
                            <span className="flex items-center gap-1">
                                🕒 {new Date(post.created_at).toLocaleDateString('it-IT')}
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
