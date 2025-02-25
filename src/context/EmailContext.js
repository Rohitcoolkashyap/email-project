import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { mockEmails } from '../data/mockEmails';

const EmailContext = createContext();

// Action types as constants to avoid typos
const ACTION_TYPES = {
  SET_EMAILS: 'SET_EMAILS',
  TOGGLE_READ: 'TOGGLE_READ',
  DELETE_EMAIL: 'DELETE_EMAIL',
  RESTORE_EMAIL: 'RESTORE_EMAIL',
  PERMANENT_DELETE: 'PERMANENT_DELETE',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_CURRENT_CATEGORY: 'SET_CURRENT_CATEGORY',
  CLEAR_TOAST: 'CLEAR_TOAST',
  SET_TRASHED_EMAILS: 'SET_TRASHED_EMAILS'
};

const emailReducer = (state, action) => {
  try {
    switch (action.type) {
      case ACTION_TYPES.SET_EMAILS:
        return { ...state, emails: action.payload };

      case ACTION_TYPES.TOGGLE_READ: {
        const toggleEmailInList = (list) =>
          list.map(email =>
            email.id === action.payload ? { ...email, isRead: !email.isRead } : email
          );

        return {
          ...state,
          emails: toggleEmailInList(state.emails),
          trashedEmails: toggleEmailInList(state.trashedEmails),
          toast: {
            message: 'Email marked as ' + (state.emails.find(e => e.id === action.payload)?.isRead ? 'unread' : 'read'),
            type: 'success'
          }
        };
      }

      case ACTION_TYPES.DELETE_EMAIL: {
        const emailToTrash = state.emails.find(email => email.id === action.payload);
        if (!emailToTrash) {
          throw new Error('Email not found');
        }

        return {
          ...state,
          emails: state.emails.filter(email => email.id !== action.payload),
          trashedEmails: [...state.trashedEmails, emailToTrash],
          toast: {
            message: 'Email moved to trash',
            type: 'info'
          }
        };
      }

      case ACTION_TYPES.RESTORE_EMAIL: {
        const emailToRestore = state.trashedEmails.find(email => email.id === action.payload);
        if (!emailToRestore) {
          throw new Error('Email not found in trash');
        }

        return {
          ...state,
          trashedEmails: state.trashedEmails.filter(email => email.id !== action.payload),
          emails: [...state.emails, emailToRestore],
          toast: {
            message: 'Email restored to inbox',
            type: 'success'
          }
        };
      }

      case ACTION_TYPES.PERMANENT_DELETE:
        return {
          ...state,
          trashedEmails: state.trashedEmails.filter(email => email.id !== action.payload),
          toast: {
            message: 'Email permanently deleted',
            type: 'error'
          }
        };

      case ACTION_TYPES.SET_SEARCH_QUERY:
        return { ...state, searchQuery: action.payload };

      case ACTION_TYPES.SET_CURRENT_CATEGORY:
        return { ...state, currentCategory: action.payload };

      case ACTION_TYPES.CLEAR_TOAST:
        return { ...state, toast: null };

      case ACTION_TYPES.SET_TRASHED_EMAILS:
        return { ...state, trashedEmails: action.payload };

      default:
        console.warn('Unknown action type:', action.type);
        return state;
    }
  } catch (error) {
    console.error('Error in emailReducer:', error);
    return {
      ...state,
      toast: {
        message: 'An error occurred',
        type: 'error'
      }
    };
  }
};

export const EmailProvider = ({ children }) => {
  const initialState = {
    emails: mockEmails,
    trashedEmails: [],
    searchQuery: '',
    currentCategory: 'inbox',
    toast: null
  };

  const [state, dispatch] = useReducer(emailReducer, initialState);

  const loadStateFromStorage = useCallback(() => {
    try {
      const savedState = localStorage.getItem('emailState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: ACTION_TYPES.SET_EMAILS, payload: parsedState.emails });
        if (parsedState.trashedEmails) {
          dispatch({ type: ACTION_TYPES.SET_TRASHED_EMAILS, payload: parsedState.trashedEmails });
        }
      }
    } catch (error) {
      console.error('Error loading state from storage:', error);
    }
  }, []);

  useEffect(() => {
    loadStateFromStorage();
  }, [loadStateFromStorage]);

  useEffect(() => {
    try {
      localStorage.setItem('emailState', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving state to storage:', error);
    }
  }, [state]);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  return (
    <EmailContext.Provider value={value}>
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