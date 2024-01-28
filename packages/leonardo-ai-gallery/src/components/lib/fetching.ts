import React from 'react';
import {
  ImageGeneration,
  OptimisticJob,
  ProcessedGeneration,
  UserInfo,
  fetchGenerationsByUserId,
  fetchUserInfo,
} from '../../model';

import { GetModelByIdFunction, usePlatformModels } from './fetchPlatformModels';
import { mergeOptimisticJobs } from './optimistic';
import { UseOptimisticReturn, useOptimisticJobs } from './optimistic';

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

  const optimistic = useOptimisticJobs(token);

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
  const revertedGenerations: ImageGeneration[] = generations.map((g) => {
    return {
      ...g,
      generated_images: g.generated_images
        .map((im) => ({
          ...im,
          generated_image_variation_generics:
            // @ts-ignore // Note: doesn't TS know `toReversed`?
            im.generated_image_variation_generics.toReversed(),
        }))
        // @ts-ignore
        .toReversed(),
    };
  });

  const optimisticGenerations = mergeOptimisticJobs(
    revertedGenerations,
    optimisticJobs,
    getModelById,
  );

  const generationSkeletons = new Array(limit)
    .fill({ _isSkeleton: true })
    .map((v, ind) => ({ id: `sk${ind}`, ...v }));

  const processedGenerations: ProcessedGeneration[] = [
    ...optimisticGenerations,
    ...(generationsLoading ? generationSkeletons : []),
  ];
  return processedGenerations;
}
