import React, { useState, useContext } from 'react';
import { Drawer, Stepper, Button, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import { DefineItem } from './DefineItem';
import { ChooseCategory } from './ChooseCategory';
import { FillTags } from './FillTags';
import { AddItemContext, NewCategory } from '../../context';

interface ItemAdderProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    refetchItems: () => void;
}

export const ItemAdder: React.FC<ItemAdderProps> = ({
    isOpen,
    setIsOpen,
    refetchItems,
}) => {
    const {
        reset,
        categoryMode,
        setCategoryId,
        setNewCategory,
        itemInfo,
        categoryId,
        newCategory,
        tagValues,
    } = useContext(AddItemContext);

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);

    const nextStep = (): void =>
        setCurrentStep((current) => (current < 2 ? current + 1 : current));
    const prevStep = (): void =>
        setCurrentStep((current) => (current > 0 ? current - 1 : current));

    const closeAdder = (): void => {
        setIsOpen(false);
        setCurrentStep(0);
        reset();
    };

    const addItem = async (): Promise<void> => {
        setIsCreating(true);
        fetch(
            'https://localhost:7185/api/user/11C4317C-4389-4BE8-949C-8A9D637BEE93/item',
            {
                method: 'POST',
                body: JSON.stringify({
                    name: itemInfo.name,
                    description: itemInfo.description,
                    acquiredDate: itemInfo.acquiredDate,
                    isFavourite: itemInfo.isFavourite,
                    imageUrl: '',
                    tags: tagValues,
                    category: {
                        id: categoryId,
                        name: newCategory.name,
                        color: newCategory.color,
                    },
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        ).then((response) => {
            setIsCreating(false);
            if (response.ok) {
                showNotification({
                    title: 'Success!',
                    message: 'Item added to your collection',
                    color: 'teal',
                    icon: <IconCheck size={16} />,
                });
                closeAdder();
                refetchItems();
            }
        });
    };

    const onNextButtonClick = (): void => {
        nextStep();

        if (categoryMode === 'choose') setNewCategory({} as NewCategory);
        if (categoryMode === 'create') setCategoryId(null);

        if (currentStep === 2) addItem();
    };

    return (
        <Drawer
            opened={isOpen}
            onClose={closeAdder}
            position="right"
            padding="xl"
            size="50vw"
        >
            <Stepper
                active={currentStep}
                onStepClick={setCurrentStep}
                breakpoint="sm"
                mt="xl"
                size="lg"
                h="85%"
                sx={{
                    '.mantine-Stepper-content': {
                        height: '90%',
                    },
                }}
            >
                <Stepper.Step
                    label="Category"
                    description="Choose Category"
                    allowStepSelect={false}
                >
                    <ChooseCategory />
                </Stepper.Step>
                <Stepper.Step
                    label="Item"
                    description="Define item"
                    allowStepSelect={false}
                >
                    <DefineItem />
                </Stepper.Step>
                <Stepper.Step
                    label="Tags"
                    description="Fill in tags values"
                    allowStepSelect={false}
                >
                    <FillTags />
                </Stepper.Step>
            </Stepper>

            <Group position="right" mt="xl">
                <Button
                    variant="default"
                    onClick={prevStep}
                    size="lg"
                    disabled={currentStep === 0 || isCreating}
                >
                    Back
                </Button>
                <Button
                    onClick={onNextButtonClick}
                    size="lg"
                    disabled={!categoryMode}
                    loading={isCreating}
                >
                    {currentStep < 2 ? 'Next' : 'Create'}
                </Button>
            </Group>
        </Drawer>
    );
};
