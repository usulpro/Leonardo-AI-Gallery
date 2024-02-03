import React from 'react';
// @ts-ignore
import insertCss from 'insert-css';
import styles from '../styles.js';
import { Generation } from './generation';
import Header from './header';
import { useAccount } from './lib/fetching';

type GalleryProps = {
  token: string;
  limit?: number;
  pages?: number;
  options?: {
    pollingTimeout?: number;
  };
};

export const Gallery = ({
  token,
  limit = 8,
  pages = 3,
  options = {},
}: GalleryProps) => {
  const { pollingTimeout = 30 * 1000 } = options;
  React.useEffect(() => {
    insertCss(styles);
  }, []);

  const { generations, isUserLoading, userInfo, optimistic, refresh, generationsLoading } =
    useAccount({
      token,
      limit,
      pages,
      pollingTimeout,

    });

  return (
    <div>
      <Header
        userIsLoading={isUserLoading}
        userName={userInfo?.user.username}
        subscriptionTokens={userInfo?.subscriptionTokens}
        onRefresh={refresh}
        isLoading={generationsLoading}
        isUserLoading={isUserLoading}
      />
      <div>
        {generations.map((gen) => (
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
