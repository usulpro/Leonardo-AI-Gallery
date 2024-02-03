import React from 'react';
import { Button } from './ui/button';
import { DotsLoader } from './ui/skeletons';
import { LoadRecIcon } from './icons/tw';

type Props = {
  userIsLoading: boolean;
  userName?: string;
  subscriptionTokens?: number;
  onRefresh: () => void;
  isLoading: boolean;
  isUserLoading: boolean;
};

const Header = ({
  userName,
  subscriptionTokens,
  onRefresh,
  isLoading,
  isUserLoading,
}: Props) => {
  return (
    <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <div className="w-14 grow flex items-center">
        {isUserLoading ? (
          <DotsLoader />
        ) : (
          <div className='text-xl'>
            {userName}
            <span className='ml-4 text-sm text-indigo-200'>{`${subscriptionTokens} tokens`}</span>
          </div>
        )}
      </div>
      <div className="w-40 flex-none">
        <Button
          className="bg-blue-400 hover:bg-blue-300 disabled:bg-grey-400 w-full py-3 rounded-md"
          onClick={onRefresh}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex w-30 justify-end items-center">
              <div className="mr-4 w-12">
                <DotsLoader />
              </div>
              <div>Refresh</div>
            </div>
          ) : (
            <div className="flex w-30 justify-end items-center">
              <div className="mr-4 w-12">
                <div className="w-6 h-6">
                  <LoadRecIcon />
                </div>
              </div>
              <div>Refresh</div>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Header;
