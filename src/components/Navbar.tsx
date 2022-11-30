import React from 'react';
import { Flex, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Flex
            w="100%"
            mb="6rem"
            pb="xs"
            sx={{
                borderStyle: 'solid',
                borderWidth: '0 0 1px 0',
                boxShadow: '0 0 5px 0',
                borderColor: 'lightgray',
            }}
            bg="white"
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
        </Flex>
    );
};
