import { ImageGeneration, ProcessedGeneration } from '../model';

export type ExternalGalleryProps = {
  token: string;
  limit?: number;
  pages?: number;
  options?: {
    pollingTimeout?: number;
  };
  serverFetchedGenerations?: ImageGeneration[];
};

export type GalleryProps = {
  token: string;
  limit?: number;
  pages?: number;
  options?: {
    pollingTimeout?: number;
  };
  serverFetchedGenerations?: ProcessedGeneration[];
};
