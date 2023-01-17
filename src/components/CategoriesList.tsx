import React, { useState, useEffect } from 'react';
import { Flex, Text, Card, ScrollArea, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconSearch } from '@tabler/icons';
import { SimpleCategory } from '../model';

interface CategoriesListProps {
    categories: SimpleCategory[];
}

export const CategoriesList: React.FC<CategoriesListProps> = ({
    categories,
}) => {
    const navigate = useNavigate();

    const [visibleCategories, setVisibleCategories] =
        useState<SimpleCategory[]>(categories);

    const onChangeSearchPhrase = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const searchPhrase = event.currentTarget.value;

        if (!searchPhrase) setVisibleCategories(categories);
        else {
            const matchingCategories = categories.filter((category) =>
                category.name
                    .toLowerCase()
                    .includes(searchPhrase.toLowerCase()),
            );
            setVisibleCategories(matchingCategories);
        }
    };

    useEffect(() => setVisibleCategories(categories), [categories]);

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
                {visibleCategories.map((category: SimpleCategory) => (
                    <Card
                        shadow="sm"
                        mb="md"
                        mx="md"
                        radius="md"
                        withBorder
                        key={category.id}
                        style={{
                            cursor: 'pointer',
                            borderLeftColor: category.color,
                            borderLeftWidth: 10,
                        }}
                        onClick={() => navigate(`/category/${category.id}`)}
                    >
                        {/* <CategoryBadge
                            category={{
                                name: category.name,
                                color: category.color,
                            }}
                        /> */}
                        <Text weight={500} fz="xl">
                            {category.name}
                        </Text>
                    </Card>
                ))}
            </Flex>
        </ScrollArea>
    );
};
