import React, { useState } from 'react';

const Filters: React.FC = () => {
  const [courseNumber, setCourseNumber] = useState('');
  const [bookName, setBookName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="מספר קורס"
        value={courseNumber}
        onChange={(e) => setCourseNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="שם הספר"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
      />
      <input
        type="text"
        placeholder="מיקום"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="תיאור"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default Filters;
