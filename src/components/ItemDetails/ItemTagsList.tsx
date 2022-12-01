import React from 'react';
import { Flex, Text, Card, Title } from '@mantine/core';
import { TagValue } from '../../model';

interface ItemTagsListProps {
    tags: string[];
    tagValues: TagValue[];
}

export const ItemTagsList: React.FC<ItemTagsListProps> = ({
    tags,
    tagValues,
}) => {
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder w="50%" ml="sm">
            <Flex direction="column" h="100%">
                <Title order={2} mb="lg">
                    Tags
                </Title>
                {tags.map((tag) => (
                    <Flex direction="column" mb="xs">
                        <Text fw={500} fz="lg">
                            {tag}
                        </Text>
                        <Text fz="lg">
                            {tagValues.find((tv) => tv.name === tag)?.value ??
                                '-'}
                        </Text>
                    </Flex>
                ))}
            </Flex>
        </Card>
    );
};
