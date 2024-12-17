import React from 'react';
import TopBar from './components/TopBar';
import Filters from './components/Filters';
import BookTable from './components/BookTable';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', direction: "rtl" }}>
      <TopBar />
      <Filters />
      <BookTable />
    </div>
  );
};

export default App;
