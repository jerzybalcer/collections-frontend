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

interface AddItemContextModel {
    itemInfo: ItemInfo;
    categoryId: string | null;
    tagValues: TagValue[];
    setItemInfo: React.Dispatch<React.SetStateAction<ItemInfo>>;
    setCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
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
    const [tagValues, setTagValues] = useState<TagValue[]>([]);

    const reset = () => {
        setCategoryId(null);
        setItemInfo({} as ItemInfo);
        setTagValues([]);
    };

    const value = useMemo(
        () => ({
            itemInfo,
            categoryId,
            tagValues,
            setItemInfo,
            setCategoryId,
            setTagValues,
            reset,
        }),
        [itemInfo, categoryId, tagValues],
    );

    return (
        <AddItemContext.Provider value={value}>
            {children}
        </AddItemContext.Provider>
    );
};
