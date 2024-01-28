import React from 'react';
import {
  GeneratedImage,
  GenerationStatus,
  ImageGeneration,
  ImageVariation,
  OptimisticJob,
  ProcessedGeneration,
  TransformType,
  UserInfo,
  VariationJob,
  fetchGenerationsByUserId,
  fetchUserInfo,
} from '../../model';

import { GetModelByIdFunction, usePlatformModels } from './fetchPlatformModels';

type UseAccountReturnType = {
  isUserLoading: boolean;
  userInfo: UserInfo | null;
  generations: ProcessedGeneration[];
  generationsError: boolean;
  getModelById: GetModelByIdFunction;
  optimistic: UseOptimisticReturn;
};

type UseAccountProps = {
  token: string;
  limit: number;
  pages: number;
};

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

const useOptimisticJobs = (): UseOptimisticReturn => {
  const [jobs, setJobs] = React.useState<OptimisticJob[]>([]);
  console.log('🚀 ~ useOptimisticJobs ~ jobs:', jobs);

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
    };

    return addJob;
  };

  return {
    initJob,
    optimisticJobs: jobs,
  };
};

export const useAccount = ({
  token,
  limit,
  pages,
}: UseAccountProps): UseAccountReturnType => {
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);
  const [userError, setUserError] = React.useState<boolean>(false);
  const [generations, setGenerations] = React.useState<ImageGeneration[]>([]);
  const [generationsError, setGenerationsError] =
    React.useState<boolean>(false);
  const [generationsLoading, setGenerationsLoading] =
    React.useState<boolean>(false);
  const [offset, setOffset] = React.useState<number>(0);
  const maxOffset: number = (pages - 1) * limit + 1;

  const { getModelById } = usePlatformModels(token);

  const optimistic = useOptimisticJobs();

  React.useDebugValue({
    userInfo,
    limit,
    pages,
    offset,
  });

  React.useEffect(() => {
    setUserError(false);
    fetchUserInfo(token)
      .then(setUserInfo)
      .catch((error) => {
        console.error(error);
        setUserError(true);
      });
  }, [token]);

  React.useEffect(() => {
    if (!userInfo?.user) {
      return;
    }
    setGenerationsError(false);
    setGenerationsLoading(true);
    fetchGenerationsByUserId({
      token,
      userId: userInfo?.user.id,
      offset,
      limit,
    })
      .then((newGens) => {
        setGenerations([...generations, ...newGens]);
      })
      .then(() => {
        if (offset > maxOffset) {
          setGenerationsLoading(false);
          return;
        }
        setOffset(offset + limit);
      })
      .catch((error) => {
        console.error(error);
        setGenerationsError(true);
        setGenerationsLoading(false);
      });
  }, [userInfo?.user?.id, offset]);

  const processedGenerations: ProcessedGeneration[] = processGenerations({
    limit,
    generations,
    getModelById,
    generationsLoading,
    optimisticJobs: optimistic.optimisticJobs,
  });

  return {
    isUserLoading: !userInfo && !userError,
    userInfo,
    generations: processedGenerations,
    generationsError,
    getModelById,
    optimistic,
  };
};

function processGenerations({
  limit,
  generations,
  getModelById,
  generationsLoading,
  optimisticJobs,
}: {
  limit: number;
  generations: ImageGeneration[];
  getModelById: GetModelByIdFunction;
  generationsLoading: boolean;
  optimisticJobs: OptimisticJob[];
}) {
  const optimisticGenerations = generations.map((g) => {
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
                url: '',
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

  const generationSkeletons = new Array(limit)
    .fill({ _isSkeleton: true })
    .map((v, ind) => ({ id: `sk${ind}`, ...v }));

  const processedGenerations: ProcessedGeneration[] = [
    ...optimisticGenerations,
    ...(generationsLoading ? generationSkeletons : []),
  ];
  return processedGenerations;
}
