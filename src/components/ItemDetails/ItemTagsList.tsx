import React from 'react';
import { Flex, Text, Card, Title, Box, ScrollArea } from '@mantine/core';
import { FullItemCategory, TagValue } from '../../model';
import { CategoryBadge } from '../CategoryBadge';

interface ItemTagsListProps {
    category: FullItemCategory;
    tagValues: TagValue[];
}

export const ItemTagsList: React.FC<ItemTagsListProps> = ({
    category,
    tagValues,
}) => {
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder w="50%" mih="50%">
            <ScrollArea h="100%">
                <Flex direction="column" h="100%">
                    <Title order={2} mb="xs">
                        Category
                    </Title>
                    <Box mr="auto" mb="lg">
                        <CategoryBadge category={category} />
                    </Box>
                    <Title order={2} mb="xs">
                        Tags
                    </Title>
                    {category.tags.map((tag) => (
                        <Flex direction="column" mb="xs" key={tag}>
                            <Text fw={500} fz="lg">
                                {tag}
                            </Text>
                            <Text fz="lg">
                                {tagValues.find((tv) => tv.name === tag)
                                    ?.value ?? '-'}
                            </Text>
                        </Flex>
                    ))}
                </Flex>
            </ScrollArea>
        </Card>
    );
};
