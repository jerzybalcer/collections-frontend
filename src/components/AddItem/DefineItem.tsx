import React, { useContext, useState } from 'react';
import {
    Flex,
    TextInput,
    Textarea,
    Checkbox,
    Title,
    ScrollArea,
    Group,
    Button,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconPencilPlus } from '@tabler/icons';
import { AddItemContext } from '../../context';
import { areRecordsEqual, fileToBase64 } from '../../helpers';
import { FileUpload } from '../FileUpload';

interface DefineItemProps {
    nextStep: () => void;
    prevStep: () => void;
}

export const DefineItem: React.FC<DefineItemProps> = ({
    nextStep,
    prevStep,
}) => {
    const { itemInfo, setItemInfo } = useContext(AddItemContext);

    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.currentTarget.value) setErrors({ ...errors, name: false });

        const changedItem = { ...itemInfo };
        changedItem.name = event.currentTarget.value;
        setItemInfo(changedItem);
    };

    const onChangeDate = (date: Date | null): void => {
        if (date) setErrors({ ...errors, date: false });

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

    const onImageUpload = async (uploadedFile: File) => {
        const imageBase64 = await fileToBase64(uploadedFile);

        const base64Content = imageBase64 ? imageBase64.split(',')[1] : null;

        setItemInfo({ ...itemInfo, imageBase64: base64Content });
    };

    const isValid = (): boolean => {
        const newErrors = { ...errors };

        if (!itemInfo.name) newErrors.name = true;
        if (!itemInfo.acquiredDate) newErrors.date = true;

        if (
            !areRecordsEqual(newErrors, errors) ||
            Object.values(newErrors).some((val) => val)
        ) {
            setErrors(newErrors);
            return false;
        }

        return true;
    };

    const onNext = () => {
        if (!isValid()) return;
        nextStep();
    };

    return (
        <Flex direction="column" mt="xl" h="100%">
            <Flex mb="xl" align="center" gap="xs">
                <IconPencilPlus />
                <Title>Define item</Title>
            </Flex>
            <ScrollArea sx={{ flexGrow: 1 }} px="sm">
                <TextInput
                    name="name"
                    placeholder="Enter name"
                    label="Item name"
                    withAsterisk
                    size="lg"
                    mb="lg"
                    value={itemInfo.name ?? ''}
                    onChange={onChangeName}
                    error={errors.name ? 'Name is required' : ''}
                />
                <DatePicker
                    name="date"
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
                    error={errors.date ? 'Date is required' : ''}
                />
                <Textarea
                    name="description"
                    placeholder="Enter detailed description"
                    label="Description"
                    size="lg"
                    mb="lg"
                    value={itemInfo.description ?? ''}
                    onChange={onChangeDescription}
                />

                <FileUpload
                    withTitle
                    onUpload={(file) => onImageUpload(file)}
                    onDelete={() =>
                        setItemInfo({ ...itemInfo, imageBase64: null })
                    }
                />

                <Checkbox
                    name="isFavourite"
                    label="Set as favourite"
                    size="lg"
                    mt="lg"
                    checked={itemInfo.isFavourite ?? false}
                    onChange={onChangeIsFavourite}
                />
            </ScrollArea>
            <Group position="right" my="xl">
                <Button variant="default" onClick={prevStep} size="lg">
                    Back
                </Button>
                <Button onClick={onNext} size="lg">
                    Next
                </Button>
            </Group>
        </Flex>
    );
};
