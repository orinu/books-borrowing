import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { fetchUserProfile } from './store/slices/authSlice';
import { RootState } from './store/store';
import MainPage from './pages/MainPage';
import BookDetails from './pages/BookDetails';
import MyBooksPage from './pages/MyBooksPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import RegisterPage from "./pages/RegisterPage";


const App: React.FC = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector((state: RootState) => state.auth.isAuthenticated !== null);

  // Fetch user profile on app load
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Show a loading screen until the user authentication state is resolved
  if (!isInitialized) {
    return <div>Loading...</div>;
  }

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

      {/* Login Page */}
      <Route
        path="/login"
        element={
          <Layout showTopBar={false}>
            <LoginPage />
          </Layout>
        }
      />

      {/* Login Page */}
      <Route
        path="/register"
        element={
          <Layout showTopBar={false}>
            <RegisterPage />
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
