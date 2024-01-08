'use client';
import { Gallery } from 'leonardo-ai-gallery';

const token = process.env.NEXT_PUBLIC_LEONARDO_API_TOKEN;

export default function Home() {
  return <Gallery token={token!} pages={2} limit={3}/>;
}
