import { NewItem, SimpleItem } from '../model';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getUserItems = async (): Promise<SimpleItem[]> =>
    fetch(`${baseUrl}/user/11C4317C-4389-4BE8-949C-8A9D637BEE93/items`).then(
        (response) => response.json(),
    );

export const addUserItem = async (newItem: NewItem): Promise<Response> =>
    fetch(`${baseUrl}/user/11C4317C-4389-4BE8-949C-8A9D637BEE93/item`, {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
