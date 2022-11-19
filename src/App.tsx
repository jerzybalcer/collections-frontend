import React from 'react';
import { Box } from '@mantine/core';
import { ItemsPage } from './pages';
import { Navbar } from './components';

const App: React.FC = () => {
  return (
    <Box display="block" pos="fixed" w="100vw" h="100vh">
      <Navbar />
      <ItemsPage/>
    </Box>
    
  );
}

export default App;
