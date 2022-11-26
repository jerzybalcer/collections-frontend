import React, { useMemo, useState, createContext } from 'react';

interface ItemInfo {
    name: string;
    description: string;
    acquiredDate: string;
    isFavourite: boolean;
}

interface TagValue {
    name: string;
    value: string;
}

export interface NewCategory {
    name: string;
    color: string;
    tags: string[];
}

interface AddItemContextModel {
    itemInfo: ItemInfo;
    categoryId: string | null;
    newCategory: NewCategory;
    tagValues: TagValue[];
    setItemInfo: React.Dispatch<React.SetStateAction<ItemInfo>>;
    setCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
    setNewCategory: React.Dispatch<React.SetStateAction<NewCategory>>;
    setTagValues: React.Dispatch<React.SetStateAction<TagValue[]>>;
    reset: () => void;
}

interface ContextProps {
    children: JSX.Element;
}

export const AddItemContext = createContext<AddItemContextModel>(
    {} as AddItemContextModel,
);

export const AddItemContextProvider: React.FC<ContextProps> = ({
    children,
}) => {
    const [itemInfo, setItemInfo] = useState<ItemInfo>({} as ItemInfo);
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [newCategory, setNewCategory] = useState<NewCategory>(
        {} as NewCategory,
    );
    const [tagValues, setTagValues] = useState<TagValue[]>([]);

    const reset = () => {
        setCategoryId(null);
        setItemInfo({} as ItemInfo);
        setTagValues([]);
        setNewCategory({} as NewCategory);
    };

    const value = useMemo(
        () => ({
            itemInfo,
            categoryId,
            newCategory,
            tagValues,
            setItemInfo,
            setCategoryId,
            setNewCategory,
            setTagValues,
            reset,
        }),
        [itemInfo, categoryId, newCategory, tagValues],
    );

    return (
        <AddItemContext.Provider value={value}>
            {children}
        </AddItemContext.Provider>
    );
};
