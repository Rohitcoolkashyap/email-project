import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockEmails } from '../data/mockEmails';

const EmailContext = createContext();

const emailReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAILS':
      return { ...state, emails: action.payload };
    case 'TOGGLE_READ':
      return {
        ...state,
        emails: state.emails.map(email =>
          email.id === action.payload ? { ...email, isRead: !email.isRead } : email
        )
      };
    case 'DELETE_EMAIL':
      return {
        ...state,
        emails: state.emails.filter(email => email.id !== action.payload),
        deletedEmails: [...state.deletedEmails, state.emails.find(email => email.id === action.payload)]
      };
    case 'UNDO_DELETE':
      const lastDeleted = state.deletedEmails[state.deletedEmails.length - 1];
      return {
        ...state,
        emails: [...state.emails, lastDeleted],
        deletedEmails: state.deletedEmails.slice(0, -1)
      };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

export const EmailProvider = ({ children }) => {
  const initialState = {
    emails: mockEmails,
    deletedEmails: [],
    searchQuery: '',
  };

  const [state, dispatch] = useReducer(emailReducer, initialState);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('emailState', JSON.stringify(state));
  }, [state]);

  return (
    <EmailContext.Provider value={{ state, dispatch }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
}; 