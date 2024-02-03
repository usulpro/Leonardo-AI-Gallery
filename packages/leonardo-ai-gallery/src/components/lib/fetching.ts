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

const useGenerationPolling = (pollingTimeout: number = 30 * 1000) => {
  const [time, setTime] = React.useState<Date | null>(null);

  const refresh = () => {
    setTime(new Date());
  };

  React.useEffect(() => {
    const timeoutID = setTimeout(refresh, pollingTimeout);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [time]);

  return {
    pollingTime: time,
    refresh,
  };
};

type UseGenerationFetchingProps = {
  token: string;
  limit: number;
  pages: number;
  userInfo: UserInfo | null;
};

const useGenerationFetching = ({
  token,
  limit,
  pages,
  userInfo,
}: UseGenerationFetchingProps) => {
  const [generations, setGenerations] = React.useState<ImageGeneration[]>([]);
  const [generationsError, setGenerationsError] =
    React.useState<boolean>(false);
  const [generationsLoading, setGenerationsLoading] =
    React.useState<boolean>(false);
  const [offset, setOffset] = React.useState<number>(0);
  const maxOffset: number = (pages - 1) * limit + 1;

  React.useDebugValue({
    offset,
  });

  React.useEffect(() => {
    if (!userInfo?.user) {
      return;
    }
    offset;
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

  const reset = () => {
    setOffset(0);
    setGenerations([]);
  };

  return {
    generations,
    generationsLoading,
    generationsError,
    reset,
  };
};

type UseAccountReturnType = {
  isUserLoading: boolean;
  userInfo: UserInfo | null;
  generations: ProcessedGeneration[];
  generationsError: boolean;
  generationsLoading: boolean;
  getModelById: GetModelByIdFunction;
  optimistic: UseOptimisticReturn;
  refresh: () => void;
};

type UseAccountProps = {
  token: string;
  limit: number;
  pages: number;
  pollingTimeout: number;
};

export const useAccount = ({
  token,
  limit,
  pages,
  pollingTimeout,
}: UseAccountProps): UseAccountReturnType => {
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);
  const [userError, setUserError] = React.useState<boolean>(false);

  const storedGenerations = React.useRef<ImageGeneration[]>([]);
  const { generations, generationsError, generationsLoading, reset } =
    useGenerationFetching({ token, limit, pages, userInfo });

  const { getModelById } = usePlatformModels(token);

  const optimistic = useOptimisticJobs(token);
  const { pollingTime, refresh } = useGenerationPolling(pollingTimeout);

  React.useDebugValue({
    userInfo,
    limit,
    pages,
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
    reset();
  }, [pollingTime]);

  const mergedGenerations = mergeGenerations(
    storedGenerations.current,
    generations,
  );
  storedGenerations.current = mergedGenerations;

  const processedGenerations: ProcessedGeneration[] = processGenerations({
    limit,
    generations: storedGenerations.current,
    getModelById,
    generationsLoading,
    optimisticJobs: optimistic.optimisticJobs,
  });

  return {
    isUserLoading: !userInfo && !userError,
    userInfo,
    generations: processedGenerations,
    generationsError,
    generationsLoading,
    getModelById,
    optimistic,
    refresh,
  };
};

function mergeGenerations(
  prevGens: ImageGeneration[],
  newGens: ImageGeneration[],
): ImageGeneration[] {
  const allGens = [...newGens, ...prevGens];
  const allIDs = new Set(allGens.map((g) => g.id));

  // @ts-ignore
  const mergedGens: ImageGeneration[] = [...allIDs.values()].map((id) =>
    allGens.find((g) => g.id === id),
  );

  const sortedGens = mergedGens.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return sortedGens;
}

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
