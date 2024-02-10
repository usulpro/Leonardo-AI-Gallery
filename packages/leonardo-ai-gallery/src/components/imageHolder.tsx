import React from 'react';
import { ImageSkeleton, SquareLoader } from './ui/skeletons';
import {
  GenerationStatus,
  ImageVariation,
  TransformType,
  transformsMap,
} from '../model';
import { Button } from './ui/button';
import { ExpandIcon } from './icons/v0';
import { DnArrow } from './icons/heroiconts';

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

function generateFileName(
  title: string,
  transformType: string,
  id: string,
  url: string,
): string {
  let normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const maxLength = 26;
  if (normalizedTitle.length > maxLength) {
    normalizedTitle = normalizedTitle.substring(0, maxLength);
  }
  normalizedTitle = normalizedTitle.replace(/-$/, '');

  const idPart = id.length >= 3 ? id.substring(0, 3) : id.padEnd(3, 'x');

  const lastSegment = url.split('/').pop() || '.jpg';

  const extensionMatch = lastSegment.match(/\.[^\.]+$/);
  const ext = extensionMatch ? extensionMatch[0].substring(1) : 'jpg';

  return `${normalizedTitle}-${transformType}-${idPart}.${ext}`.toLowerCase();
}

const downloadImage = async (url: string, fileName: string) => {
  const fetchResponse = await fetch(url, {
    mode: 'cors',
  });
  const blob = await fetchResponse.blob();
  const urlObject = window.URL.createObjectURL(blob);

  const tempLink = document.createElement('a');
  tempLink.href = urlObject;
  tempLink.download = fileName;
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(urlObject);
};

type Props = {
  variation: ImageVariation;
  imageHeight: number;
  imageWidth: number;
  title: string;
};

export const ImageHolder = ({
  variation,
  imageHeight,
  imageWidth,
  title,
}: Props) => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [isDownloading, setIsDownloading] = React.useState<boolean>(false);
  const color = transformsMap[variation.transformType].color;

  const sizes = calcImageSize(imageWidth, imageHeight, expandedSettings);
  React.useDebugValue({ sizes });

  React.useEffect(() => {
    if (!imgRef.current) {
      return;
    }
    if (imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    const filename = generateFileName(
      title,
      variation.transformType,
      variation.id,
      variation.url,
    );
    await downloadImage(variation.url, filename);
    setIsDownloading(false);
  };

  return (
    <>
      {variation.status === GenerationStatus.Complete ? (
        <div
          className="relative"
          style={{ width: sizes.width, height: sizes.height }}
        >
          <img
            ref={imgRef}
            alt={title}
            className="w-full"
            src={variation.url}
            style={{
              objectFit: 'contain',
            }}
            loading="lazy"
            onLoad={() => {
              setTimeout(() => setIsLoaded(true), 100);
            }}
          />
          <div
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-800 transition-opacity"
            style={{ opacity: isLoaded ? 0 : 1 }}
          >
            <SquareLoader color={color} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <a
              className="m-2 rounded-full p-8 bg-gray-900 bg-opacity-70 text-gray-400 hover:bg-opacity-80 hover:bg-gray-800 hover:text-gray-100"
              href={variation.url}
              target="_blank"
            >
              <ExpandIcon className="mx-auto" />
            </a>
            <Button className="absolute top-0 left-0 m-2 bg-gray-900 bg-opacity-70 text-gray-400 hover:bg-opacity-80 hover:bg-gray-800 hover:text-gray-100">
              Action 1
            </Button>
            <Button className="absolute top-0 right-0 m-2 bg-gray-900 bg-opacity-70 text-gray-400 hover:bg-opacity-80 hover:bg-gray-800 hover:text-gray-100">
              Action 2
            </Button>
            <Button
              disabled={isDownloading}
              className="m-2 p-4 absolute right-0 bottom-0 bg-gray-900 bg-opacity-70 opacity-70 hover:bg-opacity-80 hover:bg-gray-800 hover:opacity-100 disabled:hover:opacity-40 disabled:animate-pulse"
              onClick={handleDownload}
              title="Download image"
            >
              <DnArrow color={isDownloading ? 'gray' : color} />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full flex justify-center items-center overflow-hidden"
          style={{ width: sizes.width, height: sizes.height }}
        >
          <ImageSkeleton color={color} />
        </div>
      )}
    </>
  );
};
