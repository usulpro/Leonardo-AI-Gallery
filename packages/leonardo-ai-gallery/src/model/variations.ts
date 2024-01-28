import { API_BASE_URL } from './config';
import {
  GeneratedImage,
  GenerationStatus,
  ImageVariation,
  SortedVariations,
  TransformType,
  VariationJob,
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

type createUnzoomJobProps = {
  token: string;
  id: string;
  isVariation: boolean;
};

const createUnzoomJob = async ({
  token,
  id,
  isVariation,
}: createUnzoomJobProps): Promise<VariationJob> => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, isVariation }),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/variations/unzoom`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    if (!data?.sdUnzoomJob?.id) {
      throw new Error(
        `Error: no sdUnzoomJob in response - ${response.statusText}`,
      );
    }
    return { ...data.sdUnzoomJob, transformType: TransformType.UNZOOM };
  } catch (error) {
    console.error('Error creating unzoom job:', error);
    throw error;
  }
};

type createUpscaleJobProps = {
  token: string;
  id: string;
};

const createUpscaleJob = async ({
  token,
  id,
}: createUpscaleJobProps): Promise<VariationJob> => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/variations/upscale`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    if (!data?.sdUpscaleJob?.id) {
      throw new Error(
        `Error: no sdUpscaleJob in response - ${response.statusText}`,
      );
    }
    return { ...data.sdUpscaleJob, transformType: TransformType.UPSCALE };
  } catch (error) {
    console.error('Error creating upscale job:', error);
    throw error;
  }
};

type createNobgJobProps = {
  token: string;
  id: string;
  isVariation: boolean;
};

const createNobgJob = async ({
  token,
  id,
  isVariation,
}: createNobgJobProps): Promise<VariationJob> => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, isVariation }),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/variations/nobg`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    if (!data?.sdNobgJob?.id) {
      throw new Error(
        `Error: no sdNobgJob in response - ${response.statusText}`,
      );
    }
    return { ...data.sdNobgJob, transformType: TransformType.NOBG };
  } catch (error) {
    console.error('Error creating no background job:', error);
    throw error;
  }
};

export const transformsMap = {
  [TransformType.ORIGIN]: {
    header: 'Original',
    title: 'Original',
    prefix: '/0️/',
    icon: '🦋',
    color: 'white',
    startJob: ({ id }: { id: string }) => {
      console.warn(`Can't start a job for Original type`);
      return { id, transformType: TransformType.ORIGIN };
    },
  },
  [TransformType.UPSCALE]: {
    header: 'Upscaled',
    title: 'Scl',
    prefix: 's',
    icon: '💚',
    color: '#00d300',
    startJob: createUpscaleJob,
  },
  [TransformType.UNZOOM]: {
    header: 'Unzoomed',
    title: 'Zmd',
    prefix: 'z',
    icon: '🧡',
    color: '#d38d00',
    startJob: createUnzoomJob,
  },
  [TransformType.NOBG]: {
    header: 'No background',
    title: 'Bgd',
    prefix: 'b',
    icon: '💙',
    color: '#1185ff',
    startJob: createNobgJob,
  },
  unknown: {
    header: 'Unknown',
    title: '???',
    prefix: '?',
    icon: '🖤',
    color: '#7d7d7d',
    startJob: () => {
      throw new Error(`Can't start a job for unknown type`);
    },
  },
};

type createVariationJobProps = {
  token: string;
  id: string;
  isVariation: boolean;
  type: TransformType;
};

export const createVariationJob = async ({
  token,
  type,
  id,
  isVariation,
}: createVariationJobProps): Promise<VariationJob> => {
  const startJob = transformsMap[type].startJob;
  const result = await startJob({ token, id, isVariation });

  return result!;
};

// 1a708ce2-1ad9-4695-a3a2-ca3d1900b3e7
