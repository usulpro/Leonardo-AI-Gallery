import React from 'react';
import {
  ImageGeneration,
  UserInfo,
  fetchGenerationsByUserId,
  fetchUserInfo,
} from '../../model';

type UseAccountReturnType = {
  isUserLoading: boolean;
  userInfo: UserInfo | null;
  generations: (ImageGeneration | { id: string; _isSkeleton: boolean })[];
  generationsError: boolean;
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

  const generationSkeletons = new Array(limit)
    .fill({ _isSkeleton: true })
    .map((v, ind) => ({ id: `sk${ind}` }));

  return {
    isUserLoading: !userInfo && !userError,
    userInfo,
    generations: [
      ...generations,
      ...(generationsLoading ? generationSkeletons : []),
    ],
    generationsError,
  };
};
