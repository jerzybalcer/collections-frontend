import { EditedItem, FullItem, NewItem, SimpleItem } from '../model';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getUserItems = async (): Promise<SimpleItem[]> =>
    fetch(`${baseUrl}/items`).then((response) => response.json());

export const getUserFavouriteItems = async (): Promise<SimpleItem[]> =>
    fetch(`${baseUrl}/items/favourite`).then((response) => response.json());

export const addUserItem = async (newItem: NewItem): Promise<Response> =>
    fetch(`${baseUrl}/item`, {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

export const getItemDetails = async (itemId: string): Promise<FullItem> =>
    fetch(`${baseUrl}/item/${itemId}`).then((response) => response.json());

export const deleteItem = async (itemId: string): Promise<Response> =>
    fetch(`${baseUrl}/item/${itemId}`, {
        method: 'DELETE',
    });

export const toggleItemIsFavourite = async (
    itemId: string,
): Promise<Response> =>
    fetch(`${baseUrl}/item/${itemId}/favourite`, {
        method: 'PUT',
    });

export const editItem = async (
    itemId: string,
    editedItem: EditedItem,
): Promise<Response> =>
    fetch(`${baseUrl}/item/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify(editedItem),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
