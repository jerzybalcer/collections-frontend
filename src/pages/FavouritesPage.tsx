import React, { useContext, useState } from 'react';
import { Loader, Title, Box, Flex, Button } from '@mantine/core';
import { useQuery } from 'react-query';
import { ItemAdder, UserItemsList } from '../components';
import { getUserFavouriteItems } from '../services';
import { AddItemContext } from '../context';

export const FavouritesPage: React.FC = () => {
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
    const { setItemInfo, itemInfo } = useContext(AddItemContext);

    const {
        data: items,
        isLoading: itemsLoading,
        refetch: refetchFavouriteItems,
    } = useQuery('favourite-items', getUserFavouriteItems);

    return (
        <Box mx="10%" h="100%">
            <ItemAdder
                isOpen={isAddDrawerOpen}
                setIsOpen={setIsAddDrawerOpen}
                refetchItems={refetchFavouriteItems}
            />

            <Flex dir="row" justify="space-between" align="center">
                <Title color="blue">Favourite items</Title>
                <Button
                    size="lg"
                    ml="auto"
                    my="md"
                    display="block"
                    onClick={() => {
                        setIsAddDrawerOpen(true);
                        setItemInfo({ ...itemInfo, isFavourite: true });
                    }}
                >
                    Add Item
                </Button>
            </Flex>

            <Flex mih="50%" h="100%">
                {itemsLoading && <Loader size="xl" m="auto" display="block" />}
                {!itemsLoading && items && (
                    <UserItemsList
                        items={items}
                        refetchItems={refetchFavouriteItems}
                    />
                )}
            </Flex>
        </Box>
    );
};
