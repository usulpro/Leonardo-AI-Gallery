'use client';
import React from 'react';
// @ts-expect-error this is old package
import insertCss from 'insert-css';
import styles from '../styles.js';
import { Generation } from './generation';
import Header from './header';
import { useAccount } from './lib/fetching';
import { GalleryProps } from './types';
import { ImageGeneration } from '../model/types.js';

function isBrowserEnv() {
  try {
    return (
      typeof window !== 'undefined' && typeof window.document !== 'undefined'
    );
  } catch (e) {
    return false;
  }
}

if (isBrowserEnv()) {
  insertCss(styles);
}

export const Gallery = ({
  token,
  limit = 8,
  pages = 3,
  options = {},
  serverFetchedGenerations = [],
}: GalleryProps) => {
  const { pollingTimeout = 30 * 1000 } = options;

  const {
    generations,
    isUserLoading,
    userInfo,
    optimistic,
    refresh,
    generationsLoading,
  } = useAccount({
    token,
    limit,
    pages,
    pollingTimeout,
    initialGenerations: serverFetchedGenerations as ImageGeneration[],
  });

  const currentGenerations =
    generations.length === 0 ? serverFetchedGenerations : generations;

  return (
    <div>
      <Header
        userIsLoading={isUserLoading}
        userName={userInfo?.user.username}
        subscriptionTokens={userInfo?.subscriptionTokens}
        onRefresh={refresh}
        isLoading={generationsLoading || isUserLoading}
        isUserLoading={isUserLoading}
      />
      <div>
        {currentGenerations.map((gen) => (
          <Generation
            key={gen.id}
            {...gen}
            token={token}
            optimistic={optimistic}
          />
        ))}
      </div>
    </div>
  );
};
