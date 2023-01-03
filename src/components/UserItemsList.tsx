import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
    Flex,
    Text,
    Card,
    ScrollArea,
    TextInput,
    MultiSelect,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import {
    IconAdjustments,
    IconPencilPlus,
    IconSearch,
    IconUserPlus,
} from '@tabler/icons';
import { useQuery } from 'react-query';
import { SimpleItem } from '../model';
import { CategoryBadge } from './CategoryBadge';
import { FavouriteButton } from './FavouriteButton';
import { getTags, toggleItemIsFavourite } from '../services';

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
    const [filters, setFilters] = useState<string[]>([]);
    const [searchPhrase, setSearchPhrase] = useState<string>('');

    const { data: tags, isLoading: tagsLoading } = useQuery(`tags`, getTags);

    const onChangeSearchPhrase = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSearchPhrase(event.currentTarget.value);
    };

    const onChangeFilters = (newFilters: string[]) => {
        setFilters(newFilters);
    };

    const onChangeVisibleItems = () => {
        let filteredItems = items;

        if (filters.length > 0) {
            filteredItems = filteredItems.filter((i) =>
                filters.every((f) => i.tags.includes(f)),
            );
        }

        if (!searchPhrase) setVisibleItems(filteredItems);
        else {
            const matchingItems = filteredItems.filter(
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

    useEffect(() => {
        onChangeVisibleItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchPhrase, filters]);

    return (
        <ScrollArea h="75%" w="100%">
            <Flex direction="column" w="100%" h="100%" pt="lg">
                {items && tags && !tagsLoading && (
                    <Flex wrap="wrap">
                        <TextInput
                            name="search"
                            placeholder="Search"
                            size="lg"
                            mb="lg"
                            mr="sm"
                            w={300}
                            onChange={onChangeSearchPhrase}
                            icon={<IconSearch />}
                        />
                        <MultiSelect
                            data={tags}
                            nothingFound="No matching tags found"
                            placeholder="Filter by tags"
                            icon={<IconAdjustments />}
                            label=""
                            size="lg"
                            mb="lg"
                            mr="sm"
                            w={300}
                            searchable
                            onChange={onChangeFilters}
                        />
                    </Flex>
                )}

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

                        <Text weight={500} fz="xl" mb="sm">
                            {item.name}
                        </Text>

                        <Flex>
                            <IconPencilPlus color="gray" />
                            <Text size="md" color="dimmed" ml="xs">
                                {`${dayjs(item.addedDate).format(
                                    'DD MMMM YYYY',
                                )}`}
                            </Text>
                        </Flex>

                        <Flex>
                            <IconUserPlus color="gray" />
                            <Text size="md" color="dimmed" ml="xs">
                                {`${dayjs(item.acquiredDate).format(
                                    'DD MMMM YYYY',
                                )}`}
                            </Text>
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </ScrollArea>
    );
};
