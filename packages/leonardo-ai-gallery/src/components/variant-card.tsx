/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Fes4s2CoCqZ
 */
import React from 'react';
import { CardHeader, CardContent, CardFooter, Card } from './ui/card';
import { ImageHolder } from './imageHolder';
import { Button } from './ui/button';
import { ImageSkeleton, SmallSpinner } from './ui/skeletons';
import { ExpandIcon, SmileIcon, UploadIcon } from './icons/v0';
import {
  GenerationStatus,
  ImageVariation,
  SortedVariations,
  TransformType,
  createVariationJob,
  transformsMap,
} from '../model';
import { UseOptimisticReturn } from './lib/optimistic';

type VarianButtonProps = {
  title?: string;
  type: TransformType | null;
  isActive: boolean;
  onActivate: () => void;
  status1?: boolean;
  status2?: boolean;
  status: GenerationStatus;
};

const OriginButton = ({
  status1,
  status2,
  isActive,
  onActivate,
}: VarianButtonProps) => {
  return (
    <div
      className="w-24 h-24 flex-none flex justify-center items-center p-2 self-center"
      style={{
        flex: 'none',
        width: 60,
        height: 60,
        padding: 8,
        alignSelf: 'center',
      }}
    >
      <button
        className={`relative w-full h-full border border-gray-800 ${
          isActive ? 'bg-gray-700' : 'bg-gray-800'
        } rounded-md text-lg hover:bg-gray-700`}
        style={{ height: '100%' }}
        title={transformsMap[TransformType.ORIGIN].title}
        onClick={onActivate}
      >
        {transformsMap[TransformType.ORIGIN].prefix}
        {status1 ? (
          <div className="absolute bottom-0 left-0 rounded-full bg-violet-500 w-2 h-2" />
        ) : null}
        {status2 ? (
          <div className="absolute bottom-0 right-0 rounded-full bg-red-700 w-2 h-2" />
        ) : null}
      </button>
    </div>
  );
};

const VarianButton = ({
  title,
  type,
  status1,
  status2,
  isActive,
  onActivate,
  status,
}: VarianButtonProps) => {
  if (type === TransformType.ORIGIN) {
    return (
      <OriginButton
        type={type}
        isActive={isActive}
        onActivate={onActivate}
        status1={status1}
        status2={status2}
        status={status}
      />
    );
  }
  return (
    <button
      className={`relative rounded-sm px-4 py-1 w-11 h-full hover:bg-gray-600 ${
        isActive ? 'bg-gray-700' : 'bg-gray-800'
      } text-sm`}
      onClick={onActivate}
    >
      {status === GenerationStatus.Complete ? (
        <span
          className="opacity-90"
          style={{ color: transformsMap[type || 'unknown'].color }}
        >
          {title}
        </span>
      ) : (
        <SmallSpinner
          color={transformsMap[type || 'unknown'].color}
          status={status}
        />
      )}
      {status1 ? (
        <div className="absolute bottom-1 left-2 rounded-full bg-violet-500 w-1 h-1" />
      ) : null}
      {status2 ? (
        <div className="absolute bottom-1 right-2 rounded-full bg-red-700 w-1 h-1" />
      ) : null}
    </button>
  );
};

const AddVariationButton = ({
  title,
  type,
  onStart,
}: {
  title: string;
  type: TransformType;
  onStart: () => void;
}) => {
  return (
    <button
      className={`relative rounded-sm px-4 w-11 h-full bg-sky-950 hover:bg-sky-900  text-sm`}
      onClick={onStart}
    >
      <span className="text-lg">{title}</span>
    </button>
  );
};

const VariationsRow = ({
  variations,
  type,
  activeVariation,
  onActive,
  onStart,
}: {
  variations: ImageVariation[];
  type: TransformType | null;
  activeVariation: ImageVariation;
  onActive: (v: ImageVariation) => void;
  onStart: (t: TransformType) => void;
}) => {
  if (!type) {
    return null;
  }

  const handleActivate = (v: ImageVariation) => () => onActive(v);
  const handleStart = () => {
    onStart(type);
  };

  return (
    <div
      className="flex flex-row justify-start items-center gap-[2px] h-7"
      style={{ color: transformsMap[type || 'unknown'].color }}
    >
      <div className="text-[12px]  mr-1 w-8 text-nowrap flex-none">
        {transformsMap[type].title}:
      </div>
      {variations.map((v, ind) => (
        <VarianButton
          key={v.id}
          title={`${transformsMap[type].prefix}${ind + 1}`}
          type={type}
          isActive={activeVariation.id === v.id}
          onActivate={handleActivate(v)}
          status={v.status}
        />
      ))}
      {variations.length < 4 ? (
        <AddVariationButton title="+" type={type} onStart={handleStart} />
      ) : null}
    </div>
  );
};

type VariantCardProps = {
  generated_image_variation_generics: object[];
  likeCount: number;
  nsfw: boolean;
  url: string;
  variations: SortedVariations;
  token: string;
  generationId?: string;
  optimistic: UseOptimisticReturn;
  imageHeight?: number;
  imageWidth?: number;
};

export function VariantCard({
  variations,
  token,
  optimistic,
  generationId,
  imageHeight = 512,
  imageWidth =  768,
}: VariantCardProps) {
  const [variation, setVariation] = React.useState<ImageVariation>(
    variations.plain[0],
  );

  const handleSetActive = (v: ImageVariation) => {
    setVariation(v);
  };

  const handleGenerateVariation = async (type: TransformType) => {
    if (!generationId) {
      console.warn(`Cant' init transformation job: no generation ID is passed`);
      return;
    }
    const isVariation = variations.sorted.original.id !== variation.id;
    const addJob = optimistic.initJob({
      transformType: type,
      generationId,
      variationId: variations.sorted.original.id,
    });
    const result = await createVariationJob({
      type,
      id: variation.id,
      token,
      isVariation,
    });
    addJob(result);
    return result;
  };

  return (
    <Card
      className=" bg-gray-800 text-white"
      style={{
        // width: 320,
        borderWidth: '3px',
        borderStyle: 'solid',
        borderImage:
          'linear-gradient(216deg, rgb(121 29 118), rgb(0, 65, 195)) 1 / 1 / 0 stretch',
      }}
    >
      <CardHeader className="flex justify-between flex-row align-baseline p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-lg">
            {transformsMap[variation.transformType].icon}
          </span>
          <span>{transformsMap[variation.transformType].header}</span>
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <UploadIcon className="text-blue-500" />
          <span>Uploaded</span>
        </div>
      </CardHeader>
      <CardContent className="relative group p-0">
        {variation.status === GenerationStatus.Complete ? (
          <ImageHolder
            key={variation.url}
            src={variation.url}
            alt={transformsMap[variation.transformType].header}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
          />
        ) : (
          <div className="w-full h-[200px] flex justify-center items-center overflow-hidden">
            <ImageSkeleton />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="m-2 bg-white text-black rounded-full p-8">
            <ExpandIcon className="mx-auto" />
          </Button>
          <Button className="m-2 bg-white text-black absolute top-0 left-0">
            Action 1
          </Button>
          <Button className="m-2 bg-white text-black absolute top-0 right-0">
            Action 2
          </Button>
        </div>
      </CardContent>
      {/* <div className={`bg-gray-700 h-3 w-full border-b-2 ${tabBorderColor}`} /> */}
      <CardFooter
        className="flex flex-row justify-start items-start px-0 py-2 bg-gray-900 min-h-24 gap-2"
        // style={{ minHeight: 100 }}
      >
        <VarianButton
          type={TransformType.ORIGIN}
          isActive={variation.id === variations.sorted.original.id}
          onActivate={() => setVariation(variations.sorted.original)}
          status={GenerationStatus.Pending}
          // status1
          // status2
        />
        <div
          className="flex flex-col justify-start items-start gap-2"
          style={{ gap: 4 }}
        >
          <VariationsRow
            variations={variations.sorted.upscales}
            type={TransformType.UPSCALE}
            activeVariation={variation}
            onActive={handleSetActive}
            onStart={handleGenerateVariation}
          />
          <VariationsRow
            variations={variations.sorted.unzooms}
            type={TransformType.UNZOOM}
            activeVariation={variation}
            onActive={handleSetActive}
            onStart={handleGenerateVariation}
          />
          <VariationsRow
            variations={variations.sorted.nobgs}
            type={TransformType.NOBG}
            activeVariation={variation}
            onActive={handleSetActive}
            onStart={handleGenerateVariation}
          />
          <VariationsRow
            variations={variations.sorted.unknowns}
            activeVariation={variation}
            onActive={handleSetActive}
            onStart={handleGenerateVariation}
            type={null}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
