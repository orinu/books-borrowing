import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const MyBooks: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userId = "dasd123"; // Replace this with the actual logged-in user's ID from your auth logic
  const books = useSelector((state: RootState) =>
    state.books.books.filter((book) => book.userId === userId)
  );

  if (!isAuthenticated) {
    return <div>אנא התחבר כדי לצפות בספרים שלך</div>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'right' }}>
      <h1>הספרים שלי</h1>
      {books.length === 0 ? (
        <p>אין לך ספרים.</p>
      ) : (
        <table border={1} style={{ width: '100%', textAlign: 'right' }}>
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
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.courseName}</td>
                <td>{book.degreeName}</td>
                <td>{book.author}</td>
                <td>{book.location}</td>
                <td>{book.isbn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBooks;
