import React from 'react';
import dayjs from 'dayjs';
import { Title, Text, Card, Flex, ActionIcon, ScrollArea } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';
import { FullItem } from '../../model';
import { FavouriteButton } from '../FavouriteButton';
import { ItemImage } from '../ItemImage';

interface ItemInfoProps {
    itemDetails: FullItem;
    editItem: () => void;
    deleteItem: () => void;
    likeItem: () => void;
}

export const ItemInfo: React.FC<ItemInfoProps> = ({
    itemDetails,
    editItem,
    deleteItem,
    likeItem,
}) => {
    return (
        <Flex direction="column" w="50%" mih="50%">
            <Card shadow="sm" p="lg" radius="md" withBorder h="100%">
                <Card.Section>
                    <Flex justify="end">
                        <ActionIcon
                            color="dark"
                            size="xl"
                            variant="subtle"
                            onClick={deleteItem}
                        >
                            <IconTrash />
                        </ActionIcon>
                        <FavouriteButton
                            isFavourite={itemDetails.isFavourite}
                            onClick={likeItem}
                        />
                        <ActionIcon
                            color="blue"
                            size="xl"
                            variant="subtle"
                            onClick={editItem}
                        >
                            <IconEdit />
                        </ActionIcon>
                    </Flex>
                </Card.Section>
                <ItemImage imageUrl={itemDetails.imageUrl} />
                <ScrollArea h="60%">
                    <Flex h="40%" direction="column">
                        <Title order={2} mb="xs">
                            {itemDetails.name}
                        </Title>
                        <Text color="dimmed" mb="lg">
                            {itemDetails.description}
                        </Text>

                        <Flex
                            wrap="wrap"
                            justify="start"
                            sx={{ flexGrow: 1 }}
                            align="end"
                            gap="lg"
                        >
                            <Flex direction="column" mr="xs">
                                <Title order={4}>Acquired</Title>
                                <Text>
                                    {dayjs(itemDetails.acquiredDate).format(
                                        'DD MMMM YYYY',
                                    )}
                                </Text>
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
        </Flex>
    );
};
