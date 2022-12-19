import React, { useState } from 'react';
import { Title, Box, Flex, Loader, Button } from '@mantine/core';
import { useQuery } from 'react-query';
import { getCategories } from '../services';
import { CategoriesList } from '../components/CategoriesList';
import { CategoryAdder } from '../components/AddCategory';
import { getTags } from '../services/TagService';

export const CategoriesPage: React.FC = () => {
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);

    const {
        data: categories,
        isLoading: categoriesLoading,
        refetch: refetchCategories,
    } = useQuery(`categories`, getCategories);

    const { data: allTags, isLoading: allTagsLoading } = useQuery(
        `tags`,
        getTags,
    );

    return (
        <Box mx="10%" h="100%">
            <CategoryAdder
                allTags={allTags ?? []}
                isOpen={isAddDrawerOpen}
                setIsOpen={setIsAddDrawerOpen}
                refetchCategories={refetchCategories}
            />

            <Flex dir="row" justify="space-between" align="center">
                <Title color="blue">Categories</Title>
                <Button
                    loading={allTagsLoading}
                    size="lg"
                    ml="auto"
                    my="md"
                    display="block"
                    onClick={() => setIsAddDrawerOpen(true)}
                >
                    Add Category
                </Button>
            </Flex>

            <Flex mih="50%" h="100%">
                {categoriesLoading && (
                    <Loader size="xl" m="auto" display="block" />
                )}
                {!categoriesLoading && categories && (
                    <CategoriesList categories={categories} />
                )}
            </Flex>
        </Box>
    );
};
