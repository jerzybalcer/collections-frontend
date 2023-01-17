import React, { useContext, useState } from 'react';
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
import { AxiosResponse } from 'axios';
import { FavouriteButton, ItemInfo, ItemTagsList } from '../components';
import {
    getItemDetails,
    deleteItem,
    toggleItemIsFavourite,
    editItem,
} from '../services';
import { EditItemContext } from '../context';
import { FullItem } from '../model';

export const ItemDetails: React.FC = () => {
    const [deleteModalVisible, showDeleteModal] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const { reset, name, description, acquiredDate, imageBase64, tagValues } =
        useContext(EditItemContext);

    const fetchItemDetails = async (): Promise<FullItem> => {
        return getItemDetails(id as string).then(
            (res: AxiosResponse) => res.data,
        );
    };

    const {
        data: itemDetails,
        isLoading: itemDetailsLoading,
        refetch: refetchItemDetails,
    } = useQuery(`item-details-${id}`, fetchItemDetails);

    const deleteItemHandler = async (): Promise<void> => {
        deleteItem(id as string).then(() => {
            showNotification({
                title: 'Success!',
                message: 'Item deleted from collection',
                color: 'teal',
                icon: <IconCheck size={16} />,
            });

            navigate('/');

            showDeleteModal(false);
        });
    };

    const toggleIsFavourite = () => {
        toggleItemIsFavourite(id as string).then(() => {
            refetchItemDetails();
        });
    };

    const saveEditedItem = () => {
        editItem(id as string, {
            name: name ?? null,
            description: description ?? null,
            acquiredDate: acquiredDate ?? null,
            imageBase64: imageBase64 ?? null,
            tags: tagValues,
        }).then(() => {
            showNotification({
                title: 'Success!',
                message: 'Item edited successfully',
                color: 'teal',
                icon: <IconCheck size={16} />,
            });
            setEditing(false);
            reset();
            refetchItemDetails();
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
                                            onClick={() => {
                                                setEditing(false);
                                                reset();
                                            }}
                                        >
                                            <IconX />
                                        </ActionIcon>
                                        <ActionIcon
                                            size="xl"
                                            color="blue"
                                            onClick={() => saveEditedItem()}
                                        >
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
