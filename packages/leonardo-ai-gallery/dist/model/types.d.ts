export declare enum GenerationStatus {
    Complete = "COMPLETE",
    Pending = "PENDING"
}
export declare enum PresetStyle {
    Creative = "CREATIVE"
}
export type GeneratedImage = {
    url: string;
    nsfw: boolean;
    id: string;
    likeCount: number;
    generated_image_variation_generics: any[];
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
    fantasyAvatar: any | null;
    generation_elements: any[];
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
