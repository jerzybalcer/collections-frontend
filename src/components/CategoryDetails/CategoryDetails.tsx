import {
    Box,
    Card,
    ColorInput,
    Flex,
    MultiSelect,
    ScrollArea,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import React, { useEffect, useState, Dispatch } from 'react';
import { EditedCategory, FullCategory } from '../../model';

interface CategoryDetailsProps {
    categoryDetails: FullCategory;
    allTags: string[];
    editing: boolean;
    editedCategory: EditedCategory;
    setEditedCategory: Dispatch<React.SetStateAction<EditedCategory>>;
}

export const CategoryDetails: React.FC<CategoryDetailsProps> = ({
    categoryDetails,
    allTags,
    editing,
    editedCategory,
    setEditedCategory,
}) => {
    const [tags, setTags] = useState<string[]>(allTags);
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCategory({
            ...editedCategory,
            name: e.currentTarget.value ?? null,
        });
    };

    const onChangeColor = (newColor: string) => {
        setEditedCategory({
            ...editedCategory,
            color: newColor ?? null,
        });
    };

    const onChangeTags = (values: string[]) => {
        setEditedCategory({
            ...editedCategory,
            tags: values,
        });
    };

    const onCreateTag = (query: string) => {
        setTags([...tags, query]);
        setEditedCategory({
            ...editedCategory,
            tags: [...editedCategory.tags, query],
        });
        return query;
    };

    useEffect(() => {
        setEditedCategory({
            ...editedCategory,
            tags: categoryDetails.tags,
        });
        setErrors({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryDetails.tags]);

    return (
        <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            w="100%"
            mih="50%"
            h="90%"
            mt="xl"
        >
            <ScrollArea h="100%" p="xs">
                <Flex direction="column" gap="md">
                    <Box>
                        <Title order={3}>Name</Title>
                        {!editing ? (
                            <Text size="xl">{categoryDetails.name}</Text>
                        ) : (
                            <TextInput
                                size="lg"
                                defaultValue={categoryDetails.name}
                                onChange={onChangeName}
                            />
                        )}
                    </Box>
                    <Box>
                        <Title order={3}>Color</Title>
                        {!editing ? (
                            <Flex align="center" gap={5}>
                                <Box
                                    bg={categoryDetails.color}
                                    w={25}
                                    h={25}
                                    sx={{ borderRadius: '50%' }}
                                />
                                <Text size="xl">{categoryDetails.color}</Text>
                            </Flex>
                        ) : (
                            <ColorInput
                                size="lg"
                                defaultValue={categoryDetails.color}
                                onChange={onChangeColor}
                            />
                        )}
                    </Box>
                    <Box>
                        <Title order={3}>Tags</Title>
                        {!editing &&
                            categoryDetails.tags.map((tag) => (
                                <Text key={tag} size="xl">
                                    {tag}
                                </Text>
                            ))}
                        {editing && (
                            <MultiSelect
                                data={tags}
                                nothingFound="Type something to start adding"
                                placeholder="Pick at least one"
                                size="lg"
                                mb="lg"
                                searchable
                                creatable
                                getCreateLabel={(query) => `+ Create ${query}`}
                                onCreate={onCreateTag}
                                onChange={onChangeTags}
                                value={editedCategory.tags}
                                error={
                                    errors.tags
                                        ? 'At least one tag is required'
                                        : ''
                                }
                            />
                        )}

                        {/* {tags.map((tag) => {
                            if (!editing)
                                return (
                                    <Text key={tag.key} size="xl">
                                        {tag.name}
                                    </Text>
                                );
                            return (
                                <Flex align="center" mb="xs" key={tag.key}>
                                    <TextInput
                                        name={tag.key}
                                        size="lg"
                                        defaultValue={tag.name}
                                        onChange={onChangeTag}
                                        error={
                                            errors[tag.key]
                                                ? 'Tags must be unique'
                                                : ''
                                        }
                                    />
                                    <ActionIcon
                                        name={tag.key}
                                        color="dark"
                                        size="lg"
                                        ml="xs"
                                        onClick={removeTag}
                                    >
                                        <IconTrash />
                                    </ActionIcon>
                                </Flex>
                            );
                        })}
                        {editing && (
                            <Flex align="center" mb="xs">
                                <TextInput
                                    size="lg"
                                    disabled
                                    placeholder="New tag"
                                />
                                <ActionIcon
                                    color="blue"
                                    size="lg"
                                    ml="xs"
                                    onClick={addNewTag}
                                >
                                    <IconPlus />
                                </ActionIcon>
                            </Flex>
                        )} */}
                    </Box>
                </Flex>
            </ScrollArea>
        </Card>
    );
};
