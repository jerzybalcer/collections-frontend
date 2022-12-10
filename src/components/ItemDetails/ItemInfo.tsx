import React, { useContext } from 'react';
import dayjs from 'dayjs';
import {
    Title,
    Text,
    Card,
    Flex,
    ScrollArea,
    TextInput,
    Textarea,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { FullItem } from '../../model';
import { ItemImage } from '../ItemImage';
import { FileUpload } from '../FileUpload';
import { EditItemContext } from '../../context';
import { fileToBase64 } from '../../helpers';

interface ItemInfoProps {
    itemDetails: FullItem;
    editing: boolean;
}

export const ItemInfo: React.FC<ItemInfoProps> = ({ itemDetails, editing }) => {
    const { setName, setDescription, setImageBase64, setAcquiredDate } =
        useContext(EditItemContext);

    const onNameEdit = (e: React.ChangeEvent<HTMLInputElement>) =>
        setName(e.currentTarget.value);

    const onDescriptionEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setDescription(e.currentTarget.value);

    const onAcquiredDateEdit = (value: Date | null) =>
        setAcquiredDate(value?.toISOString() ?? null);

    const onImageEdit = async (file: File) => {
        const imageBase64 = await fileToBase64(file);
        const base64Content = imageBase64 ? imageBase64.split(',')[1] : null;
        setImageBase64(base64Content);
    };

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder w="50%" mih="50%">
            <ScrollArea h="100%" px="sm">
                {!editing ? (
                    <ItemImage imageUrl={itemDetails.imageUrl} />
                ) : (
                    <Flex w={400} h={400} mb="sm">
                        <FileUpload
                            onUpload={onImageEdit}
                            onDelete={() => setImageBase64(null)}
                        />
                    </Flex>
                )}

                <Flex h="40%" direction="column">
                    {!editing && (
                        <>
                            <Title order={2} mb="xs">
                                {itemDetails.name}
                            </Title>
                            <Text color="dimmed" mb="lg">
                                {itemDetails.description}
                            </Text>
                        </>
                    )}

                    {editing && (
                        <>
                            <TextInput
                                mb="xs"
                                defaultValue={itemDetails.name}
                                size="lg"
                                onChange={onNameEdit}
                            />
                            <Textarea
                                mb="lg"
                                defaultValue={
                                    itemDetails.description ?? undefined
                                }
                                size="md"
                                minRows={10}
                                onChange={onDescriptionEdit}
                            />
                        </>
                    )}

                    <Flex
                        wrap="wrap"
                        justify="start"
                        sx={{ flexGrow: 1 }}
                        align="end"
                        gap="lg"
                    >
                        <Flex direction="column" mr="xs">
                            <Title order={4}>Acquired</Title>
                            {!editing ? (
                                <Text>
                                    {dayjs(itemDetails.acquiredDate).format(
                                        'DD MMMM YYYY',
                                    )}
                                </Text>
                            ) : (
                                <DatePicker
                                    defaultValue={
                                        new Date(itemDetails.acquiredDate)
                                    }
                                    onChange={onAcquiredDateEdit}
                                />
                            )}
                        </Flex>

                        <Flex direction="column">
                            <Title order={4}>Added</Title>

                            <Text>
                                {dayjs(itemDetails.addedDate).format(
                                    'DD MMMM YYYY',
                                )}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </ScrollArea>
        </Card>
    );
};
