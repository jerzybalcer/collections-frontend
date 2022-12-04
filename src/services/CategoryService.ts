import { SimpleCategory } from '../model';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getCategories = async (): Promise<SimpleCategory[]> =>
    fetch(`${baseUrl}/categories`).then((response) => response.json());

export const getTagsForCategory = async (
    categoryId: string,
): Promise<string[]> =>
    fetch(`${baseUrl}/category/${categoryId}/tags`).then((response) =>
        response.json(),
    );
