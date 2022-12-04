const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getTags = async (): Promise<string[]> =>
    fetch(`${baseUrl}/tags`).then((response) => response.json());
