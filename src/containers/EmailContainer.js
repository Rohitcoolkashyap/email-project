import React, { useState, useCallback } from 'react';
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
          <EmailList onSelectEmail={setSelectedEmail} />
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