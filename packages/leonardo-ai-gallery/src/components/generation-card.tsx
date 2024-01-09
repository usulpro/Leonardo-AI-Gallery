/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/5P1s8U1ouwj
 */
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { CheckCircleIcon, PencilIcon } from './icons/v0';
import { ImageGeneration } from '../model';

export const GenerationCardDefaultProps = {
  promptTitle: 'Create a round thumbnail...',
  modelName: 'Leonardo Diffusion XL',
  inputResolution: '512 × 512px',
  createdDate: '06/01/24 at 12:48 PM',
  pipeline: 'Alchemy V2',
  seed: 624471552,
  preset: 'Dynamic',
  promptMagic: '-',
  initStrength: 'No init image',
  highContrast: '-',
  prompt:
    'ski slope in the alps. beautiful weather, bright sunshine, beautiful snow-covered slope, ski run between snow-covered spruce trees. blue, yellow, orange flags, happy people, big mountains in background',
  negativePrompt: 'nsfw, nude, nudity, text',
};

type GenerationCardProps = ImageGeneration & {
  promptTitle: string;
  modelName: string;
  inputResolution: string;
  publicImage: boolean;
  onRegenerate: ({
    prompt,
    negativePrompt,
    seed,
  }: {
    prompt: string;
    negativePrompt: string;
    seed: number;
  }) => void;
};

export function GenerationCard({
  promptTitle,
  modelName,
  modelId,
  inputResolution,
  createdAt,
  presetStyle,
  promptMagic,
  photoReal,
  seed,
  prompt,
  negativePrompt,
  publicImage,
  scheduler,
  onRegenerate,
}: GenerationCardProps) {
  const [currentPrompt, setPrompt] = useState(prompt);
  const [currentNegativePrompt, setNegativePrompt] = useState(negativePrompt);
  const [currentSeed, setSeed] = useState(seed);

  const handleRegenerate = () => {
    onRegenerate({
      prompt: currentPrompt,
      negativePrompt: currentNegativePrompt,
      seed: currentSeed,
    });
  };

  const date = new Date(createdAt).toLocaleString();

  return (
    <div key="1" className="bg-[#1a1a1a] text-white p-4 rounded-lg max-w-md">
      <h2 className="text-xl font-bold mb-4">{promptTitle}</h2>
      <div className="flex items-center mb-4">
        <PencilIcon className="text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold">{modelId}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-400">Input Resolution</p>
          <p className="text-sm">{inputResolution}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">Created</p>
          <p className="text-sm">{date}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">Pipeline</p>
          <div className="flex items-center">
            <CheckCircleIcon className="text-green-500 mr-1" />
            {/* <p className="text-sm">{pipeline}</p> */}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">Seed</p>
          <p className="text-sm">
            <Input
              className="bg-[#333333] border border-gray-400 text-white"
              value={currentSeed}
              onChange={(e) => setSeed(Number(e.target.value))}
              type="number"
            />
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">Preset</p>
          <p className="text-sm">{presetStyle}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">Scheduler</p>
          <p className="text-sm">{scheduler}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">Prompt Magic</p>
          <p className="text-sm">{promptMagic ? 'yes' : '-'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">Photo Real</p>
          <p className="text-sm">{photoReal ? 'yes' : '-'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">Public</p>
          <p className="text-sm">{publicImage ? 'yes' : '-'}</p>
        </div>
      </div>
      <Textarea
        className="bg-[#333333] text-white mb-4"
        placeholder="Amigurumi, frog, HW*"
        value={currentPrompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          color: 'white',
        }}
      />
      <Textarea
        className="bg-[#4d4d4d] text-gray-400 mb-4"
        placeholder="nsfw, nude, nudity, text"
        value={currentNegativePrompt}
        onChange={(e) => setNegativePrompt(e.target.value)}
      />
      <Button
        className="bg-blue-500 hover:bg-blue-600 w-full py-3 rounded-md"
        onClick={handleRegenerate}
      >
        Regenerate
      </Button>
    </div>
  );
}