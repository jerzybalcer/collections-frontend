import React from 'react';
import { SimpleItem } from '../model/Item';

interface UserItemsListProps {
    items: SimpleItem[];
}

export const UserItemsList: React.FC<UserItemsListProps> = ({ items }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
            {items.map((item: SimpleItem) => (
                <tr key={item.id}>
                    <th>{item.id}</th>
                    <th>{item.name}</th>
                </tr>
            ))}
            </tbody>
        </table>
    );
};