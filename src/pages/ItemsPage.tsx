import React, { useEffect, useState } from 'react';
import { UserItemsList } from '../components/';
import { SimpleItem } from '../model';

export const ItemsPage: React.FC = () => {
    const [items, setItems] = useState<SimpleItem[] | undefined>(undefined);

    useEffect(() => {
        fetch('https://localhost:7185/api/user/11C4317C-4389-4BE8-949C-8A9D637BEE93/items')
            .then((response) => {
                if(response.ok){
                    response.json().then((value: SimpleItem[]) => setItems(value))
                }
            });
    }, []);

    return (
        <div>
            {!items ? (<p>Loading...</p>) : (<UserItemsList items={items}></UserItemsList>)}
        </div>
    );
};