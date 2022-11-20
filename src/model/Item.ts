export interface SimpleItem {
    id: string;
    name: string;
    addedDate: string;
    acquiredDate: string;
}

export interface FullItem {
    name: string;
    description: string | null;
    addedDate: string;
    acquiredDate: string;
    isFavourite: boolean;
    imageUrl: string;
}
