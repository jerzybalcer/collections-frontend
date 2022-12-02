import React from 'react';
import { Badge } from '@mantine/core';
import { SimplestCategory } from '../model';

interface CategoryBadgeProps {
    category: SimplestCategory;
}

type TextColor = 'black' | 'white';

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
    const contrastingBrush = (): TextColor => {
        const hex = category.color.slice(1).match(/.{1,2}/g);
        const rgb = [
            parseInt(hex![0], 16),
            parseInt(hex![1], 16),
            parseInt(hex![2], 16),
        ];

        const brightness = Math.sqrt(
            rgb[0] ** 2 * 0.241 + rgb[1] ** 2 * 0.691 + rgb[2] ** 2 * 0.068,
        );

        return brightness > 160 ? 'black' : 'white';
    };

    return (
        <Badge
            size="xl"
            variant="filled"
            bg={category.color}
            sx={{ color: contrastingBrush() }}
        >
            {category.name}
        </Badge>
    );
};
