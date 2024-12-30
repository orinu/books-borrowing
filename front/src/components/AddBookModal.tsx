// src/components/AddBookModal.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../store/slices/booksSlice';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store/store';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import Modal from './Modal'; // Import the custom Modal component
import '../scss/components/AddBookModal.scss';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  title: string;
  courseName: string;
  degreeName: string;
  author: string;
  location: string;
  isbn: string;
};

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'isbn'>('manual');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    courseName: '',
    degreeName: '',
    author: '',
    location: '',
    isbn: '',
  });
  const [isbnInput, setIsbnInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateISBN = (isbn: string) => {
    const isbn10 = /^(?:\d[\ |-]?){9}[\d|X]$/i;
    const isbn13 = /^(?:\d[\ |-]?){13}$/;
    return isbn10.test(isbn) || isbn13.test(isbn);
  };

  const fetchBookData = async (isbn: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/api/book/${isbn}`);
      const data = response.data;

      // Extract the first book entry from the response
      const bookKey = Object.keys(data)[0];
      const bookData = data[bookKey].data;

      // Extract necessary fields from the response
      const title = bookData.title || '';
      const authors = bookData.authors?.map((author: any) => author.name).join(', ') || '';
      const location = bookData.publish_places?.[0]?.name || '';
      const isbn10 = bookData.identifiers?.isbn_10?.[0] || '';
      // Add more fields if needed

      setFormData((prev) => ({
        ...prev,
        title,
        author: authors,
        location,
        isbn: isbn10,
      }));
    } catch (err) {
      console.error('Error fetching book data:', err);
      setError('Failed to fetch book data. Please check the ISBN and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = () => {
    const { title, courseName, degreeName, author, location, isbn } = formData;
    if (title && courseName && degreeName && author && location && isbn) {
      if (!validateISBN(isbn)) {
        alert('Invalid ISBN format.');
        return;
      }
      if (!user) {
        alert('User not found.');
        return;
      }
      dispatch(
        addBook({
          id: uuidv4(),
          title,
          courseName,
          degreeName,
          author,
          location,
          isbn,
          userId: user.userId,
          userName: user.name,
          userPhone: user.phone,
          userEmail: user.email,
          status: 'available',
        })
      );
      setFormData({
        title: '',
        courseName: '',
        degreeName: '',
        author: '',
        location: '',
        isbn: '',
      });
      onClose();
      // Optional: Add a success notification here
    } else {
      alert('אנא מלא את כל השדות.');
    }
  };

  const handleFetch = () => {
    if (validateISBN(isbnInput)) {
      fetchBookData(isbnInput);
    } else {
      setError('Invalid ISBN format.');
    }
  };

  const handleTabSwitch = (tab: 'manual' | 'isbn') => {
    setActiveTab(tab);
    setError(null);
    // Removed formData reset to preserve data across tabs
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Add New Book Modal"
    >
      <div className="add-book-modal">
        <div className="modal-header">
          <button
            className={`tab-button ${activeTab === 'manual' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('manual')}
            aria-selected={activeTab === 'manual'}
            role="tab"
            aria-controls="manual-tab"
            id="manual-tab-button"
          >
            הוסף ספר
          </button>
          <button
            className={`tab-button ${activeTab === 'isbn' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('isbn')}
            aria-selected={activeTab === 'isbn'}
            role="tab"
            aria-controls="isbn-tab"
            id="isbn-tab-button"
          >
            הוסף ספר באמצעות ISBN
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'manual' && (
            <div className="form-group" role="tabpanel" aria-labelledby="manual-tab-button">
              <label htmlFor="title">שם הספר</label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="שם הספר"
                value={formData.title}
                onChange={handleChange}
              />

              <label htmlFor="courseName">שם קורס</label>
              <input
                id="courseName"
                type="text"
                name="courseName"
                placeholder="שם קורס"
                value={formData.courseName}
                onChange={handleChange}
              />

              <label htmlFor="degreeName">שם תואר</label>
              <input
                id="degreeName"
                type="text"
                name="degreeName"
                placeholder="שם תואר"
                value={formData.degreeName}
                onChange={handleChange}
              />

              <label htmlFor="author">מחבר</label>
              <input
                id="author"
                type="text"
                name="author"
                placeholder="מחבר"
                value={formData.author}
                onChange={handleChange}
              />

              <label htmlFor="location">מיקום</label>
              <input
                id="location"
                type="text"
                name="location"
                placeholder="מיקום"
                value={formData.location}
                onChange={handleChange}
              />

              <label htmlFor="isbn">מספר ISBN</label>
              <input
                id="isbn"
                type="text"
                name="isbn"
                placeholder="מספר ISBN"
                value={formData.isbn}
                onChange={handleChange}
              />
            </div>
          )}

          {activeTab === 'isbn' && (
            <div className="isbn-section" role="tabpanel" aria-labelledby="isbn-tab-button">
              <label htmlFor="isbn-search">הזן ISBN</label>
              <div className="isbn-input-group">
                <input
                  id="isbn-search"
                  type="text"
                  value={isbnInput}
                  onChange={(e) => setIsbnInput(e.target.value)}
                  placeholder="ISBN"
                />
                <button type="button" onClick={handleFetch} className="fetch-button">
                  חפש
                </button>
              </div>
              {loading && (
                <div className="loading-spinner">
                  <FaSpinner className="spinner" />
                  <span>טוען...</span>
                </div>
              )}
              {error && <div className="error-message">{error}</div>}
              {!loading && formData.title && (
                <div className="fetched-data">
                  <p>
                    <strong>שם הספר:</strong> {formData.title}
                  </p>
                  <p>
                    <strong>מחבר:</strong> {formData.author}
                  </p>
                  <p>
                    <strong>מיקום:</strong> {formData.location}
                  </p>
                  <p>
                    <strong>מספר ISBN:</strong> {formData.isbn}
                  </p>
                  {/* Add more fields as needed */}
                </div>
              )}

              {/* Additional Inputs for courseName and degreeName */}
              <div className="additional-fields">
                <label htmlFor="isbn-courseName">שם קורס</label>
                <input
                  id="isbn-courseName"
                  type="text"
                  name="courseName"
                  placeholder="שם קורס"
                  value={formData.courseName}
                  onChange={handleChange}
                />

                <label htmlFor="isbn-degreeName">שם תואר</label>
                <input
                  id="isbn-degreeName"
                  type="text"
                  name="degreeName"
                  placeholder="שם תואר"
                  value={formData.degreeName}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {(activeTab === 'manual' || formData.title) && (
            <div className="buttons">
              <button type="button" onClick={handleAddBook} className="add-button">
                הוסף ספר
              </button>
              <button type="button" onClick={onClose} className="cancel-button">
                בטל
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddBookModal;
