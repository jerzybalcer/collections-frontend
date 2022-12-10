import React, { useMemo, useState, createContext } from 'react';
import { TagValue } from '../model';

interface EditItemContextModel {
    name: string | null;
    description: string | null;
    acquiredDate: string | null;
    imageBase64: string | null;
    tagValues: TagValue[];
    setName: React.Dispatch<React.SetStateAction<string | null>>;
    setDescription: React.Dispatch<React.SetStateAction<string | null>>;
    setAcquiredDate: React.Dispatch<React.SetStateAction<string | null>>;
    setImageBase64: React.Dispatch<React.SetStateAction<string | null>>;
    setTagValues: React.Dispatch<React.SetStateAction<TagValue[]>>;
    reset: () => void;
}

interface ContextProps {
    children: JSX.Element;
}

export const EditItemContext = createContext<EditItemContextModel>(
    {} as EditItemContextModel,
);

export const EditItemContextProvider: React.FC<ContextProps> = ({
    children,
}) => {
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [acquiredDate, setAcquiredDate] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [tagValues, setTagValues] = useState<TagValue[]>([]);

    const reset = () => {
        setName(null);
        setDescription(null);
        setAcquiredDate(null);
        setImageBase64(null);
        setTagValues([]);
    };

    const value = useMemo(
        () => ({
            name,
            description,
            acquiredDate,
            imageBase64,
            tagValues,
            setName,
            setDescription,
            setAcquiredDate,
            setImageBase64,
            setTagValues,
            reset,
        }),
        [name, description, acquiredDate, imageBase64, tagValues],
    );

    return (
        <EditItemContext.Provider value={value}>
            {children}
        </EditItemContext.Provider>
    );
};
