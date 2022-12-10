import { EditedItem, FullItem } from '../model';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

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
