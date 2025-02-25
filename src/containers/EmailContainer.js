import React, { useState, useCallback, useEffect } from 'react';
import { useEmail } from '../context/EmailContext';
import EmailList from '../components/EmailList';
import EmailDetail from '../components/EmailDetail';
import SearchBar from '../components/SearchBar';
import CategorySelector from '../components/CategorySelector';
import Toast from '../components/Toast';
import './EmailContainer.css';

const EmailContainer = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const { state, dispatch } = useEmail();

    // Update selected email when its read status changes
    useEffect(() => {
      if (selectedEmail) {
        const updatedEmail = state.emails.find(email => email.id === selectedEmail.id) || 
                           state.trashedEmails.find(email => email.id === selectedEmail.id);
        if (updatedEmail && updatedEmail.isRead !== selectedEmail.isRead) {
          setSelectedEmail(updatedEmail);
        }
      }
    }, [state.emails, state.trashedEmails, selectedEmail]);

  const handleSelectEmail = useCallback((email) => {
    setSelectedEmail(email);
    // Mark email as read when opened
    if (!email.isRead) {
      dispatch({ type: 'TOGGLE_READ', payload: email.id });
    }
  }, [dispatch]);

  const handleCloseEmail = useCallback(() => {
    setSelectedEmail(null);
  }, []);

  const handleClearToast = useCallback(() => {
    dispatch({ type: 'CLEAR_TOAST' });
  }, [dispatch]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Email Client</h1>
        <SearchBar />
      </header>
      
      <main className="app-main">
        {!selectedEmail && <CategorySelector />}
        {selectedEmail ? (
          <EmailDetail 
            email={selectedEmail} 
            onClose={handleCloseEmail} 
          />
        ) : (
          <EmailList onSelectEmail={handleSelectEmail} />
        )}
      </main>

      {state.toast && (
        <Toast
          message={state.toast.message}
          type={state.toast.type}
          onClose={handleClearToast}
        />
      )}
    </div>
  );
};

export default EmailContainer; 