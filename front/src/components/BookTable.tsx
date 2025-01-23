// src/components/BookTable.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import '../scss/components/_booktable.scss';

// Placeholder image URL (You can replace this with your own placeholder)
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/50x75?text=No+Cover';

const BookTable: React.FC = () => {
  const { books, filters } = useSelector((state: RootState) => state.books);

  const filteredBooks = books.filter((book) => {
    const courseNumberFilter = filters.courseNumber.toLowerCase();
    const bookNameFilter = filters.bookName.toLowerCase();
    const locationFilter = filters.location.toLowerCase();
    const degreeNameFilter = filters.degreeName.toLowerCase();

    return (
      book.status === 'available' &&
      (courseNumberFilter === '' || book.courseName.toLowerCase().includes(courseNumberFilter)) &&
      (bookNameFilter === '' || book.title.toLowerCase().includes(bookNameFilter)) &&
      (locationFilter === '' || book.location.toLowerCase().includes(locationFilter)) &&
      (degreeNameFilter === '' || book.degreeName.toLowerCase().includes(degreeNameFilter))
    );
  });

  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>כיסוי & שם</th> {/* Combined Cover & Title */}
          <th>שם קורס</th>
          <th>שם תואר</th>
          <th>מחבר</th>
          <th>מיקום</th>
          <th>מספר ISBN</th>
        </tr>
      </thead>
      <tbody>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <tr key={book.id}>
              <td className="cover-title-cell">
                {book.cover?.small ? (
                  <img
                    src={book.cover.small}
                    alt={`Cover of ${book.title}`}
                    className="book-cover-small"
                  />
                ) : null}
                <Link to={`/book/${book.id}`} className="book-title-link">
                  {book.title}
                </Link>
              </td>
              <td>{book.courseName}</td>
              <td>{book.degreeName}</td>
              <td>{book.author}</td>
              <td>{book.location}</td>
              <td>{book.isbn}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="no-books" colSpan={6}>לא נמצאו ספרים</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BookTable;
