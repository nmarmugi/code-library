'use client';

import { useEffect } from "react";

async function createPost(title: string, code: string) {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, code })
    });
  await response.json();
}

export default function Home() {

  useEffect(() => {
    async function getPosts() {
      const response = await fetch('/api/posts');
      const data = await response.json();
      console.log(data);
    }
    getPosts();
  }, [])

  return (
    <div>
      <button onClick={() => createPost('Ciao', 'Codice')}>POST</button>
    </div>
  );
}
