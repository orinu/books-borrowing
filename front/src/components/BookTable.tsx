import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const BookTable: React.FC = () => {
  const { books, filters } = useSelector((state: RootState) => state.books);

  const filteredBooks = books.filter((book) => {
    return (
      (filters.courseNumber === '' || book.courseName.includes(filters.courseNumber)) &&
      (filters.bookName === '' || book.title.includes(filters.bookName)) &&
      (filters.location === '' || book.location.includes(filters.location)) &&
      (filters.description === '' || book.author.includes(filters.description)) // Using author for description
    );
  });

  return (
    <table border={1} style={{ width: '100%', textAlign: 'center' }}>
      <thead>
        <tr>
          <th>שם</th>
          <th>שם קורס</th>
          <th>מחבר</th>
          <th>מיקום</th>
          <th>מספר ISBN</th>
        </tr>
      </thead>
      <tbody>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.courseName}</td>
              <td>{book.author}</td>
              <td>{book.location}</td>
              <td>{book.isbn}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>לא נמצאו ספרים</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BookTable;
