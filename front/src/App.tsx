import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import BookDetails from './pages/BookDetails';
import MyBooksPage from './pages/MyBooksPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/my-books" element={<MyBooksPage />} />
    </Routes>
  );
};

export default App;
