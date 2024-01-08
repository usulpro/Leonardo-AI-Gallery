'use client';
import React from 'react';
import { VariantCard } from 'leonardo-ai-gallery';
import {
  GenerationCard,
  GenerationCardDefaultProps,
} from '../../components/generation-card';
import { Generation } from '../../components/generation';

export default function Home() {
  return (
    <main>
      <div>
        <Generation {...GenerationCardDefaultProps} />
      </div>
      <div>
        <VariantCard />
      </div>
      <div>
        <GenerationCard
          {...GenerationCardDefaultProps}
          onRegenerate={console.log}
        />
      </div>
    </main>
  );
}
