import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { toggleBookStatus } from '../store/slices/booksSlice';

const MyBooks: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userId = useSelector((state: RootState) => state.auth.user!.userId); 
  const books = useSelector((state: RootState) =>
    state.books.books.filter((book) => book.userId === userId)
  );
  const dispatch = useDispatch();

  const handleStatusChange = (id: string, newStatus: 'available' | 'taken') => {
    dispatch(toggleBookStatus({ id, newStatus }));
  };

  if (!isAuthenticated) {
    return <div>אנא התחבר כדי לצפות בספרים שלך</div>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'right' }}>
      <h2>הספרים שלי</h2>
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
              <th>סטטוס</th>
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
                <td>
                  <select
                    value={book.status}
                    onChange={(e) =>
                      handleStatusChange(book.id, e.target.value as 'available' | 'taken')
                    }
                  >
                    <option value="available">זמין</option>
                    <option value="taken">תפוס</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBooks;
