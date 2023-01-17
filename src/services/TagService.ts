import { AxiosResponse } from 'axios';
import { apiClient } from './AxiosInstance';

export const getTags = async (): Promise<AxiosResponse> =>
    apiClient.get(`/tags`).catch((err: AxiosResponse) => Promise.reject(err));
