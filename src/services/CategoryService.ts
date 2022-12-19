import {
    EditedCategory,
    FullCategory,
    NewCategory,
    SimpleCategory,
} from '../model';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getCategories = async (): Promise<SimpleCategory[]> =>
    fetch(`${baseUrl}/categories`).then((response) => response.json());

export const getTagsForCategory = async (
    categoryId: string,
): Promise<string[]> =>
    fetch(`${baseUrl}/category/${categoryId}/tags`).then((response) =>
        response.json(),
    );

export const getCategoryDetails = async (
    categoryId: string,
): Promise<FullCategory> =>
    fetch(`${baseUrl}/category/${categoryId}`).then((response) =>
        response.json(),
    );

export const deleteCategory = async (categoryId: string): Promise<Response> =>
    fetch(`${baseUrl}/category/${categoryId}`, {
        method: 'DELETE',
    });

export const editCategory = async (
    categoryId: string,
    editedCategory: EditedCategory,
): Promise<Response> =>
    fetch(`${baseUrl}/category/${categoryId}`, {
        method: 'PUT',
        body: JSON.stringify(editedCategory),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

export const addCategory = async (
    newCategory: NewCategory,
): Promise<Response> =>
    fetch(`${baseUrl}/category`, {
        method: 'POST',
        body: JSON.stringify(newCategory),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
