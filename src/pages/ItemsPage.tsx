import React, { useState } from 'react';
import { Loader, Title, Box, Flex, Button } from '@mantine/core';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { UserItemsList } from '../components';
import { getUserItems } from '../services';
import { ItemAdder } from '../components/AddItem';
import { SimpleItem } from '../model/Item';

export const ItemsPage: React.FC = () => {
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);

    const fetchItems = async (): Promise<SimpleItem[]> => {
        return getUserItems().then((res: AxiosResponse) => res.data);
    };

    const {
        data: items,
        isLoading: itemsLoading,
        refetch: refetchItems,
    } = useQuery('items', fetchItems);

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
