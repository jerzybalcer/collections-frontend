export interface SimpleCategory {
    id: string;
    name: string;
    color: string;
}

export interface NewItemCategory {
    id: string | null;
    name: string | null;
    color: string | null;
}

export interface SimplestCategory {
    name: string;
    color: string;
}

export interface FullItemCategory {
    name: string;
    color: string;
    tags: string[];
}
