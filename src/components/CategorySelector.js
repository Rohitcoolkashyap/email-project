import React from 'react';
import { useEmail } from '../context/EmailContext';
import './CategorySelector.css';

const CategorySelector = () => {
  const { state, dispatch } = useEmail();

  const handleCategoryChange = (category) => {
    dispatch({ type: 'SET_CURRENT_CATEGORY', payload: category });
  };

  return (
    <div className="category-selector">
      <button
        className={`category-button ${state.currentCategory === 'inbox' ? 'active' : ''}`}
        onClick={() => handleCategoryChange('inbox')}
      >
        Inbox ({state.emails.length})
      </button>
      <button
        className={`category-button ${state.currentCategory === 'trash' ? 'active' : ''}`}
        onClick={() => handleCategoryChange('trash')}
      >
        Trash ({state.trashedEmails.length})
      </button>
    </div>
  );
};

export default CategorySelector; 