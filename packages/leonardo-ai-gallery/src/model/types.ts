// Path: src/model/types.ts

type Optional<T> = {
  [P in keyof T]?: T[P];
};

export enum GenerationStatus {
  Complete = 'COMPLETE',
  Pending = 'PENDING',
  Failed = 'FAILED',
  /* Statuses below not exist on the platform - we use it internally */
  Optimistic = 'OPTIMISTIC',
  OptimisticInit = 'OPTIMISTIC_INIT',
}

export enum TransformType {
  UPSCALE = 'UPSCALE',
  UNZOOM = 'UNZOOM',
  NOBG = 'NOBG',
  ORIGIN = 'ORIGIN',
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

export type ImageVariation = {
  url: string;
  id: string;
  status: GenerationStatus;
  transformType: TransformType;
};

export type GeneratedImage = {
  url: string;
  nsfw: boolean;
  id: string;
  likeCount: number;
  generated_image_variation_generics: ImageVariation[];
};

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
  token: string;
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

export type SortedVariations = {
  plain: ImageVariation[];
  sorted: {
    original: ImageVariation;
    upscales: ImageVariation[];
    unzooms: ImageVariation[];
    nobgs: ImageVariation[];
    unknowns: ImageVariation[];
  };
};

export type TransformProps = {
  title: string;
};

export type VariationJob = {
  id: string;
  apiCreditCost?: null;
  transformType: TransformType;
};

export type OptimisticJob = {
  transformType: TransformType;
  generationId: string;
  variationId: string;
  status: GenerationStatus;
  createdAt?: string;
  url?: string;
  job?: VariationJob;
};
