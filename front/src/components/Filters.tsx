import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/slices/booksSlice';
import { RootState } from '../store/store';
import '../scss/components/_filters.scss';

const Filters: React.FC = () => {
  const filters = useSelector((state: RootState) => state.books.filters);
  const dispatch = useDispatch();

  return (
    <div className='filters' style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
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
        placeholder="תואר"
        value={filters.degreeName}
        onChange={(e) => dispatch(setFilters({ degreeName: e.target.value }))}
      />
    </div>
  );
};

export default Filters;
