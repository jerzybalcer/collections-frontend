import React, { useState } from 'react';
import {
    Drawer,
    Flex,
    TextInput,
    Textarea,
    Checkbox,
    Button,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

interface NewItem {
    name: string;
    description: string;
    acquiredDate: string;
    isFavourite: boolean;
    tags: AttachedTag[];
}

interface AttachedTag {
    id: string;
    name: string;
    value: string;
    color: string;
}

const emptyNewItem: NewItem = {
    name: '',
    description: '',
    acquiredDate: '',
    isFavourite: false,
    tags: [],
};

interface ItemAdderProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    refetchItems: () => void;
}

export const ItemAdder: React.FC<ItemAdderProps> = ({
    isOpen,
    setIsOpen,
    refetchItems,
}) => {
    const [newItem, setNewItem] = useState<NewItem>(emptyNewItem);

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const changedItem = { ...newItem };
        changedItem.name = event.currentTarget.value;
        setNewItem(changedItem);
    };

    const onChangeDate = (date: Date | null): void => {
        const changedItem = { ...newItem };
        changedItem.acquiredDate = date?.toISOString() ?? '';
        setNewItem(changedItem);
    };

    const onChangeDescription = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ): void => {
        const changedItem = { ...newItem };
        changedItem.description = event.currentTarget.value;
        setNewItem(changedItem);
    };

    const onChangeIsFavourite = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const changedItem = { ...newItem };
        changedItem.isFavourite = event.currentTarget.checked;
        setNewItem(changedItem);
    };

    const addItem = async (): Promise<void> => {
        fetch(
            'https://localhost:7185/api/user/11C4317C-4389-4BE8-949C-8A9D637BEE93/item',
            {
                method: 'POST',
                body: JSON.stringify(newItem),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        ).then((response) => {
            if (response.ok) {
                showNotification({
                    title: 'Success!',
                    message: 'Item added to your collection',
                    color: 'teal',
                    icon: <IconCheck size={16} />,
                });

                refetchItems();
            }

            setIsOpen(false);
        });
    };

    return (
        <Drawer
            opened={isOpen}
            onClose={() => setIsOpen(false)}
            position="right"
            title="Add new item"
            padding="xl"
            size="xl"
        >
            <Flex direction="column" mt="xl">
                <TextInput
                    placeholder="Enter name"
                    label="Item name"
                    withAsterisk
                    size="md"
                    mb="lg"
                    onChange={onChangeName}
                />
                <DatePicker
                    placeholder="Pick date"
                    label="Acquired date"
                    withAsterisk
                    size="md"
                    mb="lg"
                    onChange={onChangeDate}
                />
                <Textarea
                    placeholder="Enter detailed description"
                    label="Description"
                    size="md"
                    mb="lg"
                    onChange={onChangeDescription}
                />
                <Flex justify="space-between" mb="lg" align="center">
                    <Checkbox
                        label="Set as favourite"
                        size="md"
                        onChange={onChangeIsFavourite}
                    />
                    <Button size="md" onClick={async () => addItem()}>
                        Add
                    </Button>
                </Flex>
            </Flex>
        </Drawer>
    );
};
