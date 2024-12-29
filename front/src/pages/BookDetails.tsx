import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import '../scss/pages/_bookdetails.scss';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const book = useSelector((state: RootState) =>
    state.books.books.find((b) => b.id === id)
  );
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  if (!book) {
    return <div>ספר לא נמצא</div>;
  }

  const handleShare = () => {
    const shareData = {
      title: book.title,
      text: `Check out this book: ${book.title}, available at ${book.location}.`,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.error('Error sharing', err));
    } else {
      alert('Sharing is not supported in your browser.');
    }
  };

  const handleRedirectToLogin = () => {
    alert('אנא התחבר כדי לצפות במידע נוסף.');
    navigate('/');
  };

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <p><strong>שם קורס:</strong> {book.courseName}</p>
      <p><strong>שם תואר:</strong> {book.degreeName}</p>
      <p><strong>מחבר:</strong> {book.author}</p>
      <p><strong>מיקום:</strong> {book.location}</p>
      <p><strong>מספר ISBN:</strong> {book.isbn}</p>
      {isAuthenticated ? (
        <div className="auth-details">
          <p><strong>שם המוסר:</strong> {book.userName}</p>
          <p><strong>דוא"ל הלווה:</strong> {book.userEmail}</p>
          <p><strong>טלפון של הלווה:</strong> {book.userPhone}</p>
        </div>
      ) : (
        <div className="auth-details">
          <button className="login-prompt" onClick={handleRedirectToLogin}>
            התחבר לצפייה בפרטים
          </button>
        </div>
      )}
      <div className="share-button">
        <button onClick={handleShare}>שתף</button>
      </div>
    </div>
  );
};

export default BookDetails;
