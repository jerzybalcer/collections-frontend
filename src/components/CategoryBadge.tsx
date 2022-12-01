import React from 'react';
import { Badge } from '@mantine/core';
import { SimplestCategory } from '../model';

interface CategoryBadgeProps {
    category: SimplestCategory;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
    return (
        <Badge size="xl" variant="filled" bg={category.color}>
            {category.name}
        </Badge>
    );
};
