import React from 'react';
import { ExternalGalleryProps } from './types';
import { Gallery } from './gallery';
import { ProcessedGeneration } from '../model';

export const ServerGalleryWrapper = (props: ExternalGalleryProps) => {
  const processedServerGenerations: ProcessedGeneration[] | undefined =
    props.serverFetchedGenerations?.map((g) => ({
      ...g,
      _isSkeleton: false,
      token: props.token,
    }));
  return (
    <Gallery {...props} serverFetchedGenerations={processedServerGenerations} />
  );
};
