import React from 'react';
import PersonalDetails from '../components/PersonalDetails';
import MyBooks from '../components/MyBooks';

const MyBooksPage: React.FC = () => {
  return (
    <div>
      <div style={{ padding: '20px' }}>
        <PersonalDetails />
        <MyBooks />
      </div>
    </div>
  );
};

export default MyBooksPage;
