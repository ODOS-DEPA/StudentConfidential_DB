import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by ID, Name, etc."
        style={{ padding: '8px', width: '250px' }}
      />
    </div>
  );
};

export default SearchBar;
