import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
    Title,
    Modal,
    Box,
    Text,
    Card,
    Flex,
    ActionIcon,
    ScrollArea,
    Image,
    Paper,
    Loader,
} from '@mantine/core';
import { IconEdit, IconPhotoX, IconTrash } from '@tabler/icons';
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
    const [imageError, setImageError] = useState<boolean>(false);
    const [imageLoading, setImageLoading] = useState<boolean>(true);

    return (
        <Flex direction="column" w="50%" mih="50%">
            <Modal
                centered
                radius="md"
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
                        borderRadius: '10px',
                    }}
                />
            </Modal>

            <Card shadow="sm" p="lg" radius="md" withBorder h="100%">
                <Card.Section>
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
                </Card.Section>
                {!imageError && (
                    <Flex
                        mb="sm"
                        justify="center"
                        align="center"
                        style={{
                            objectFit: 'cover',
                            width: '400px',
                            height: '400px',
                        }}
                        onClick={() => showFullSizeImage(!imageLoading)}
                    >
                        <img
                            src={itemDetails.imageUrl}
                            alt=""
                            width={400}
                            height={400}
                            style={{
                                borderRadius: '10px',
                                objectFit: 'cover',
                                cursor: 'zoom-in',
                                display: imageLoading ? 'none' : 'block',
                            }}
                            onError={() => setImageError(true)}
                            onLoad={() => setImageLoading(false)}
                        />
                        {imageLoading && <Loader size="md" />}
                    </Flex>
                )}
                {imageError && (
                    <Card withBorder w={400} h={400} mb="sm" radius="md">
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            style={{
                                color: 'gray',
                            }}
                            h="100%"
                            w="100%"
                        >
                            <IconPhotoX size={100} style={{ strokeWidth: 1 }} />
                            <Text>Image not available</Text>
                        </Flex>
                    </Card>
                )}
                <ScrollArea h="60%">
                    <Flex h="40%" direction="column">
                        <Title order={2} mb="xs">
                            {itemDetails.name}
                        </Title>
                        <Text color="dimmed" mb="lg">
                            {itemDetails.description}
                        </Text>

                        <Flex
                            wrap="wrap"
                            justify="start"
                            sx={{ flexGrow: 1 }}
                            align="end"
                            gap="lg"
                        >
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
                    </Flex>
                </ScrollArea>
            </Card>
        </Flex>
    );
};
