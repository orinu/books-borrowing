import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { login, logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import AddBookModal from './AddBookModal';

const TopBar: React.FC = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px', marginBottom: '20px' }}>
      {isAuthenticated ? (
        <>
          <button>הגדרות</button>
          <button onClick={() => navigate('/my-books')}>הספרים שלי</button>
          <button onClick={openModal}>ספר חדש</button>
          <button onClick={() => dispatch(logout())}>התנתקות</button>
        </>
      ) : (
        <button onClick={() => dispatch(login())}>התחברות</button>
      )}

      {/* Modal for adding a new book */}
      <AddBookModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default TopBar;
