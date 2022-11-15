import React from 'react';
import { ItemsPage } from './pages/ItemsPage';

const App: React.FC = () => {
  return (
    <div className="App">
      Collections
      <ItemsPage />
    </div>
  );
}

export default App;
