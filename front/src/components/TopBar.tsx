import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { login, logout } from '../store/slices/authSlice';

const TopBar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            <button onClick={() => dispatch(logout())}>התנתקות</button>
          </>
        ) : (
          <button onClick={() => dispatch(login())}>התחברות</button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
