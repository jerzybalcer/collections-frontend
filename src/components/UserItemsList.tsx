import React from 'react';
import dayjs from 'dayjs';
import { Flex, Text, Card, ScrollArea } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { SimpleItem } from '../model';
import { CategoryBadge } from './CategoryBadge';
import { FavouriteButton } from './FavouriteButton';

interface UserItemsListProps {
    items: SimpleItem[];
    refetchItems: () => void;
}

export const UserItemsList: React.FC<UserItemsListProps> = ({
    items,
    refetchItems,
}) => {
    const navigate = useNavigate();

    const toggleIsFavourite = (itemId: string) => {
        fetch(`https://localhost:7185/api/item/${itemId}/favourite`, {
            method: 'PUT',
        }).then((response) => {
            if (response.ok) {
                refetchItems();
            }
        });
    };

    return (
        <ScrollArea h="75%" w="100%">
            <Flex direction="column" w="100%" h="100%" pt="lg">
                {items.map((item: SimpleItem) => (
                    <Card
                        shadow="sm"
                        p="lg"
                        mb="md"
                        mx="md"
                        radius="md"
                        withBorder
                        key={item.id}
                        style={{
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate(`/item/${item.id}`)}
                    >
                        <Flex justify="space-between" mb="md">
                            <CategoryBadge category={item.category} />
                            <FavouriteButton
                                isFavourite={item.isFavourite}
                                onClick={() => toggleIsFavourite(item.id)}
                            />
                        </Flex>

                        <Text weight={500} fz="xl" mb="xs">
                            {item.name}
                        </Text>

                        <Text size="md" color="dimmed">
                            {dayjs(item.addedDate).format('DD MMMM YYYY')}
                        </Text>

                        <Text size="md" color="dimmed">
                            {dayjs(item.acquiredDate).format('DD MMMM YYYY')}{' '}
                        </Text>
                    </Card>
                ))}
            </Flex>
        </ScrollArea>
    );
};
