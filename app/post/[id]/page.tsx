import { ErrorState } from "@/app/components/ErrorState";
import CardSinglePost from "@/app/components/singlePost/CardSinglePost";
import { supabase } from "@/lib/supabase/client";
import { CodePostCardProps } from "@/types/PostCard";

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
                <CardSinglePost id={post.id} title={post.title} code={post.code} created_at={post.created_at} />
            </div>
        </div>
    );
}
