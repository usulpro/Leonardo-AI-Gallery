
// Path: src/model/userInfo.ts

import { UserInfo } from './types';
import { API_BASE_URL } from './config';

// Function for fetching user information
export const fetchUserInfo = async (token: string): Promise<UserInfo> => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${API_BASE_URL}/me`, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data.user_details[0];
    } catch (error) {
        console.error('Error fetching user information:', error);
        throw error;
    }
};
