import React from 'react';
import {
  GeneratedImage,
  GenerationStatus,
  ImageGeneration,
  ImageVariation,
  OptimisticJob,
  TransformType,
  VariationJob,
  fetchJob,
} from '../../model';
import { GetModelByIdFunction } from './fetchPlatformModels';

type AddJob = (job: VariationJob) => void;
type InitJob = (props: {
  transformType: TransformType;
  generationId: string;
  variationId: string;
}) => AddJob;

export type UseOptimisticReturn = {
  initJob: InitJob;
  optimisticJobs: OptimisticJob[];
};

const pollingTimings = [1, 1, 2, 3, 5, 8, 13, 21];

export const useOptimisticJobs = (token: string): UseOptimisticReturn => {
  const [jobs, setJobs] = React.useState<OptimisticJob[]>([]);

  const jobPolling = async (ind: number, jobId: string) => {
    const result = await fetchJob({ token, id: jobId });
    const timing = pollingTimings[ind];
    setJobs((currentJobs) => {
      const newJobs: OptimisticJob[] = currentJobs.map((j) => {
        if (j.job?.id !== result?.id) {
          return j;
        }
        return {
          ...j,
          job: result,
          status: result.status,
          url: result.url,
        };
      });
      return newJobs;
    });
    if (!timing || result.status === GenerationStatus.Complete) {
      return;
    }
    setTimeout(() => jobPolling(ind + 1, jobId), timing * 1000);
  };

  const initJob: InitJob = ({ transformType, generationId, variationId }) => {
    const optimisticJob: OptimisticJob = {
      transformType,
      generationId,
      variationId,
      status: GenerationStatus.OptimisticInit,
    };
    const newJobs = [...jobs, optimisticJob];
    setJobs(newJobs);

    const addJob: AddJob = (job) => {
      setJobs((currentJobs) => {
        const updatedJobs = currentJobs.map((j) => {
          if (j !== optimisticJob) {
            return j;
          }
          return {
            ...optimisticJob,
            status: GenerationStatus.Optimistic,
            job,
          };
        });
        return updatedJobs;
      });
      jobPolling(0, job.id);
    };

    return addJob;
  };

  return {
    initJob,
    optimisticJobs: jobs,
  };
};

export function mergeOptimisticJobs(
  revertedGenerations: ImageGeneration[],
  optimisticJobs: OptimisticJob[],
  getModelById: GetModelByIdFunction,
) {
  return revertedGenerations.map((g) => {
    const matchingJobs = optimisticJobs.filter((j) => j.generationId === g.id);
    let matchingImages = g.generated_images;
    if (matchingJobs.length > 0) {
      const jobIDs = matchingJobs.map((j) => j.variationId);
      matchingImages = g.generated_images.map((im) => {
        if (!jobIDs.includes(im.id)) {
          return im;
        }
        const jobs = matchingJobs.filter((j) => j.variationId === im.id);
        const optimisticImage: GeneratedImage = {
          ...im,
          generated_image_variation_generics: [
            ...im.generated_image_variation_generics,
            ...jobs.map((j) => {
              const variation: ImageVariation = {
                id: j.job?.id || 'init',
                status: j.status,
                transformType: j.transformType,
                url: j.job?.url || '',
              };
              return variation;
            }),
          ],
        };
        return optimisticImage;
      });
    }
    return {
      ...g,
      generated_images: matchingImages,
      model: getModelById(g.modelId, g.photoReal),
      _isSkeleton: false,
    };
  });
}
