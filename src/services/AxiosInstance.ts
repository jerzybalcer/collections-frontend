import axios, { AxiosInstance } from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const apiClient: AxiosInstance = axios.create({ baseURL: baseUrl });
