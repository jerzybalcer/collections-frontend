import React from 'react';
import { Title, Box, Flex, Loader } from '@mantine/core';
import { useQuery } from 'react-query';
import { getCategories } from '../services';
import { CategoriesList } from '../components/CategoriesList';

export const CategoriesPage: React.FC = () => {
    const { data: categories, isLoading: categoriesLoading } = useQuery(
        `categories`,
        getCategories,
    );

    return (
        <Box mx="10%" h="100%">
            <Flex dir="row" justify="space-between" align="center" my="md">
                <Title color="blue">Categories</Title>
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
