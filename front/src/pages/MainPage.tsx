import React from 'react';
import Filters from '../components/Filters';
import BookTable from '../components/BookTable';
import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Filters />
      <BookTable />
    </div>
  );
};

export default MainPage;
