'use client';
import React from 'react';
import { VariantCard } from 'leonardo-ai-gallery';
import { GenerationCard } from '../../components/generation';

export default function Home() {
  return (
    <main>
      <div>
        <VariantCard />
      </div>
      <div>
        <GenerationCard />
      </div>
    </main>
  );
}
