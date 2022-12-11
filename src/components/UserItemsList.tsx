import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Flex, Text, Card, ScrollArea, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconSearch } from '@tabler/icons';
import { SimpleItem } from '../model';
import { CategoryBadge } from './CategoryBadge';
import { FavouriteButton } from './FavouriteButton';
import { toggleItemIsFavourite } from '../services';

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
        toggleItemIsFavourite(itemId).then((response) => {
            if (response.ok) {
                refetchItems();
            }
        });
    };

    const [visibleItems, setVisibleItems] = useState<SimpleItem[]>(items);

    const onChangeSearchPhrase = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const searchPhrase = event.currentTarget.value;

        if (!searchPhrase) setVisibleItems(items);
        else {
            const matchingItems = items.filter(
                (item) =>
                    item.name
                        .toLowerCase()
                        .includes(searchPhrase.toLowerCase()) ||
                    item.category.name
                        .toLowerCase()
                        .includes(searchPhrase.toLowerCase()),
            );
            setVisibleItems(matchingItems);
        }
    };

    useEffect(() => setVisibleItems(items), [items]);

    return (
        <ScrollArea h="75%" w="100%">
            <Flex direction="column" w="100%" h="100%" pt="lg">
                <TextInput
                    name="search"
                    placeholder="Search"
                    size="lg"
                    mb="lg"
                    maw={300}
                    onChange={onChangeSearchPhrase}
                    icon={<IconSearch />}
                />
                {visibleItems.map((item: SimpleItem) => (
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
