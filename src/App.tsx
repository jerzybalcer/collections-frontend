import React from 'react';
import { Box } from '@mantine/core';
import { Navigate, Route, Routes } from 'react-router-dom';
import { FavouritesPage, ItemsPage } from './pages';
import { Navbar } from './components';
import { ItemDetails } from './pages/ItemDetailsPage';

const App: React.FC = () => (
    <Box display="block" pos="fixed" w="100vw" h="100vh">
        <Navbar />
        <Routes>
            <Route path="/" element={<Navigate to="/items" />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="/item/:id" element={<ItemDetails />} />
        </Routes>
    </Box>
);

export default App;
