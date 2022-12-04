import { FullItem } from '../model';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getItemDetails = async (itemId: string): Promise<FullItem> =>
    fetch(`${baseUrl}/item/${itemId}`).then((response) => response.json());

export const deleteItem = async (itemId: string): Promise<Response> =>
    fetch(`https://localhost:7185/api/item/${itemId}`, {
        method: 'DELETE',
    });

export const toggleItemIsFavourite = async (
    itemId: string,
): Promise<Response> =>
    fetch(`https://localhost:7185/api/item/${itemId}/favourite`, {
        method: 'PUT',
    });
