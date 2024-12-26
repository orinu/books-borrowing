import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { updateUser } from '../store/slices/userSlice';

const PersonalDetails: React.FC = () => {
  const user = useSelector((state: RootState) => state.user); // Fetch user data from Redux store
  const dispatch = useDispatch();
  const [editingField, setEditingField] = useState<null | string>(null); // Track which field is being edited
  const [formData, setFormData] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    dispatch(updateUser(formData));
    setEditingField(null); // Stop editing
  };

  return (
    <div style={{ padding: '20px', textAlign: 'right', alignItems: 'flex-start' }}>
      <h2>פרטי המשתמש</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
        <div>
          <strong>שם:</strong>{' '}
          {editingField === 'name' ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            <>
              {user.name || 'לא הוזן'}
              <button onClick={() => setEditingField('name')} style={{ marginLeft: '10px' }}>✏️</button>
            </>
          )}
        </div>

        <div>
          <strong>דוא"ל:</strong>{' '}
          {editingField === 'email' ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            <>
              {user.email || 'לא הוזן'}
              <button onClick={() => setEditingField('email')} style={{ marginLeft: '10px' }}>✏️</button>
            </>
          )}
        </div>

        <div>
          <strong>טלפון:</strong>{' '}
          {editingField === 'phone' ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            <>
              {user.phone || 'לא הוזן'}
              <button onClick={() => setEditingField('phone')} style={{ marginLeft: '10px' }}>✏️</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
