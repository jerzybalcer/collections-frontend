import React, { useState } from 'react';
import { Loader, Title, Box, Flex, Button } from '@mantine/core';
import { useQuery } from 'react-query';
import { ItemAdder, UserItemsList } from '../components';
import { SimpleItem } from '../model';

export const ItemsPage: React.FC = () => {
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);

    const getUserItems = async (): Promise<SimpleItem[]> =>
        fetch(
            'https://localhost:7185/api/user/11C4317C-4389-4BE8-949C-8A9D637BEE93/items',
        ).then((response) => response.json());

    const {
        data: items,
        isLoading: itemsLoading,
        refetch: refetchItems,
    } = useQuery('items', getUserItems);

    return (
        <Box mx="10%" h="100%">
            <ItemAdder
                isOpen={isAddDrawerOpen}
                setIsOpen={setIsAddDrawerOpen}
                refetchItems={refetchItems}
            />

            <Flex dir="row" justify="space-between" align="center">
                <Title color="blue">Your items</Title>
                <Button
                    size="lg"
                    ml="auto"
                    my="md"
                    display="block"
                    onClick={() => setIsAddDrawerOpen(true)}
                >
                    Add Item
                </Button>
            </Flex>

            <Flex mih="50%" h="100%">
                {itemsLoading && <Loader size="xl" m="auto" display="block" />}
                {!itemsLoading && items && (
                    <UserItemsList items={items} refetchItems={refetchItems} />
                )}
            </Flex>
        </Box>
    );
};
