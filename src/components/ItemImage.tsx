import React, { useState, useEffect } from 'react';
import { Box, Card, Flex, Loader, Modal, Text } from '@mantine/core';
import { IconPhotoX } from '@tabler/icons';

interface ItemImageProps {
    imageUrl: string;
}

export const ItemImage: React.FC<ItemImageProps> = ({ imageUrl }) => {
    const [imageError, setImageError] = useState<boolean>(false);
    const [imageLoading, setImageLoading] = useState<boolean>(true);
    const [fullSizeImage, showFullSizeImage] = useState<boolean>(false);

    // reload image after error
    useEffect(() => {
        if (imageError && imageUrl) {
            setImageError(false);
        }
    }, [imageError, imageUrl]);

    return (
        <Box>
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
                        src={imageUrl}
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
                    src={imageUrl}
                    alt=""
                    style={{
                        maxHeight: '80vh',
                        maxWidth: '80vw',
                        borderRadius: '10px',
                    }}
                />
            </Modal>
        </Box>
    );
};
