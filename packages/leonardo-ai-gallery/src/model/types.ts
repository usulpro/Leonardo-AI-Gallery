
// Path: src/model/types.ts

// Enums for ImageGeneration status and presetStyle
export enum GenerationStatus {
    Complete = 'COMPLETE',
    Pending = 'PENDING',
    // Additional statuses can be added here
}

export enum PresetStyle {
    Creative = 'CREATIVE',
    // More styles will be added after testing with different styles
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
