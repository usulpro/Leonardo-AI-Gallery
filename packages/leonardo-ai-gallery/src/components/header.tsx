import React from 'react';
import { Button } from './ui/button';

type Props = {
  userIsLoading: boolean;
  userName?: string;
  userAvatar?: string;
  onRefresh: () => void;
};

const Header = ({ userAvatar, userName, onRefresh }: Props) => {
  return (
    <div className="bg-blue-500 p-4 text-white flex justify-between items-baseline">
      {userName}
      <div>
        <Button
          className="bg-gray-500 hover:bg-gray-600 w-full py-3 rounded-md"
          onClick={onRefresh}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default Header;
