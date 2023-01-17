import { AxiosResponse } from 'axios';
import { apiClient } from './AxiosInstance';
import { EditedCategory, NewCategory } from '../model';

export const getCategories = async (): Promise<AxiosResponse> =>
    apiClient
        .get(`/categories`)
        .catch((err: AxiosResponse) => Promise.reject(err));

export const getTagsForCategory = async (
    categoryId: string,
): Promise<AxiosResponse> =>
    apiClient
        .get(`/category/${categoryId}/tags`)
        .catch((err: AxiosResponse) => Promise.reject(err));

export const getCategoryDetails = async (
    categoryId: string,
): Promise<AxiosResponse> =>
    apiClient
        .get(`/category/${categoryId}`)
        .catch((err: AxiosResponse) => Promise.reject(err));

export const deleteCategory = async (
    categoryId: string,
): Promise<AxiosResponse> =>
    apiClient
        .delete(`/category/${categoryId}`)
        .catch((err: AxiosResponse) => Promise.reject(err));

export const editCategory = async (
    categoryId: string,
    editedCategory: EditedCategory,
): Promise<AxiosResponse> =>
    apiClient
        .put(`/category/${categoryId}`, editedCategory)
        .catch((err: AxiosResponse) => Promise.reject(err));

export const addCategory = async (
    newCategory: NewCategory,
): Promise<AxiosResponse> =>
    apiClient
        .post(`/category`, newCategory)
        .catch((err: AxiosResponse) => Promise.reject(err));
