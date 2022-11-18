import React, { useState } from 'react';
import { SimpleItem } from '../model/Item';
import { Table, Button, Flex, Box, Drawer, TextInput, Textarea, Checkbox } from '@mantine/core';
import dayjs from "dayjs";
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
    name: "",
    description: "",
    acquiredDate: "",
    isFavourite: false,
    tags: [],
}

interface UserItemsListProps {
    items: SimpleItem[];
}

export const UserItemsList: React.FC<UserItemsListProps> = ({ items }) => {

    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
    const [newItem, setNewItem] = useState<NewItem>(emptyNewItem);

    const addItem = async () => {
        fetch("https://localhost:7185/api/user/11C4317C-4389-4BE8-949C-8A9D637BEE93/item", 
            {
                method: "POST", 
                body: JSON.stringify(newItem),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
            })
            .then((response) => {
                if(response.ok){
                    showNotification({
                        title: 'Success!',
                        message: 'Item added to your collection',
                        color: 'teal',
                        icon: <IconCheck size={16}/>,
                    })
                }

                setIsAddDrawerOpen(false);
            });
    };

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const changedItem = {...newItem};
        changedItem.name = event.currentTarget.value;
        setNewItem(changedItem);
    };

    const onChangeDate = (date: Date | null) => {
        const changedItem = {...newItem};
        changedItem.acquiredDate = date?.toISOString() ?? '';
        setNewItem(changedItem);
    };

    const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const changedItem = {...newItem};
        changedItem.description = event.currentTarget.value;
        setNewItem(changedItem);
    };

    const onChangeIsFavourite = (event: React.ChangeEvent<HTMLInputElement>) => {
        const changedItem = {...newItem};
        changedItem.isFavourite = event.currentTarget.checked;
        setNewItem(changedItem);
    };

    return (
        <Box>
            <Drawer
                opened={isAddDrawerOpen}
                onClose={() => setIsAddDrawerOpen(false)}
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
                        size='md'
                        mb="lg"
                        onChange={onChangeName}
                    />
                    <DatePicker placeholder="Pick date" label="Acquired date" withAsterisk size='md' mb="lg" onChange={onChangeDate}/>
                    <Textarea
                        placeholder="Enter detailed description"
                        label="Description"
                        size='md'
                        mb="lg"
                        onChange={onChangeDescription}
                    />
                    <Flex justify="space-between" mb="lg" align="center">
                    <Checkbox
                        label="Set as favourite"
                        size="md"
                        onChange={onChangeIsFavourite}
                    />
                    <Button size="md" onClick={() => addItem()}>
                        Add
                    </Button>
                    </Flex>

                </Flex>
            </Drawer>
        <Button size="md" ml="auto" m="1rem" display="block" onClick={() => setIsAddDrawerOpen(true)}>
            Add Item
        </Button>
        <Table fontSize="lg" verticalSpacing="lg">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Added Date</th>
                        <th>Acquired Date</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item: SimpleItem) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{dayjs(item.addedDate).format("DD MMMM YYYY")}</td>
                            <td>{dayjs(item.acquiredDate).format("DD MMMM YYYY")}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Box>
    );
};