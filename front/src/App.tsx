import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import BookDetails from './pages/BookDetails';
import MyBooksPage from './pages/MyBooksPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Main Page */}
      <Route
        path="/"
        element={
          <Layout>
            <MainPage />
          </Layout>
        }
      />

      {/* Book Details Page */}
      <Route
        path="/book/:id"
        element={
          <Layout>
            <BookDetails />
          </Layout>
        }
      />

      {/* My Books Page (Protected) */}
      <Route
        path="/my-books"
        element={
          <ProtectedRoute>
            <Layout>
              <MyBooksPage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
