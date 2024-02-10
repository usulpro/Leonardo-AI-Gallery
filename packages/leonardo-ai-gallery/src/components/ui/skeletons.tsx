import React from 'react';
import { GenerationStatus } from '../../model';

export const ImageSkeleton = ({ color }: { color?: string }) => {
  return (
    <div
      role="status"
      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center w-full h-full"
    >
      <div
        className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700"
        style={{ backgroundColor: color }}
      >
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      {/* <div className="w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      </div> */}
      {/* <span className="sr-only">Loading...</span> */}
    </div>
  );
};

const PulseSpinner = ({ color }: { color: string }) => {
  const style = { backgroundColor: color };
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="relative inline-flex">
        <div style={style} className="w-2 h-2 rounded-full" />
        <div
          style={style}
          className="w-2 h-2 rounded-full absolute top-0 left-0 animate-ping"
        />
        <div
          style={style}
          className="w-2 h-2 rounded-full absolute top-0 left-0 animate-pulse"
        />
      </div>
    </div>
  );
};

export const SmallSpinner = ({
  color,
  status,
}: {
  color: string;
  status: GenerationStatus;
}) => {
  if (status === GenerationStatus.OptimisticInit) {
    return <PulseSpinner color={color} />;
  }
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
        viewBox="0 0 100 101"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const DotsLoader = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-2 h-2 rounded-full bg-violet-600 animate-bounce"></div>
      <div
        className="w-2 h-2 rounded-full bg-violet-600 animate-bounce"
        style={{ animationDelay: '-.3s' }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-violet-600 animate-bounce"
        style={{ animationDelay: '-.5s' }}
      ></div>
    </div>
  );
};

export const SquareLoader = ({
  color = 'gray',
}: {
  color?: string;
}) => {
  return (
    <div className="w-12 h-12">
      <div
        className="rounded-md h-12 w-12 border-4 border-t-4 animate-spin absolute"
        style={{ borderColor: color }}
      />
    </div>
  );
};
