import React, { useState } from 'react';
import {
    Modal,
    Button,
    Flex,
    ActionIcon,
    Paper,
    Title,
    Box,
    Tooltip,
    Loader,
} from '@mantine/core';
import {
    IconDeviceFloppy,
    IconEdit,
    IconX,
    IconTrash,
    IconChevronLeft,
    IconCheck,
} from '@tabler/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { showNotification } from '@mantine/notifications';
import {
    deleteCategory,
    editCategory,
    getCategoryDetails,
    getTags,
} from '../services';
import { CategoryDetails } from '../components/CategoryDetails';
import { EditedCategory } from '../model';

export const CategoryDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [deleteModalVisible, showDeleteModal] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [editedCategory, setEditedCategory] = useState<EditedCategory>(
        {} as EditedCategory,
    );

    const {
        data: categoryDetails,
        isLoading: categoryDetailsLoading,
        refetch: refetchCategorDetails,
    } = useQuery(`category-details-${id}`, () =>
        getCategoryDetails(id as string),
    );

    const { data: allTags, isLoading: allTagsLoading } = useQuery(
        `tags`,
        getTags,
    );

    const deleteCategoryHandler = async (): Promise<void> => {
        deleteCategory(id as string).then((response) => {
            if (response.ok) {
                showNotification({
                    title: 'Success!',
                    message: 'Category deleted',
                    color: 'teal',
                    icon: <IconCheck size={16} />,
                });

                navigate('/categories');
            }

            showDeleteModal(false);
        });
    };

    const saveEditedCategory = (savedCategory: EditedCategory) => {
        editCategory(id as string, savedCategory).then((response) => {
            if (response.ok) {
                showNotification({
                    title: 'Success!',
                    message: 'Category edited successfully',
                    color: 'teal',
                    icon: <IconCheck size={16} />,
                });
                setEditing(false);
                refetchCategorDetails();
            }
        });
    };

    return (
        <Flex mx="10%" h="90%" p="lg" direction="column">
            <Flex dir="row" justify="start">
                <ActionIcon
                    color="blue"
                    size="xl"
                    variant="transparent"
                    onClick={() => navigate(-1)}
                >
                    <IconChevronLeft />
                </ActionIcon>

                <Title color="blue">Category Details</Title>
                {!categoryDetailsLoading && categoryDetails && (
                    <Flex justify="end" align="center" sx={{ flex: 1 }}>
                        <Tooltip
                            disabled={categoryDetails?.canBeDeleted}
                            withArrow
                            label="Category cannot be deleted if it's assigned to an item"
                        >
                            <Box>
                                <ActionIcon
                                    color="dark"
                                    size="xl"
                                    variant="subtle"
                                    onClick={() => showDeleteModal(true)}
                                    disabled={
                                        categoryDetailsLoading ||
                                        !categoryDetails?.canBeDeleted
                                    }
                                >
                                    <IconTrash />
                                </ActionIcon>
                            </Box>
                        </Tooltip>

                        <Paper withBorder={editing} radius="md">
                            <Flex>
                                <ActionIcon
                                    color="blue"
                                    size="xl"
                                    variant={
                                        !editing ? 'subtle' : 'transparent'
                                    }
                                    disabled={editing}
                                    onClick={() => setEditing(true)}
                                >
                                    <IconEdit />
                                </ActionIcon>
                                {editing && (
                                    <>
                                        <ActionIcon
                                            size="xl"
                                            color="red.9"
                                            onClick={() => {
                                                setEditing(false);
                                            }}
                                        >
                                            <IconX />
                                        </ActionIcon>
                                        <ActionIcon
                                            size="xl"
                                            color="blue"
                                            onClick={() =>
                                                saveEditedCategory(
                                                    editedCategory,
                                                )
                                            }
                                        >
                                            <IconDeviceFloppy />
                                        </ActionIcon>
                                    </>
                                )}
                            </Flex>
                        </Paper>
                    </Flex>
                )}
            </Flex>

            {categoryDetailsLoading && allTagsLoading && (
                <Loader size="xl" m="auto" display="block" />
            )}

            {!categoryDetailsLoading &&
                categoryDetails &&
                !allTagsLoading &&
                allTags && (
                    <CategoryDetails
                        categoryDetails={categoryDetails}
                        allTags={allTags}
                        editing={editing}
                        editedCategory={editedCategory}
                        setEditedCategory={setEditedCategory}
                    />
                )}

            <Modal
                title="Are you sure you want to delete this category?"
                centered
                opened={deleteModalVisible}
                onClose={() => showDeleteModal(false)}
            >
                <Button
                    mx="auto"
                    size="lg"
                    display="block"
                    color="red"
                    onClick={() => deleteCategoryHandler()}
                >
                    Delete
                </Button>
            </Modal>
        </Flex>
    );
};
