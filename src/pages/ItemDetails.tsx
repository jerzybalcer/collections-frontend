import React, { useState } from 'react';
import { Image, Modal, Title, Box, Stack, Flex, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const ItemDetails: React.FC = () => {
    const [fullSizeImage, showFullSizeImage] = useState<boolean>(false);

    const navigate = useNavigate();

    const itemImage = (): JSX.Element => {
        return (
            <Image
                radius="md"
                src="https://ireland.apollo.olxcdn.com/v1/files/wda8ln4nfua7-PL/image;s=1000x750"
                onClick={() => showFullSizeImage(true)}
            />
        );
    };

    return (
        <Box mx="10%" h="100%">
            <Flex dir="row" justify="space-between" align="center">
                <Button variant="outline" mr="lg" onClick={() => navigate(-1)}>
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
                    >
                        Modify item
                    </Button>
                    <Button
                        size="md"
                        display="block"
                        color="red"
                        onClick={() => {}}
                    >
                        Delete item
                    </Button>
                </Flex>
            </Flex>

            <Flex mih="50%">
                <Stack>
                    <Modal
                        centered
                        opened={fullSizeImage}
                        onClose={() => showFullSizeImage(false)}
                        size="100vh"
                    >
                        {itemImage()}
                    </Modal>
                    <Title order={2}>Item name</Title>
                    <Box
                        w="400px"
                        style={{
                            cursor: 'zoom-in',
                        }}
                    >
                        {itemImage()}
                    </Box>
                </Stack>
            </Flex>
        </Box>
    );
};
