import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const BookTable: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);

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
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.courseName}</td>
            <td>{book.author}</td>
            <td>{book.location}</td>
            <td>{book.isbn}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
