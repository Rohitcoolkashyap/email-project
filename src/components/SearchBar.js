import React from 'react';
import { useEmail } from '../context/EmailContext';
import './SearchBar.css';

const SearchBar = () => {
  const { state, dispatch } = useEmail();

  const handleSearch = (e) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search emails..."
        value={state.searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar; 