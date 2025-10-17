'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from "./components/home/PageHeader";
import { EmptyState } from "./components/home/EmptyState";
import { PostList } from "./components/home/PostList";
import Loader from './components/Loader';
import { getPosts } from '@/utils/getPosts';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data || []);
      } catch (err) {
        console.error("Errore nel recupero dei post:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader posts={posts} />
        {posts && posts.length > 0 ? (
          <PostList initialPosts={posts} onPostRemoved={(id) => {setPosts((prev) => prev.filter(p => p.id !== id))}} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
