import React from 'react';
import dayjs from 'dayjs';
import {
    Title,
    Stack,
    Modal,
    Box,
    Text,
    Card,
    Flex,
    ActionIcon,
    Image,
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';
import { FullItem } from '../../model';
import { FavouriteButton } from '../FavouriteButton';

interface ItemInfoProps {
    itemDetails: FullItem;
    fullSizeImage: boolean;
    showFullSizeImage: (isOpen: boolean) => void;
    editItem: () => void;
    deleteItem: () => void;
    likeItem: () => void;
}

export const ItemInfo: React.FC<ItemInfoProps> = ({
    itemDetails,
    fullSizeImage,
    showFullSizeImage,
    editItem,
    deleteItem,
    likeItem,
}) => {
    return (
        <Flex direction="column" w="50%">
            <Modal
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

            <Card shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                    <Flex direction="column">
                        <Flex justify="end">
                            <ActionIcon
                                color="dark"
                                size="xl"
                                variant="subtle"
                                onClick={deleteItem}
                            >
                                <IconTrash />
                            </ActionIcon>
                            <FavouriteButton
                                isFavourite={itemDetails.isFavourite}
                                onClick={likeItem}
                            />
                            <ActionIcon
                                color="blue"
                                size="xl"
                                variant="subtle"
                                onClick={editItem}
                            >
                                <IconEdit />
                            </ActionIcon>
                        </Flex>
                        <Box
                            onClick={() => showFullSizeImage(true)}
                            style={{
                                cursor: 'zoom-in',
                            }}
                        >
                            <Image
                                withPlaceholder
                                src={itemDetails.imageUrl}
                                alt=""
                                width="100%"
                            />
                        </Box>
                    </Flex>
                </Card.Section>
                <Title order={2}>{itemDetails.name}</Title>
                <Text color="dimmed" mb="lg">
                    {itemDetails.description}
                </Text>

                <Flex wrap="wrap" justify="space-between">
                    <Flex direction="column" mr="xs">
                        <Title order={4}>Acquired</Title>
                        <Text>
                            {dayjs(itemDetails.acquiredDate).format(
                                'DD MMMM YYYY',
                            )}
                        </Text>
                    </Flex>

                    <Flex direction="column">
                        <Title order={4}>Added</Title>
                        <Text>
                            {dayjs(itemDetails.addedDate).format(
                                'DD MMMM YYYY',
                            )}
                        </Text>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    );
};
