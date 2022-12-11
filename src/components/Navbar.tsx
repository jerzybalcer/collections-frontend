import React, { useState } from 'react';
import {
    ActionIcon,
    Burger,
    Button,
    CloseButton,
    Drawer,
    Flex,
    Text,
    Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconMenu2, IconUserCircle } from '@tabler/icons';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

    const pagesButtons = (direction: 'row' | 'column'): JSX.Element => (
        <Flex direction={direction}>
            <Button
                variant="subtle"
                size="xl"
                onClick={() => navigate('/items')}
            >
                Items
            </Button>
            <Button
                variant="subtle"
                size="xl"
                onClick={() => navigate('/favourites')}
            >
                Favourites
            </Button>
            <Button
                variant="subtle"
                size="xl"
                onClick={() => navigate('/categories')}
            >
                Categories
            </Button>
        </Flex>
    );

    return (
        <Flex direction="column" sx={{ position: 'relative' }}>
            <Flex
                w="100%"
                mb="xl"
                sx={{
                    borderStyle: 'solid',
                    borderWidth: '0 0 1px 0',
                    boxShadow: '0 0 5px 0',
                    borderColor: 'lightgray',
                    zIndex: 201,
                }}
                bg="white"
                align="center"
                justify="space-between"
            >
                <Title
                    order={1}
                    color="blue"
                    p="0.5rem"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    Collections
                </Title>

                {windowWidth > 800 ? (
                    <>
                        {pagesButtons('row')}
                        <Flex align="center">
                            <Button variant="subtle" size="xl">
                                <IconUserCircle size={40} strokeWidth={1.5} />
                                <Text size="xl" ml="xs">
                                    Test User
                                </Text>
                            </Button>
                        </Flex>
                    </>
                ) : (
                    <ActionIcon
                        mr="xs"
                        variant="subtle"
                        color="blue"
                        size="xl"
                        onClick={() => setDrawerOpened(!drawerOpened)}
                    >
                        <IconMenu2 />
                    </ActionIcon>
                )}
            </Flex>
            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                withCloseButton={false}
                position="right"
                sx={{ '.mantine-Drawer-root': { position: 'fixed' } }}
            >
                <Flex direction="column">
                    <CloseButton
                        color="blue"
                        size="xl"
                        ml="auto"
                        onClick={() => setDrawerOpened(false)}
                    />
                    {pagesButtons('column')}
                </Flex>
            </Drawer>
        </Flex>
    );
};
