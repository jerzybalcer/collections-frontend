import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import {
    Flex,
    TextInput,
    Loader,
    ScrollArea,
    Title,
    Group,
    Button,
} from '@mantine/core';
import { IconListDetails } from '@tabler/icons';
import { AddItemContext } from '../../context';

interface FillTagsProps {
    addItem: () => void;
    prevStep: () => void;
    isCreating: boolean;
}

export const FillTags: React.FC<FillTagsProps> = ({
    addItem,
    prevStep,
    isCreating,
}) => {
    const { categoryId, newCategory, tagValues, setTagValues } =
        useContext(AddItemContext);

    const fetchTagsForCategory = async (): Promise<string[]> =>
        fetch(`https://localhost:7185/api/category/${categoryId}/tags`).then(
            (response) => response.json(),
        );

    const { data: fetchedTags, isLoading: tagsLoading } = useQuery(
        `tags-for-category`,
        fetchTagsForCategory,
        { enabled: !!categoryId },
    );

    const tagsSource = (): string[] => newCategory.tags ?? fetchedTags;

    const onTagValueChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const newTagValues = [...tagValues];

        const index = newTagValues.findIndex(
            (tv) => tv.name === event.currentTarget.name,
        );

        if (index === -1)
            newTagValues.push({
                name: event.currentTarget.name,
                value: event.currentTarget.value,
            });
        else newTagValues[index].value = event.currentTarget.value;

        setTagValues(newTagValues);
    };

    const onNext = () => {
        addItem();
    };

    // Remove tags that don't belong to current category anymore
    useEffect(() => {
        setTagValues(tagValues.filter((tv) => tagsSource().includes(tv.name)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Flex
            direction="column"
            align={tagsLoading ? 'center' : 'stretch'}
            mt="xl"
            h="100%"
        >
            <Flex mb="xl" align="center" gap="xs">
                <IconListDetails />
                <Title>Fill in tags values</Title>
            </Flex>

            {tagsLoading && <Loader size="lg" mt="10rem" />}
            {!tagsLoading && (
                <ScrollArea sx={{ flexGrow: 1 }}>
                    <Flex direction="column">
                        {tagsSource().map((tag) => (
                            <TextInput
                                key={tag}
                                name={tag}
                                placeholder="Enter value"
                                label={tag}
                                withAsterisk
                                size="lg"
                                mb="lg"
                                onChange={onTagValueChange}
                                value={
                                    tagValues.find((tv) => tv.name === tag)
                                        ?.value ?? ''
                                }
                            />
                        ))}
                    </Flex>
                </ScrollArea>
            )}

            <Group position="right" my="xl">
                <Button
                    variant="default"
                    onClick={prevStep}
                    size="lg"
                    disabled={isCreating}
                >
                    Back
                </Button>
                <Button onClick={onNext} size="lg" loading={isCreating}>
                    Create
                </Button>
            </Group>
        </Flex>
    );
};
