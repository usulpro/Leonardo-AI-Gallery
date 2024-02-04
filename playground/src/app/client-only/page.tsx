import React from 'react';
import { Gallery } from 'leonardo-ai-gallery';

const token = process.env.NEXT_PUBLIC_LEONARDO_API_TOKEN;

export default async function Home() {
  return <Gallery token={token!} pages={3} limit={3} />;
}
