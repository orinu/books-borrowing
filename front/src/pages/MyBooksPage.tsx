import React from 'react';
import PersonalDetails from '../components/PersonalDetails';
import MyBooks from '../components/MyBooks';

const MyBooksPage: React.FC = () => {
  return (
    <div>
      <PersonalDetails />
      <MyBooks />
    </div>
  );
};

export default MyBooksPage;
