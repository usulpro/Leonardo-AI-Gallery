import React from 'react';

type ImageSizeSettings = {
  maxHeight: number;
  minHeight: number;
  baseWidth: number;
  maxWidth: number;
};

type CalcImageSizeResult = {
  width: number;
  height: number;
};

const expandedSettings: ImageSizeSettings = {
  baseWidth: 320,
  maxWidth: 640,
  minHeight: 240,
  maxHeight: 800,
};

export function calcImageSize(
  w: number,
  h: number,
  settings: ImageSizeSettings,
): CalcImageSizeResult {
  const aspectRatio = w / h;
  const baseHeight = settings.baseWidth / aspectRatio;
  if (baseHeight > settings.maxHeight) {
    return {
      height: settings.maxHeight,
      width: settings.baseWidth,
    };
  }
  if (baseHeight < settings.minHeight) {
    const midSizes = {
      height: settings.minHeight,
      width: settings.minHeight * aspectRatio,
    };
    if (midSizes.width <= settings.maxWidth) {
      return midSizes;
    }
    const k = settings.maxWidth / midSizes.width;
    return {
      height: midSizes.height * k,
      width: midSizes.width * k,
    };
  }
  return {
    width: settings.baseWidth,
    height: settings.baseWidth / aspectRatio,
  };
}

type Props = {
  src: string;
  alt: string;
  imageHeight: number;
  imageWidth: number;
};

export const ImageHolder = ({ alt, src, imageHeight, imageWidth }: Props) => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const sizes = calcImageSize(imageWidth, imageHeight, expandedSettings);
  React.useDebugValue({ sizes });

  return (
    <div
      className="relative"
      style={{ width: sizes.width, height: sizes.height }}
    >
      <img
        alt={alt}
        className="w-full"
        src={src}
        style={{
          objectFit: 'contain',
        }}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
      {isLoaded ? null : (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
};
