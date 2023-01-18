import React, { useState } from 'react';
import {
    Button,
    CloseButton,
    ColorInput,
    Drawer,
    Flex,
    MultiSelect,
    TextInput,
    Title,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { NewCategory } from '../../model';
import { areRecordsEqual } from '../../helpers';
import { addCategory } from '../../services';

interface CategoryAdderProps {
    allTags: string[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    refetchCategories: () => void;
}

export const CategoryAdder: React.FC<CategoryAdderProps> = ({
    allTags,
    isOpen,
    setIsOpen,
    refetchCategories,
}) => {
    const [newCategory, setNewCategory] = useState<NewCategory>(
        {} as NewCategory,
    );
    const [tags, setTags] = useState<string[]>(allTags);
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const onChangeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value) setErrors({ ...errors, name: false });
        setNewCategory({ ...newCategory, name: e.currentTarget.value });
    };

    const onChangeColor = (color: string) => {
        if (color) setErrors({ ...errors, color: false });
        setNewCategory({ ...newCategory, color });
    };

    const onChangeTags = (values: string[]) => {
        if (values.length) setErrors({ ...errors, tags: false });
        setNewCategory({ ...newCategory, tags: values });
    };

    const onCreateTag = (query: string) => {
        if (query) setErrors({ ...errors, tags: false });

        setTags([...tags, query]);
        setNewCategory({
            ...newCategory,
            tags,
        });
        return query;
    };

    const isValid = (): boolean => {
        const newErrors = { ...errors };

        if (!newCategory.name) newErrors.name = true;
        if (!newCategory.color) newErrors.color = true;
        if (!newCategory.tags || newCategory.tags.length === 0)
            newErrors.tags = true;

        if (
            !areRecordsEqual(newErrors, errors) ||
            Object.values(newErrors).some((val) => val)
        ) {
            setErrors(newErrors);
            return false;
        }

        return true;
    };

    const createCategory = async (): Promise<void> => {
        setIsCreating(true);
        addCategory({
            name: newCategory.name,
            color: newCategory.color,
            tags: newCategory.tags,
        })
            .then(() => {
                setIsCreating(false);

                showNotification({
                    title: 'Success!',
                    message: 'Category added',
                    color: 'teal',
                    icon: <IconCheck size={16} />,
                });
                setIsOpen(false);
                refetchCategories();
            })
            .catch(() => setIsCreating(false));
    };

    const onCreate = () => {
        if (!isValid()) return;

        createCategory();
    };

    return (
        <Drawer
            opened={isOpen}
            onClose={() => setIsOpen(false)}
            position="right"
            padding="xl"
            size="xl"
            withCloseButton={false}
            styles={{
                drawer: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                },
                body: { flexGrow: 1 },
            }}
        >
            <Flex direction="column" h="100%">
                <Flex justify="space-between" mb="lg" align="center">
                    <Title order={2} color="blue">
                        Create Category
                    </Title>
                    <CloseButton
                        color="blue"
                        size="xl"
                        ml="auto"
                        onClick={() => setIsOpen(false)}
                    />
                </Flex>

                <Flex
                    direction="column"
                    h="100%"
                    sx={{ overflowY: 'auto', flexGrow: 1 }}
                >
                    <TextInput
                        placeholder="Enter name"
                        label="Category name"
                        withAsterisk
                        size="lg"
                        mb="lg"
                        onChange={onChangeCategoryName}
                        value={newCategory.name ?? ''}
                        error={errors.name ? 'Name is required' : ''}
                    />
                    <ColorInput
                        placeholder="Pick color"
                        label="Color"
                        withAsterisk
                        size="lg"
                        mb="lg"
                        onChange={onChangeColor}
                        value={newCategory.color ?? undefined}
                        error={errors.color ? 'Color is required' : ''}
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
                        getCreateLabel={(query) => `+ Create ${query}`}
                        onCreate={onCreateTag}
                        onChange={onChangeTags}
                        value={newCategory.tags}
                        error={
                            errors.tags ? 'At least one tag is required' : ''
                        }
                    />
                </Flex>
                <Button
                    onClick={onCreate}
                    size="lg"
                    ml="auto"
                    loading={isCreating}
                >
                    Create
                </Button>
            </Flex>
        </Drawer>
    );
};
