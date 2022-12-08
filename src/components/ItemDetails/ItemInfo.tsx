import React from 'react';
import dayjs from 'dayjs';
import {
    Title,
    Text,
    Card,
    Flex,
    ScrollArea,
    TextInput,
    Textarea,
    Box,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { FullItem } from '../../model';
import { ItemImage } from '../ItemImage';
import { FileUpload } from '../FileUpload';

interface ItemInfoProps {
    itemDetails: FullItem;
    editing: boolean;
}

export const ItemInfo: React.FC<ItemInfoProps> = ({ itemDetails, editing }) => {
    return (
        <Flex direction="column" w="50%" mih="50%">
            <Card shadow="sm" p="lg" radius="md" withBorder h="100%">
                {!editing ? (
                    <ItemImage imageUrl={itemDetails.imageUrl} />
                ) : (
                    <Flex w={400} h={400} mb="sm">
                        <FileUpload onUpload={() => {}} onDelete={() => {}} />
                    </Flex>
                )}

                <ScrollArea h="60%">
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
                                />
                                <Textarea
                                    mb="lg"
                                    defaultValue={
                                        itemDetails.description ?? undefined
                                    }
                                    size="md"
                                    minRows={10}
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
                                    />
                                )}
                            </Flex>

                            <Flex direction="column">
                                <Title order={4}>Added</Title>
                                {!editing ? (
                                    <Text>
                                        {dayjs(itemDetails.addedDate).format(
                                            'DD MMMM YYYY',
                                        )}
                                    </Text>
                                ) : (
                                    <DatePicker
                                        defaultValue={
                                            new Date(itemDetails.addedDate)
                                        }
                                    />
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                </ScrollArea>
            </Card>
        </Flex>
    );
};
