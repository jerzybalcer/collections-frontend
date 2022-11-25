import React from 'react';
import { Box, Flex, Text } from '@mantine/core';
import { IconX } from '@tabler/icons';
import { Tag } from '../model';

interface TagBadgeProps {
    tag: Tag;
    onRemove: () => void;
}

export const TagBadge: React.FC<TagBadgeProps> = ({ tag, onRemove }) => {
    return (
        <Box
            sx={{
                borderLeftColor: tag.color,
                borderLeftStyle: 'solid',
                borderLeftWidth: '0.5rem',
                borderRadius: '0 1rem 1rem 0',
            }}
            pl="xs"
            bg="gray.3"
            w="100%"
            my="xs"
        >
            <Flex justify="space-between" align="center">
                <Box>
                    <Text fz="lg" fw="500">
                        {tag.name}
                    </Text>
                    <Text>{tag.value}</Text>
                </Box>
                <IconX
                    style={{
                        margin: '0 0.5rem 0 0.5rem',
                        cursor: 'hand',
                    }}
                    onClick={() => onRemove()}
                />
            </Flex>
        </Box>
    );
};
