import React from 'react';
import dayjs from 'dayjs';
import { Flex, Text, Card, Badge, ScrollArea } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconHeart } from '@tabler/icons';
import { SimpleItem } from '../model';

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
                            <Badge
                                size="xl"
                                variant="filled"
                                bg={item.category.color}
                            >
                                {item.category.name}
                            </Badge>
                            <IconHeart
                                fill={item.isFavourite ? 'red' : 'transparent'}
                                strokeWidth="1.5"
                                size="2rem"
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
