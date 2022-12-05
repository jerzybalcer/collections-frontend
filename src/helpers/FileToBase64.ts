export const fileToBase64 = (file: File): Promise<string | null> =>
    new Promise<string | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || null);
        reader.onerror = (error) => reject(error);
    });
