import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { handleLogout } from '../store/slices/authSlice';
import AddBookModal from './AddBookModal';

const TopBar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for the "ספר חדש" modal
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const logout = async () => {
    await dispatch(handleLogout());
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #ddd',
      }}
    >
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <img
          src="https://via.placeholder.com/40" // Replace with actual logo URL
          alt="Logo"
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>My Library</span>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {isAuthenticated ? (
          <>
            <button onClick={() => navigate('/my-books')}>הספרים שלי</button>
            <button onClick={openModal}>ספר חדש</button>
            <button onClick={logout}>התנתקות</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>התחברות</button>
        )}
      </div>

      {/* Add Book Modal */}
      {isAuthenticated && <AddBookModal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default TopBar;
