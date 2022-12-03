import React from 'react';
import { IconHeart } from '@tabler/icons';
import { ActionIcon } from '@mantine/core';

interface FavouriteButtonProps {
    isFavourite: boolean;
    onClick: () => void;
}

export const FavouriteButton: React.FC<FavouriteButtonProps> = ({
    isFavourite,
    onClick,
}) => {
    return (
        <ActionIcon
            color="red"
            size="xl"
            variant="subtle"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                onClick();
            }}
        >
            <IconHeart
                fill={isFavourite ? 'red' : 'transparent'}
                color={isFavourite ? 'red' : 'red'}
            />
        </ActionIcon>
    );
};
