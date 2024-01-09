/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/azbQ0q7MBtW
 */
import React from 'react';
import { CardTitle, CardHeader, CardContent, Card } from './ui/card';
import { GenerationCard } from './generation-card';
import { VariantCard } from './variant-card';
import { ImageGeneration } from '../model';

// type GenerationProps = {
//   promptTitle: string;
//   modelName: string;
//   inputResolution: string;
//   createdDate: string;
//   pipeline: string;
//   seed: number;
//   preset: string;
//   promptMagic: string;
//   initStrength: string;
//   highContrast: string;
//   prompt: string;
//   negativePrompt: string;
// };

export function Generation(props: ImageGeneration) {
  const { generated_images, ...restProps } = props;
  const promptStart = (props?.prompt || '').slice(0, 26);
  const promptTitle =
    promptStart.length < (props?.prompt?.length || 0)
      ? `${promptStart}...`
      : promptStart;
  const handleRegenerate = () => null;
  return (
    <section
      className="dark w-full text-white py-12 px-8"
      style={{
        backgroundImage: 'linear-gradient(45deg, #1f1f25, #2d2d2d)',
      }}
    >
      <div className="mx-auto flex flex-row justify-start items-start gap-10">
        <div className="md:col-span-1 min-w-[400px]">
          <GenerationCard
            {...props}
            key={props.id}
            promptTitle={promptTitle}
            inputResolution={`${props.imageWidth} x ${props.imageHeight}`}
            publicImage={props.public}
            onRegenerate={handleRegenerate}
          />
        </div>
        <div
          className="md:col-span-2 grid md:grid-cols-4 gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          }}
        >
          {(generated_images || []).map((image) => (
            <VariantCard key={image.id} {...image} />
          ))}
          {/* <VariantCard />
          <VariantCard />
          <VariantCard />
          <VariantCard />
          <VariantCard />
          <VariantCard />
          <VariantCard /> */}
        </div>
      </div>
    </section>
  );
}