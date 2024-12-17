import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/slices/booksSlice';
import { RootState } from '../store/store';

const Filters: React.FC = () => {
  const filters = useSelector((state: RootState) => state.books.filters);
  const dispatch = useDispatch();

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="מספר קורס"
        value={filters.courseNumber}
        onChange={(e) => dispatch(setFilters({ courseNumber: e.target.value }))}
      />
      <input
        type="text"
        placeholder="שם הספר"
        value={filters.bookName}
        onChange={(e) => dispatch(setFilters({ bookName: e.target.value }))}
      />
      <input
        type="text"
        placeholder="מיקום"
        value={filters.location}
        onChange={(e) => dispatch(setFilters({ location: e.target.value }))}
      />
      <input
        type="text"
        placeholder="תיאור"
        value={filters.description}
        onChange={(e) => dispatch(setFilters({ description: e.target.value }))}
      />
    </div>
  );
};

export default Filters;
