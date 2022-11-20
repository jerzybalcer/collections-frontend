import React from 'react';
import { Flex, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Flex w="100%" h="6%" bg="gray.4" mb="6rem">
            <Title
                size="3rem"
                color="blue.8"
                p="0.5rem"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/')}
            >
                Collections
            </Title>
        </Flex>
    );
};
