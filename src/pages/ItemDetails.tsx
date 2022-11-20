import React, { useState } from 'react';
import {
    Modal,
    Title,
    Box,
    Stack,
    Flex,
    Button,
    Loader,
    Text,
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import { FullItem } from '../model';

export const ItemDetails: React.FC = () => {
    const [fullSizeImage, showFullSizeImage] = useState<boolean>(false);
    const [deleteModalVisible, showDeleteModal] = useState<boolean>(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const getItemDetails = async (): Promise<FullItem> =>
        fetch(`https://localhost:7185/api/item/${id}`).then((response) =>
            response.json(),
        );

    const { data: itemDetails, isLoading: itemDetailsLoading } = useQuery(
        `item-details-${id}`,
        getItemDetails,
    );

    const deleteItem = async (): Promise<void> => {
        fetch(`https://localhost:7185/api/item/${id}`, {
            method: 'DELETE',
        }).then((response) => {
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

    return (
        <Box mx="10%" h="100%">
            <Flex dir="row" justify="space-between" align="center">
                <Button
                    size="md"
                    variant="outline"
                    mr="lg"
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
                <Title color="blue.4">Item Details</Title>
                <Flex dir="row" ml="auto" m="1rem">
                    <Button
                        size="md"
                        display="block"
                        color="blue"
                        mr="2rem"
                        onClick={() => {}}
                        disabled={itemDetailsLoading}
                    >
                        Modify item
                    </Button>
                    <Button
                        size="md"
                        display="block"
                        color="red"
                        onClick={() => showDeleteModal(true)}
                        disabled={itemDetailsLoading}
                    >
                        Delete item
                    </Button>
                </Flex>
            </Flex>

            <Modal
                title="Are you sure you want to delete this item?"
                centered
                opened={deleteModalVisible}
                onClose={() => showDeleteModal(false)}
            >
                <Button
                    mx="auto"
                    size="md"
                    display="block"
                    color="red"
                    onClick={() => deleteItem()}
                    disabled={itemDetailsLoading}
                >
                    Delete
                </Button>
            </Modal>

            <Flex mih="50%" mt="xl">
                {itemDetailsLoading && (
                    <Loader size="xl" m="auto" display="block" />
                )}

                {!itemDetailsLoading && itemDetails && (
                    <Stack>
                        <Modal
                            title={itemDetails.name}
                            centered
                            opened={fullSizeImage}
                            onClose={() => showFullSizeImage(false)}
                            sx={{
                                '.mantine-Modal-modal': {
                                    width: 'auto',
                                    maxWidth: '90vw',
                                    maxHeight: '90vh',
                                    height: 'auto',
                                },
                            }}
                        >
                            <img
                                src={itemDetails.imageUrl}
                                alt=""
                                style={{
                                    maxHeight: '80vh',
                                    maxWidth: '80vw',
                                }}
                            />
                        </Modal>

                        <Title order={2}>{itemDetails.name}</Title>

                        <Box
                            onClick={() => showFullSizeImage(true)}
                            style={{
                                cursor: 'zoom-in',
                            }}
                        >
                            <img
                                src={itemDetails.imageUrl}
                                alt=""
                                width="400px"
                            />
                        </Box>

                        <Text>{itemDetails.description}</Text>
                        <Text>{`Acquired: ${dayjs(
                            itemDetails.acquiredDate,
                        ).format('DD MMMM YYYY')}`}</Text>
                        <Text>{`Added: ${dayjs(itemDetails.addedDate).format(
                            'DD MMMM YYYY',
                        )}`}</Text>

                        {itemDetails.isFavourite && <Text>Favourite item</Text>}
                    </Stack>
                )}
            </Flex>
        </Box>
    );
};
