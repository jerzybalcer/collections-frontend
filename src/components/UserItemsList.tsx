import React from 'react';
import dayjs from 'dayjs';
import { Flex, Text, Card, Badge, ScrollArea } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { SimpleItem } from '../model';
import { CategoryBadge } from './CategoryBadge';
import { FavouriteButton } from './FavouriteButton';

interface UserItemsListProps {
    items: SimpleItem[];
}

export const UserItemsList: React.FC<UserItemsListProps> = ({ items }) => {
    const navigate = useNavigate();

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
                                onClick={() => {}}
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
