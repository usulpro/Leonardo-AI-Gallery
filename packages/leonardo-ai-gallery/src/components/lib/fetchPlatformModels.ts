import React from 'react';
import { CustomModel, fetchPlatformModels } from '../../model';

export type GetModelByIdFunction = (
  id: string,
  isPhotoReal: boolean,
) => CustomModel | { id: string; isLoading: true } | null;

export const usePlatformModels = (token: string) => {
  const [models, setModels] = React.useState<CustomModel[]>([]);
  React.useEffect(() => {
    fetchPlatformModels(token).then((data) => {
      setModels(data.custom_models);
    });
  }, []);

  const getModelById: GetModelByIdFunction = (id, isPhotoReal) => {
    if (isPhotoReal) {
      return {
        name: 'Photo Real',
        description:
          'Leonardo PhotoReal is our latest innovation, a powerful pipeline designed to help you create everything from cinematic photography to lifelike portraits. As a valuable addition to the Leonardo creative suite, it not only excels in photorealism, but also shines in bringing a strong dash of realism to other aesthetics.',
        featured: true,
        id,
        nsfw: false,
      };
    }
    if (!id) {
      return null;
    }
    const model = models.find((m) => m.id === id);
    return model || { id, isLoading: true };
  };

  return {
    isLoading: !models.length,
    getModelById,
  };
};
