import React, { useContext } from 'react';
import {
    Flex,
    Text,
    Card,
    Title,
    Box,
    ScrollArea,
    Paper,
    Tooltip,
    TextInput,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons';
import { FullItemCategory, TagValue } from '../../model';
import { CategoryBadge } from '../CategoryBadge';
import { EditItemContext } from '../../context';

interface ItemTagsListProps {
    category: FullItemCategory;
    tagValues: TagValue[];
    editing: boolean;
}

export const ItemTagsList: React.FC<ItemTagsListProps> = ({
    category,
    tagValues,
    editing,
}) => {
    const { setTagValues, tagValues: editedTagValues } =
        useContext(EditItemContext);

    const onEditTagValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tagName = e.currentTarget.name;
        const tagValue = e.currentTarget.value;

        const tagIndex = editedTagValues.findIndex((tv) => tv.name === tagName);

        if (tagIndex === -1) {
            setTagValues([
                ...editedTagValues,
                { name: tagName, value: tagValue },
            ]);
        } else {
            const newTagValues = [...editedTagValues];
            newTagValues[tagIndex].value = tagValue;
            setTagValues(newTagValues);
        }
    };

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder w="50%" mih="50%">
            <ScrollArea h="100%">
                <Flex direction="column" h="100%">
                    <Title order={2} mb="xs">
                        Category
                    </Title>
                    <Box mr="auto" mb="lg" ml="md">
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
                                <Paper shadow="xs" radius="md" p="sm" mx="md">
                                    <Flex
                                        justify="space-between"
                                        bg="gray.0"
                                        align="center"
                                        pr="xs"
                                    >
                                        <Text fw={500} fz="lg">
                                            {tag}
                                        </Text>
                                        {(!tagValue || !tagValue.value) && (
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

                                    {editing && (
                                        <TextInput
                                            name={tag}
                                            defaultValue={
                                                tagValue
                                                    ? tagValue.value
                                                    : undefined
                                            }
                                            size="md"
                                            onChange={onEditTagValue}
                                        />
                                    )}

                                    {!editing && tagValue && (
                                        <Text fz="lg">{tagValue.value}</Text>
                                    )}

                                    {!editing &&
                                        (!tagValue || !tagValue?.value) && (
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
