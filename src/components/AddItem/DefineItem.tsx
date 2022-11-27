import React, { useContext } from 'react';
import {
    Flex,
    TextInput,
    Textarea,
    Checkbox,
    Title,
    ScrollArea,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconPencilPlus } from '@tabler/icons';
import { AddItemContext } from '../../context';

export const DefineItem: React.FC = () => {
    const { itemInfo, setItemInfo } = useContext(AddItemContext);

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const changedItem = { ...itemInfo };
        changedItem.name = event.currentTarget.value;
        setItemInfo(changedItem);
    };

    const onChangeDate = (date: Date | null): void => {
        const changedItem = { ...itemInfo };
        changedItem.acquiredDate = date?.toISOString() ?? '';
        setItemInfo(changedItem);
    };

    const onChangeDescription = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ): void => {
        const changedItem = { ...itemInfo };
        changedItem.description = event.currentTarget.value;
        setItemInfo(changedItem);
    };

    const onChangeIsFavourite = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const changedItem = { ...itemInfo };
        changedItem.isFavourite = event.currentTarget.checked;
        setItemInfo(changedItem);
    };

    return (
        <Flex direction="column" mt="xl" h="100%">
            <Flex mb="xl" align="center" gap="xs">
                <IconPencilPlus />
                <Title>Define item</Title>
            </Flex>
            <ScrollArea>
                <TextInput
                    placeholder="Enter name"
                    label="Item name"
                    withAsterisk
                    size="lg"
                    mb="lg"
                    value={itemInfo.name ?? ''}
                    onChange={onChangeName}
                />
                <DatePicker
                    placeholder="Pick date"
                    label="Acquired date"
                    withAsterisk
                    size="lg"
                    mb="lg"
                    value={
                        itemInfo.acquiredDate
                            ? new Date(itemInfo.acquiredDate)
                            : undefined
                    }
                    onChange={onChangeDate}
                />
                <Textarea
                    placeholder="Enter detailed description"
                    label="Description"
                    size="lg"
                    mb="lg"
                    value={itemInfo.description ?? ''}
                    onChange={onChangeDescription}
                />
                <Checkbox
                    label="Set as favourite"
                    size="lg"
                    checked={itemInfo.isFavourite ?? false}
                    onChange={onChangeIsFavourite}
                />
            </ScrollArea>
        </Flex>
    );
};
