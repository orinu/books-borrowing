import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../store/slices/booksSlice';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store/store';

Modal.setAppElement('#root'); // Accessibility requirement for Modal

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [courseName, setCourseName] = useState('');
  const [degreeName, setDegreeName] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [isbn, setIsbn] = useState('');

  const userId = useSelector((state: RootState) => 'currentUserId'); // Replace with actual logic
  const dispatch = useDispatch();

  const handleAddBook = () => {
    if (title && courseName && degreeName && author && location && isbn) {
      dispatch(
        addBook({
          id: uuidv4(),
          title,
          courseName,
          degreeName,
          author,
          location,
          isbn,
          userId,
          status: 'available', // Default status
        })
      );
      setTitle('');
      setCourseName('');
      setDegreeName('');
      setAuthor('');
      setLocation('');
      setIsbn('');
      onClose();
    } else {
      alert('אנא מלא את כל השדות.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New Book"
      style={{
        content: {
          width: '400px',
          margin: 'auto',
          textAlign: 'right',
          direction: 'rtl',
        },
      }}
    >
      <h2>הוסף ספר חדש</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="שם הספר"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="שם קורס"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <input
          type="text"
          placeholder="שם תואר"
          value={degreeName}
          onChange={(e) => setDegreeName(e.target.value)}
        />
        <input
          type="text"
          placeholder="מחבר"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="מיקום"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="מספר ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <button onClick={handleAddBook}>הוסף ספר</button>
        <button onClick={onClose} style={{ backgroundColor: 'red', color: 'white' }}>
          בטל
        </button>
      </div>
    </Modal>
  );
};

export default AddBookModal;
