import React from 'react';
import Filters from '../components/Filters';
import BookTable from '../components/BookTable';
import TopBar from '../components/TopBar';

const MainPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <TopBar />
      <Filters />
      <BookTable />
    </div>
  );
};

export default MainPage;
