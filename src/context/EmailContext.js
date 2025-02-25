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
        ),
        trashedEmails: state.trashedEmails.map(email =>
          email.id === action.payload ? { ...email, isRead: !email.isRead } : email
        ),
        toast: {
          message: 'Email marked as ' + (state.emails.find(e => e.id === action.payload)?.isRead ? 'unread' : 'read'),
          type: 'success'
        }
      };
    case 'DELETE_EMAIL':
      const emailToTrash = state.emails.find(email => email.id === action.payload);
      return {
        ...state,
        emails: state.emails.filter(email => email.id !== action.payload),
        trashedEmails: emailToTrash ? [...state.trashedEmails, emailToTrash] : state.trashedEmails,
        toast: {
          message: 'Email moved to trash',
          type: 'info'
        }
      };
    case 'RESTORE_EMAIL':
      const emailToRestore = state.trashedEmails.find(email => email.id === action.payload);
      return {
        ...state,
        trashedEmails: state.trashedEmails.filter(email => email.id !== action.payload),
        emails: emailToRestore ? [...state.emails, emailToRestore] : state.emails,
        toast: {
          message: 'Email restored to inbox',
          type: 'success'
        }
      };
    case 'PERMANENT_DELETE':
      return {
        ...state,
        trashedEmails: state.trashedEmails.filter(email => email.id !== action.payload),
        toast: {
          message: 'Email permanently deleted',
          type: 'error'
        }
      };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_CURRENT_CATEGORY':
      return { ...state, currentCategory: action.payload };
    case 'CLEAR_TOAST':
      return { ...state, toast: null };
    default:
      return state;
  }
};

export const EmailProvider = ({ children }) => {
  const initialState = {
    emails: mockEmails,
    trashedEmails: [],
    deletedEmails: [],
    searchQuery: '',
    currentCategory: 'inbox',
    toast: null
  };

  const [state, dispatch] = useReducer(emailReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('emailState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      dispatch({ type: 'SET_EMAILS', payload: parsedState.emails });
      if (parsedState.trashedEmails) {
        dispatch({ type: 'SET_TRASHED_EMAILS', payload: parsedState.trashedEmails });
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
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