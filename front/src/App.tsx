import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import BookDetails from './pages/BookDetails';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/book/:id" element={<BookDetails />} />
    </Routes>
  );
};

export default App;
