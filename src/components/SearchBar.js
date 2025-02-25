import React, { useState, useCallback, useEffect } from 'react';
import { useEmail } from '../context/EmailContext';
import './SearchBar.css';

const DEBOUNCE_DELAY = 300; // 300ms delay for debouncing

const SearchBar = () => {
  const { dispatch } = useEmail();
  const [searchInput, setSearchInput] = useState('');

  const debouncedSearch = useCallback((value) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: value });
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchInput);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchInput, debouncedSearch]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search emails..."
        value={searchInput}
        onChange={handleSearchChange}
        aria-label="Search emails"
      />
    </div>
  );
};

export default React.memo(SearchBar); 