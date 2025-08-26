import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type { Department } from '../types';

// Configuration de l'instance Axios
const api: AxiosInstance = axios.create({
  baseURL: 'https://tt-jsonserver-01.alt-tools.tech',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (error.response?.status === 404) {
      console.error('API Error:', error);
      return api(error.config);
    }

    throw error;
  },
);

export default api;

export function mapDepartment(apiData: any): Department {
  return {
    id: apiData.id,
    name: apiData.name,
    description: apiData.description,
    createdAt: apiData.created_at,
    updatedAt: apiData.updated_at,
  };
}
