import React, { useState } from 'react';
import {
    Modal,
    Title,
    Flex,
    Button,
    Loader,
    ActionIcon,
    Paper,
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { showNotification } from '@mantine/notifications';
import {
    IconCheck,
    IconChevronLeft,
    IconDeviceFloppy,
    IconEdit,
    IconTrash,
    IconX,
} from '@tabler/icons';
import { FavouriteButton, ItemInfo, ItemTagsList } from '../components';
import { getItemDetails, deleteItem, toggleItemIsFavourite } from '../services';

export const ItemDetails: React.FC = () => {
    const [deleteModalVisible, showDeleteModal] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const {
        data: itemDetails,
        isLoading: itemDetailsLoading,
        refetch: refetchItemDetails,
    } = useQuery(`item-details-${id}`, () => getItemDetails(id as string));

    const deleteItemHandler = async (): Promise<void> => {
        deleteItem(id as string).then((response) => {
            if (response.ok) {
                showNotification({
                    title: 'Success!',
                    message: 'Item deleted from collection',
                    color: 'teal',
                    icon: <IconCheck size={16} />,
                });

                navigate('/');
            }

            showDeleteModal(false);
        });
    };

    const toggleIsFavourite = () => {
        toggleItemIsFavourite(id as string).then((response) => {
            if (response.ok) {
                refetchItemDetails();
            }
        });
    };

    return (
        <Flex mx="10%" h="90%" p="lg" direction="column">
            <Flex dir="row" justify="start">
                <ActionIcon
                    color="blue"
                    size="xl"
                    variant="transparent"
                    onClick={() => navigate(-1)}
                >
                    <IconChevronLeft />
                </ActionIcon>

                <Title color="blue">Item Details</Title>
                {!itemDetailsLoading && itemDetails && (
                    <Flex justify="end" align="center" sx={{ flex: 1 }}>
                        <ActionIcon
                            color="dark"
                            size="xl"
                            variant="subtle"
                            onClick={() => showDeleteModal(true)}
                        >
                            <IconTrash />
                        </ActionIcon>
                        <FavouriteButton
                            isFavourite={itemDetails.isFavourite}
                            onClick={() => toggleIsFavourite()}
                        />
                        <Paper withBorder={editing} radius="md">
                            <Flex>
                                <ActionIcon
                                    color="blue"
                                    size="xl"
                                    variant={
                                        !editing ? 'subtle' : 'transparent'
                                    }
                                    disabled={editing}
                                    onClick={() => setEditing(true)}
                                >
                                    <IconEdit />
                                </ActionIcon>
                                {editing && (
                                    <>
                                        <ActionIcon
                                            size="xl"
                                            color="red.9"
                                            onClick={() => setEditing(false)}
                                        >
                                            <IconX />
                                        </ActionIcon>
                                        <ActionIcon size="xl" color="blue">
                                            <IconDeviceFloppy />
                                        </ActionIcon>
                                    </>
                                )}
                            </Flex>
                        </Paper>
                    </Flex>
                )}
            </Flex>

            <Flex h="90%" mt="xl" justify="space-between" w="100%" gap="xs">
                {itemDetailsLoading && (
                    <Loader size="xl" m="auto" display="block" />
                )}

                {!itemDetailsLoading && itemDetails && (
                    <>
                        <ItemInfo itemDetails={itemDetails} editing={editing} />
                        <ItemTagsList
                            category={itemDetails.category}
                            tagValues={itemDetails.tagValues}
                            editing={editing}
                        />
                    </>
                )}
            </Flex>

            <Modal
                title="Are you sure you want to delete this item?"
                centered
                opened={deleteModalVisible}
                onClose={() => showDeleteModal(false)}
            >
                <Button
                    mx="auto"
                    size="lg"
                    display="block"
                    color="red"
                    onClick={() => deleteItemHandler()}
                    disabled={itemDetailsLoading}
                >
                    Delete
                </Button>
            </Modal>
        </Flex>
    );
};
