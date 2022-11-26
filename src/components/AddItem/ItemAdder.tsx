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
    const { reset, categoryMode, setCategoryId, setNewCategory } =
        useContext(AddItemContext);

    const [currentStep, setCurrentStep] = useState<number>(0);
    const nextStep = () =>
        setCurrentStep((current) => (current < 3 ? current + 1 : current));
    const prevStep = () =>
        setCurrentStep((current) => (current > 0 ? current - 1 : current));

    const addItem = async (): Promise<void> => {
        fetch(
            'https://localhost:7185/api/user/11C4317C-4389-4BE8-949C-8A9D637BEE93/item',
            {
                method: 'POST',
                body: JSON.stringify({}),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        ).then((response) => {
            if (response.ok) {
                showNotification({
                    title: 'Success!',
                    message: 'Item added to your collection',
                    color: 'teal',
                    icon: <IconCheck size={16} />,
                });
                refetchItems();
            }
            setIsOpen(false);
        });
    };

    const onNextButtonClick = () => {
        nextStep();

        if (categoryMode === 'choose') setNewCategory({} as NewCategory);
        if (categoryMode === 'create') setCategoryId(null);

        if (currentStep === 3) addItem();
    };

    return (
        <Drawer
            opened={isOpen}
            onClose={() => {
                setIsOpen(false);
                reset();
            }}
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
                    disabled={currentStep === 0}
                >
                    Back
                </Button>
                <Button
                    onClick={onNextButtonClick}
                    size="lg"
                    disabled={!categoryMode}
                >
                    {currentStep < 2 ? 'Next' : 'Create'}
                </Button>
            </Group>
        </Drawer>
    );
};
