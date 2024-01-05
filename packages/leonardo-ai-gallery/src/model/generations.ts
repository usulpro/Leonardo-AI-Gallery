
// Path: src/model/generations.ts

import { ImageGeneration } from './types';
import { API_BASE_URL } from './config';

// Function for fetching image generations by user ID with pagination
export const fetchGenerationsByUserId = async (token: string, userId: string, offset: number, limit: number): Promise<ImageGeneration[]> => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${API_BASE_URL}/generations/user/${userId}?offset=${offset}&limit=${limit}`, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data.generations || []; // Return an empty array if no generations are found
    } catch (error) {
        console.error('Error fetching generations:', error);
        throw error;
    }
};

// Function for fetching a specific image generation by ID
export const fetchGenerationById = async (token: string, generationId: string): Promise<ImageGeneration> => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${API_BASE_URL}/generations/${generationId}`, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data.generations_by_pk;
    } catch (error) {
        console.error('Error fetching specific generation:', error);
        throw error;
    }
};
