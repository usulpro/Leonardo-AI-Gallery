import React from 'react';

type Props = {
  userIsLoading: boolean;
  userName?: string;
  userAvatar?: string;
};

const Header = ({ userAvatar, userName }: Props) => {
  return <div className="h-20 bg-blue-500 p-4 text-white">{userName}</div>;
};

export default Header;
