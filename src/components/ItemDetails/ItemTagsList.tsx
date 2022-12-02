import React from 'react';
import {
    Flex,
    Text,
    Card,
    Title,
    Box,
    ScrollArea,
    Paper,
    Tooltip,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons';
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
                    {category.tags.map((tag) => {
                        const tagValue = tagValues.find(
                            (tv) => tv.name === tag,
                        );

                        return (
                            <Flex direction="column" mb="xs" key={tag}>
                                <Paper shadow="xs" radius="md" p="sm">
                                    <Flex
                                        justify="space-between"
                                        bg="gray.0"
                                        align="center"
                                        pr="xs"
                                    >
                                        <Text fw={500} fz="lg">
                                            {tag}
                                        </Text>
                                        {!tagValue && (
                                            <Tooltip
                                                label="This tag has no value yet"
                                                withArrow
                                                p="xs"
                                            >
                                                <Flex align="center">
                                                    <IconAlertTriangle color="red" />
                                                </Flex>
                                            </Tooltip>
                                        )}
                                    </Flex>

                                    {tagValue ? (
                                        <Text fz="lg">{tagValue.value}</Text>
                                    ) : (
                                        <Text
                                            fz="lg"
                                            color="dimmed"
                                            fs="italic"
                                        >
                                            No value yet
                                        </Text>
                                    )}
                                </Paper>
                            </Flex>
                        );
                    })}
                </Flex>
            </ScrollArea>
        </Card>
    );
};