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
    Group,
    Button,
} from '@mantine/core';
import { useQuery } from 'react-query';
import { IconSquarePlus, IconVocabulary } from '@tabler/icons';
import { AddItemContext, CategoryMode, NewCategory } from '../../context';
import { areRecordsEqual, isUnique } from '../../helpers';
import { getCategories, getTags } from '../../services';

interface ChooseCategoryProps {
    nextStep: () => void;
}

export const ChooseCategory: React.FC<ChooseCategoryProps> = ({ nextStep }) => {
    const {
        categoryId,
        setCategoryId,
        newCategory,
        setNewCategory,
        categoryMode,
        setCategoryMode,
    } = useContext(AddItemContext);

    const { data: categories, isLoading: categoriesLoading } = useQuery(
        `categories`,
        getCategories,
    );

    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [tags, setTags] = useState<string[]>([]);

    const { data: fetchedTags, isLoading: tagsLoading } = useQuery(
        `tags`,
        getTags,
    );

    const currentMode = (): CategoryMode => {
        if (categoryMode) return categoryMode;

        if (categories && categories.length === 0) {
            setCategoryMode('create');
            return 'create';
        }

        return undefined;
    };

    const onChangeCategoryId = (value: string) => {
        if (value) setErrors({ ...errors, chosenId: false });
        setCategoryId(value);
    };

    const onChangeCategoryName = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.currentTarget.value) setErrors({ ...errors, name: false });
        setNewCategory({
            ...newCategory,
            name: event.currentTarget.value,
        });
    };

    const onChangeColor = (color: string) => {
        if (color) setErrors({ ...errors, color: false });
        setNewCategory({
            ...newCategory,
            color,
        });
    };

    const onChangeTags = (values: string[]) => {
        if (values.length) setErrors({ ...errors, tags: false });
        setNewCategory({
            ...newCategory,
            tags: values,
        });
    };

    const onCreateTag = (query: string) => {
        setTags([...tags, query]);
        setNewCategory({
            ...newCategory,
            tags,
        });
        return query;
    };

    const isValid = (): boolean => {
        const newErrors = { ...errors };

        if (categoryMode === 'choose' && !categoryId) {
            newErrors.chosenId = true;
        }

        if (categoryMode === 'create') {
            if (!newCategory.name) newErrors.name = true;
            if (!newCategory.color) newErrors.color = true;
            if (!newCategory.tags || newCategory.tags.length === 0)
                newErrors.tags = true;
        }

        if (
            !areRecordsEqual(newErrors, errors) ||
            Object.values(newErrors).some((val) => val)
        ) {
            setErrors(newErrors);
            return false;
        }

        return true;
    };

    const onNext = () => {
        if (!isValid()) return;

        if (categoryMode === 'choose') setNewCategory({} as NewCategory);
        if (categoryMode === 'create') setCategoryId(null);

        nextStep();
    };

    // Save fetched tags to state (required by MultiSelect with creatable prop)
    useEffect(() => {
        if (!fetchedTags || tagsLoading) return;

        setTags(tags.concat(fetchedTags as string[]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchedTags]);

    // Restore tags from context & fetched data
    useEffect(() => {
        if (!newCategory || !newCategory.tags) return;

        if (fetchedTags)
            setTags(newCategory.tags.concat(fetchedTags).filter(isUnique));
        else setTags(newCategory.tags);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Flex
            direction="column"
            align={categoriesLoading ? 'center' : 'stretch'}
            mt="xl"
            h="100%"
        >
            {(categoriesLoading || tagsLoading) && (
                <Loader size="lg" mt="10rem" />
            )}
            {categories && !categoriesLoading && tags && !tagsLoading && (
                <Accordion
                    variant="filled"
                    radius="xs"
                    defaultValue={currentMode()}
                    onChange={(value) =>
                        setCategoryMode((value as CategoryMode) ?? undefined)
                    }
                    sx={{ flexGrow: 1 }}
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
                                    return {
                                        label: c.name,
                                        value: c.id,
                                    };
                                })}
                                size="lg"
                                value={categoryId}
                                onChange={onChangeCategoryId}
                                nothingFound="No categories yet!"
                                error={
                                    errors.chosenId
                                        ? 'Category is required'
                                        : ''
                                }
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
                                    onChange={onChangeCategoryName}
                                    value={newCategory.name ?? ''}
                                    error={
                                        errors.name ? 'Name is required' : ''
                                    }
                                />
                                <ColorInput
                                    placeholder="Pick color"
                                    label="Color"
                                    withAsterisk
                                    size="lg"
                                    mb="lg"
                                    onChange={onChangeColor}
                                    value={newCategory.color ?? undefined}
                                    error={
                                        errors.color ? 'Color is required' : ''
                                    }
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
                                    onCreate={onCreateTag}
                                    onChange={onChangeTags}
                                    value={newCategory.tags}
                                    error={
                                        errors.tags
                                            ? 'At least one tag is required'
                                            : ''
                                    }
                                />
                            </Flex>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            )}
            <Group position="right" my="xl">
                <Button variant="default" onClick={() => {}} disabled size="lg">
                    Back
                </Button>
                <Button onClick={onNext} size="lg" disabled={!categoryMode}>
                    Next
                </Button>
            </Group>
        </Flex>
    );
};
