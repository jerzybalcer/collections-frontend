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

export interface FullCategory {
    name: string;
    color: string;
    tags: string[];
    canBeDeleted: boolean;
}

export interface EditedCategory {
    name: string | null;
    color: string | null;
    tags: string[];
}
