import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const BookTable: React.FC = () => {
  const { books, filters } = useSelector((state: RootState) => state.books);

  const filteredBooks = books.filter((book) => {
    // Convert values to lowercase for case-insensitive matching
    const courseNumberFilter = filters.courseNumber.toLowerCase();
    const bookNameFilter = filters.bookName.toLowerCase();
    const locationFilter = filters.location.toLowerCase();
    const degreeNameFilter = filters.degreeName.toLowerCase();

    return (
      (courseNumberFilter === '' || book.courseName.toLowerCase().includes(courseNumberFilter)) &&
      (bookNameFilter === '' || book.title.toLowerCase().includes(bookNameFilter)) &&
      (locationFilter === '' || book.location.toLowerCase().includes(locationFilter)) &&
      (degreeNameFilter === '' || book.degreeName.toLowerCase().includes(degreeNameFilter))
    );
  });

  return (
    <table border={1} style={{ width: '100%', textAlign: 'center' }}>
      <thead>
        <tr>
          <th>שם</th>
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
              <td>{book.title}</td>
              <td>{book.courseName}</td>
              <td>{book.degreeName}</td>
              <td>{book.author}</td>
              <td>{book.location}</td>
              <td>{book.isbn}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>לא נמצאו ספרים</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BookTable;
