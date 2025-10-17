import { supabase } from "@/lib/supabase/client";
import { PageHeader } from "./components/home/PageHeader";
import { EmptyState } from "./components/home/EmptyState";
import { ErrorState } from "./components/ErrorState";
import { PostList } from "./components/home/PostList";

export default async function Home() {
  const { data: posts, error } = await supabase
    .from('code-posts')
    .select('*')
    .order('created_at', { ascending: false })
    .throwOnError();;
    
  if (error) {
    return <ErrorState />;
  }
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader posts={posts} />
        {posts && posts.length > 0 ? (
          <PostList initialPosts={posts} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
