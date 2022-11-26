import React, { useContext, useState, useEffect } from 'react';
import {
    Select,
    Flex,
    TextInput,
    ColorInput,
    MultiSelect,
    Loader,
    Title,
    Accordion,
} from '@mantine/core';
import { useQuery } from 'react-query';
import { IconSquarePlus, IconVocabulary } from '@tabler/icons';
import { AddItemContext } from '../../context';
import { SimpleCategory } from '../../model';

export const ChooseCategory: React.FC = () => {
    const { categoryId, setCategoryId, newCategory, setNewCategory } =
        useContext(AddItemContext);

    const fetchCategories = async (): Promise<SimpleCategory[]> =>
        fetch(`https://localhost:7185/api/categories`).then((response) =>
            response.json(),
        );

    const { data: categories, isLoading: categoriesLoading } = useQuery(
        `categories`,
        fetchCategories,
    );

    const fetchTags = async (): Promise<string[]> =>
        fetch(`https://localhost:7185/api/tags`).then((response) =>
            response.json(),
        );

    const [tags, setTags] = useState<string[]>([]);

    const { data: fetchedTags, isLoading: tagsLoading } = useQuery(
        `tags`,
        fetchTags,
    );

    // Save fetched tags to state (required by MultiSelect with creatable prop)
    useEffect(() => {
        if (!fetchedTags || tagsLoading) return;

        setTags(tags.concat(fetchedTags as string[]));
    }, [fetchedTags]);

    // Restore tags from context & fetched data
    useEffect(() => {
        if (!newCategory || !newCategory.tags) return;

        if (fetchedTags) setTags(newCategory.tags.concat(fetchedTags));
        else setTags(newCategory.tags);
    }, []);

    return (
        <Flex
            direction="column"
            align={categoriesLoading ? 'center' : 'stretch'}
        >
            {(categoriesLoading || tagsLoading) && (
                <Loader size="lg" mt="10rem" />
            )}
            {categories && !categoriesLoading && tags && !tagsLoading && (
                <Accordion
                    variant="filled"
                    radius="xs"
                    mt="xl"
                    defaultValue={categories.length === 0 ? 'create' : ''}
                >
                    <Accordion.Item value="choose">
                        <Accordion.Control
                            icon={<IconVocabulary />}
                            disabled={categories.length === 0}
                        >
                            <Title>Choose existing category</Title>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Select
                                label="Category"
                                placeholder="Pick one"
                                withAsterisk
                                data={categories.map((c) => {
                                    return { label: c.name, value: c.id };
                                })}
                                size="lg"
                                value={categoryId}
                                onChange={(value: string) =>
                                    setCategoryId(value)
                                }
                                nothingFound="No categories yet!"
                            />
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="create">
                        <Accordion.Control icon={<IconSquarePlus />}>
                            <Title>Create new category</Title>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Flex direction="column">
                                <TextInput
                                    placeholder="Enter name"
                                    label="Category name"
                                    withAsterisk
                                    size="lg"
                                    mb="lg"
                                    onChange={(event) =>
                                        setNewCategory({
                                            ...newCategory,
                                            name: event.currentTarget.value,
                                        })
                                    }
                                    value={newCategory.name}
                                />
                                <ColorInput
                                    placeholder="Pick color"
                                    label="Color"
                                    withAsterisk
                                    size="lg"
                                    mb="lg"
                                    onChange={(color) =>
                                        setNewCategory({
                                            ...newCategory,
                                            color,
                                        })
                                    }
                                    value={newCategory.color ?? undefined}
                                />
                                <MultiSelect
                                    data={tags}
                                    nothingFound="Type something to start adding"
                                    label="Tags"
                                    placeholder="Pick at least one"
                                    size="lg"
                                    mb="lg"
                                    searchable
                                    withAsterisk
                                    creatable
                                    getCreateLabel={(query) =>
                                        `+ Create ${query}`
                                    }
                                    onCreate={(query) => {
                                        setTags((current) => [
                                            ...current,
                                            query,
                                        ]);
                                        setNewCategory({
                                            ...newCategory,
                                            tags,
                                        });
                                        return query;
                                    }}
                                    onChange={(values) =>
                                        setNewCategory({
                                            ...newCategory,
                                            tags: values,
                                        })
                                    }
                                    value={newCategory.tags}
                                />
                            </Flex>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            )}
        </Flex>
    );
};
