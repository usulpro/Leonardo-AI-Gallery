import { ImageGeneration } from './types';
export declare const fetchGenerationsByUserId: (token: string, userId: string, offset: number, limit: number) => Promise<ImageGeneration[]>;
export declare const fetchGenerationById: (token: string, generationId: string) => Promise<ImageGeneration>;
