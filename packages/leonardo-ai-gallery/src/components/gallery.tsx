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
};

export const Gallery = ({ token, limit = 8, pages = 3 }: GalleryProps) => {
  React.useEffect(() => {
    insertCss(styles);
  }, []);

  const { generations, isUserLoading, userInfo } = useAccount({
    token,
    limit,
    pages,
  });
  return (
    <div>
      <Header
        userIsLoading={isUserLoading}
        userName={userInfo?.user.username}
      />
      <div>
        {generations.map((gen) => (
          <Generation key={gen.id} {...gen} token={token} />
        ))}
      </div>
    </div>
  );
};
