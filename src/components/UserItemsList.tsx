import React from 'react';
import dayjs from 'dayjs';
import { Table } from '@mantine/core';
import { SimpleItem } from '../model';

interface UserItemsListProps {
    items: SimpleItem[];
}

export const UserItemsList: React.FC<UserItemsListProps> = ({ items }) => (
    <Table fontSize="lg" verticalSpacing="lg">
        <thead>
            <tr>
                <th>Name</th>
                <th>Added Date</th>
                <th>Acquired Date</th>
            </tr>
        </thead>
        <tbody>
            {items.map((item: SimpleItem) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{dayjs(item.addedDate).format('DD MMMM YYYY')}</td>
                    <td>{dayjs(item.acquiredDate).format('DD MMMM YYYY')}</td>
                </tr>
            ))}
        </tbody>
    </Table>
);
