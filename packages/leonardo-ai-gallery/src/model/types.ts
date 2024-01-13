// Path: src/model/types.ts

type Optional<T> = {
  [P in keyof T]?: T[P];
};

export enum GenerationStatus {
  Complete = 'COMPLETE',
  Pending = 'PENDING',
}

export enum PresetStyle {
  CREATIVE = 'CREATIVE',
  PORTRAIT = 'PORTRAIT',
  LANDSCAPE = 'LANDSCAPE',
  SKETCH_COLOR = 'SKETCH_COLOR',
  SKETCH_BW = 'SKETCH_BW',
  RENDER_3D = 'RENDER_3D',
  RAYTRACED = 'RAYTRACED',
  PHOTOGRAPHY = 'PHOTOGRAPHY',
  ILLUSTRATION = 'ILLUSTRATION',
  GENERAL = 'GENERAL',
  ENVIRONMENT = 'ENVIRONMENT',
  DYNAMIC = 'DYNAMIC',
  CINEMATIC = 'CINEMATIC',
  VIBRANT = 'VIBRANT',
  LEONARDO = 'LEONARDO',
  NONE = 'NONE',
}

// TypeScript type for Generated Image
export type GeneratedImage = {
  url: string;
  nsfw: boolean;
  id: string;
  likeCount: number;
  generated_image_variation_generics: any[]; // Update as per the actual structure
};

// TypeScript type for Image Generation
export type ImageGeneration = {
  generated_images: GeneratedImage[];
  modelId: string;
  prompt: string;
  negativePrompt: string;
  imageHeight: number;
  imageWidth: number;
  inferenceSteps: number | null;
  seed: number;
  public: boolean;
  scheduler: string;
  sdVersion: string;
  status: GenerationStatus;
  presetStyle: PresetStyle;
  initStrength: number;
  guidanceScale: number;
  id: string;
  createdAt: string;
  promptMagic: boolean;
  promptMagicVersion: string;
  promptMagicStrength: number;
  photoReal: boolean;
  photoRealStrength: number | null;
  fantasyAvatar: any | null; // Update as per the actual structure
  generation_elements: any[]; // Update as per the actual structure
};

export type ProcessedGeneration = Optional<ImageGeneration> & {
  model?: CustomModel;
  _isSkeleton: boolean;
};

export type UserInfo = {
  user: {
    id: string;
    username: string;
  };
  tokenRenewalDate: string;
  subscriptionTokens: number;
  subscriptionGptTokens: number;
  subscriptionModelTokens: number;
  apiConcurrencySlots: number;
};

// Types for Platform Models response
export type PlatformImage = {
  id: string;
  url: string;
};

export type CustomModel = {
  id: string;
  name: string;
  description: string;
  nsfw: boolean;
  featured: boolean;
  generated_image?: PlatformImage;
};
