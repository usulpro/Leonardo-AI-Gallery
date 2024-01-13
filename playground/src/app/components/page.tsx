'use client';
import React from 'react';
import { VariantCard } from 'leonardo-ai-gallery';

const variantProps = {
  url: 'https://cdn.leonardo.ai/users/eaedaca1-ddc9-4ba8-8e04-54f5efbd2cc3/generations/f03a8c23-3573-4a66-885d-7f087a54c888/Leonardo_Diffusion_XL_martian_butterfly_in_a_martian_landscape_0.jpg',
  nsfw: false,
  id: 'd3021dfa-bdc4-4bcc-98cf-7b2e9b042b86',
  likeCount: 0,
  generated_image_variation_generics: [],
};

export default function Home() {
  return (
    <main>
      <div>
        <VariantCard {...variantProps} />
      </div>
    </main>
  );
}
