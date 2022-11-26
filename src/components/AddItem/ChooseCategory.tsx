import React, { useContext, useState } from 'react';
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

    const [tags, setTags] = useState<string[]>([
        'Duration',
        'Artist',
        'Material',
        'Production Date',
    ]);

    const fetchCategories = async (): Promise<SimpleCategory[]> =>
        fetch(`https://localhost:7185/api/categories`).then((response) =>
            response.json(),
        );

    const { data: categories, isLoading: categoriesLoading } = useQuery(
        `categories`,
        fetchCategories,
    );

    return (
        <Flex
            direction="column"
            align={categoriesLoading ? 'center' : 'stretch'}
        >
            {categoriesLoading && <Loader size="lg" mt="10rem" />}
            {categories && !categoriesLoading && (
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
                                        return query;
                                    }}
                                    onChange={(values) =>
                                        setNewCategory({
                                            ...newCategory,
                                            tags: values,
                                        })
                                    }
                                    value={newCategory.tags ?? []}
                                />
                            </Flex>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            )}
        </Flex>
    );
};
