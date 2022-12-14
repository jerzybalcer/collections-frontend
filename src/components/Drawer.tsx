import {
    Box,
    CloseButton,
    Flex,
    getDefaultZIndex,
    Overlay,
    Title,
} from '@mantine/core';
import React from 'react';

interface DrawerProps {
    children: JSX.Element;
    opened: boolean;
    onClose: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({
    children,
    opened,
    onClose,
}) => {
    return (
        <Box>
            {opened && (
                <>
                    <Overlay opacity={0.75} color="black" onClick={onClose} />
                    <Flex
                        h="100vh"
                        w="xl"
                        bg="white"
                        p="md"
                        right={0}
                        top={0}
                        pos="fixed"
                        justify="stretch"
                        direction="column"
                        sx={{ zIndex: getDefaultZIndex('modal') }}
                    >
                        <Flex align="center" mb="md">
                            <Title order={4} color="blue">
                                Add item
                            </Title>
                            <CloseButton
                                color="blue"
                                size="xl"
                                ml="auto"
                                onClick={onClose}
                            />
                        </Flex>

                        {children}
                    </Flex>
                </>
            )}
        </Box>
    );
};
