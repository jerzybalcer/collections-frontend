import React, { useState, useContext } from 'react';
import { Stepper, Drawer, Flex, Title, CloseButton } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import { DefineItem } from './DefineItem';
import { ChooseCategory } from './ChooseCategory';
import { FillTags } from './FillTags';
import { AddItemContext } from '../../context';
import { addUserItem } from '../../services';

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
    const { reset, itemInfo, categoryId, newCategory, tagValues } =
        useContext(AddItemContext);

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
        addUserItem({
            name: itemInfo.name,
            description: itemInfo.description,
            acquiredDate: itemInfo.acquiredDate,
            isFavourite: itemInfo.isFavourite,
            imageBase64: itemInfo.imageBase64,
            tags: tagValues,
            category: {
                id: categoryId,
                name: newCategory.name,
                color: newCategory.color,
            },
        })
            .then(() => {
                showNotification({
                    title: 'Success!',
                    message: 'Item added to your collection',
                    color: 'teal',
                    icon: <IconCheck size={16} />,
                });
                closeAdder();
                refetchItems();
            })
            .catch(() => setIsCreating(false));
    };

    return (
        <Drawer
            opened={isOpen}
            onClose={closeAdder}
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
                body: { flexGrow: 1, marginBottom: '64px' },
            }}
        >
            <Flex justify="space-between" mb="lg" align="center">
                <Title order={2} color="blue">
                    Create Item
                </Title>
                <CloseButton
                    color="blue"
                    size="xl"
                    ml="auto"
                    onClick={() => setIsOpen(false)}
                />
            </Flex>
            <Stepper
                active={currentStep}
                onStepClick={setCurrentStep}
                breakpoint="xs"
                mt="xl"
                size="lg"
                h="100%"
                styles={{
                    root: {
                        display: 'flex',
                        flexDirection: 'column',
                    },
                    content: { flex: 1 },
                }}
            >
                <Stepper.Step
                    label="Category"
                    description="Choose Category"
                    allowStepSelect={false}
                >
                    <ChooseCategory nextStep={nextStep} />
                </Stepper.Step>
                <Stepper.Step
                    label="Item"
                    description="Define item"
                    allowStepSelect={false}
                >
                    <DefineItem nextStep={nextStep} prevStep={prevStep} />
                </Stepper.Step>
                <Stepper.Step
                    label="Tags"
                    description="Fill in tags values"
                    allowStepSelect={false}
                >
                    <FillTags
                        addItem={addItem}
                        prevStep={prevStep}
                        isCreating={isCreating}
                    />
                </Stepper.Step>
            </Stepper>
        </Drawer>
    );
};
