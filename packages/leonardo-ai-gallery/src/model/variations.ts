import {
  GeneratedImage,
  GenerationStatus,
  ImageVariation,
  SortedVariations,
  TransformType,
} from './types';

export const sortVariations = (image: GeneratedImage): SortedVariations => {
  const original: ImageVariation = {
    url: image.url,
    id: image.id,
    status: GenerationStatus.Complete,
    transformType: TransformType.ORIGIN,
  };
  const upscales: ImageVariation[] = [];
  const unzooms: ImageVariation[] = [];
  const nobgs: ImageVariation[] = [];
  const unknowns: ImageVariation[] = [];

  const sortFn = {
    [TransformType.UPSCALE]: (v: ImageVariation) => upscales.push(v),
    [TransformType.UNZOOM]: (v: ImageVariation) => unzooms.push(v),
    [TransformType.NOBG]: (v: ImageVariation) => nobgs.push(v),
    unknown: (v: ImageVariation) => unknowns.push(v),
  };

  image.generated_image_variation_generics?.forEach((v) => {
    const putToArray =
      sortFn[v.transformType as Exclude<TransformType, TransformType.ORIGIN>] ||
      sortFn.unknown;
    putToArray(v);
  });

  return {
    plain: [original, ...image.generated_image_variation_generics],
    sorted: {
      original,
      upscales,
      unzooms,
      nobgs,
      unknowns,
    },
  };
};

export const transformsMap = {
  [TransformType.ORIGIN]: {
    header: 'Original',
    title: 'Original',
    prefix: '/0️/',
    icon: '🦋',
  },
  [TransformType.UPSCALE]: {
    header: 'Upscaled',
    title: 'Scl',
    prefix: 's',
    icon: '💚',
    color: '#00d300',
  },
  [TransformType.UNZOOM]: {
    header: 'Unzoomed',
    title: 'Zmd',
    prefix: 'z',
    icon: '🧡',
    color: '#d38d00',
  },
  [TransformType.NOBG]: {
    header: 'No background',
    title: 'Bgd',
    prefix: 'b',
    icon: '💙',
    color: '#1185ff',
  },
  unknown: {
    header: 'Unknown',
    title: '???',
    prefix: '?',
    icon: '🖤',
    color: '#7d7d7d',
  },
};
