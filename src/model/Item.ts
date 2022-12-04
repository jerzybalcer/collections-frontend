import {
    NewItemCategory,
    SimplestCategory,
    FullItemCategory,
} from './Category';
import { TagValue } from './TagValue';

export interface SimpleItem {
    id: string;
    name: string;
    addedDate: string;
    acquiredDate: string;
    isFavourite: boolean;
    category: SimplestCategory;
}

export interface FullItem {
    name: string;
    description: string | null;
    addedDate: string;
    acquiredDate: string;
    isFavourite: boolean;
    imageUrl: string;
    tagValues: TagValue[];
    category: FullItemCategory;
}

export interface NewItem {
    name: string;
    description: string | null;
    acquiredDate: string;
    isFavourite: boolean;
    imageUrl: string;
    tags: TagValue[];
    category: NewItemCategory;
}
