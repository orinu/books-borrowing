import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px' }}>
      <button>הגדרות</button>
      <button>התחברות</button>
      <button>ספר חדש</button>
      <button>הספרים שלי</button>
    </div>
  );
};

export default TopBar;
