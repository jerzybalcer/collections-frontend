import { AxiosResponse } from 'axios';
import { EditedItem, NewItem } from '../model';
import { apiClient } from './AxiosInstance';

export const getUserItems = async (): Promise<AxiosResponse> =>
    apiClient.get(`/items`).catch((err: AxiosResponse) => Promise.reject(err));

export const getUserFavouriteItems = async (): Promise<AxiosResponse> =>
    apiClient
        .get(`/items/favourite`)
        .catch((err: AxiosResponse) => Promise.reject(err));

export const addUserItem = async (newItem: NewItem): Promise<AxiosResponse> =>
    apiClient
        .post(`/item`, newItem)
        .catch((err: AxiosResponse) => Promise.reject(err));

export const getItemDetails = async (itemId: string): Promise<AxiosResponse> =>
    apiClient
        .get(`/item/${itemId}`)
        .catch((err: AxiosResponse) => Promise.reject(err));

export const deleteItem = async (itemId: string): Promise<AxiosResponse> =>
    apiClient
        .delete(`/item/${itemId}`)
        .catch((err: AxiosResponse) => Promise.reject(err));

export const toggleItemIsFavourite = async (
    itemId: string,
): Promise<AxiosResponse> =>
    apiClient
        .put(`/item/${itemId}/favourite`)
        .catch((err: AxiosResponse) => Promise.reject(err));

export const editItem = async (
    itemId: string,
    editedItem: EditedItem,
): Promise<AxiosResponse> =>
    apiClient
        .put(`/item/${itemId}`, editedItem)
        .catch((err: AxiosResponse) => Promise.reject(err));
