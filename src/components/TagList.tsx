import { Flex, Text } from '@mantine/core';
import React from 'react';
import { Tag } from '../model';
import { TagBadge } from './TagBadge';

interface TagListProps {
    tags: Tag[];
}

export const TagList: React.FC<TagListProps> = ({ tags }) => {
    return (
        <>
            <Text fw="500">Tags</Text>
            <Flex wrap="wrap" mb="xl" mt="xs">
                {tags.map((tag) => (
                    <TagBadge tag={tag} onRemove={() => {}} />
                ))}
            </Flex>
        </>
    );
};
