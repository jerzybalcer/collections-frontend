import React, { useState } from 'react';
import {
    Modal,
    Title,
    Box,
    Flex,
    Button,
    Loader,
    Card,
    ActionIcon,
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconChevronLeft } from '@tabler/icons';
import { FullItem } from '../model';
import { ItemInfo, ItemTagsList } from '../components';

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
        <Card mx="10%" h="90%" shadow="md" p="lg" radius="md" withBorder>
            <Flex dir="row" justify="start" align="center">
                <ActionIcon
                    color="blue"
                    size="xl"
                    variant="transparent"
                    onClick={() => navigate(-1)}
                >
                    <IconChevronLeft />
                </ActionIcon>

                <Title color="blue">Item Details</Title>
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
                    onClick={() => deleteItem()}
                    disabled={itemDetailsLoading}
                >
                    Delete
                </Button>
            </Modal>

            <Flex h="75%" mt="xl" justify="center" w="100%">
                {itemDetailsLoading && (
                    <Loader size="xl" m="auto" display="block" />
                )}

                {!itemDetailsLoading && itemDetails && (
                    <>
                        <ItemInfo
                            itemDetails={itemDetails}
                            fullSizeImage={fullSizeImage}
                            showFullSizeImage={showFullSizeImage}
                            editItem={() => {}}
                            likeItem={() => {}}
                            deleteItem={() => showDeleteModal(true)}
                        />
                        <ItemTagsList
                            tags={itemDetails.category.tags}
                            tagValues={itemDetails.tagValues}
                        />
                    </>
                )}
            </Flex>
        </Card>
    );
};
