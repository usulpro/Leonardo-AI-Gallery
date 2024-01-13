// Path: src/model/platformModels.ts

import { API_BASE_URL } from './config';
import { CustomModel } from './types';

export const fetchPlatformModels = async (
  token: string,
): Promise<{
  custom_models: CustomModel[];
}> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}/platformModels`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching platform models:', error);
    throw error;
  }
};
