import React, { useState } from 'react';
import { EmailProvider, useEmail } from './context/EmailContext';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import SearchBar from './components/SearchBar';
import CategorySelector from './components/CategorySelector';
import Toast from './components/Toast';
import './App.css';

const AppContent = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const { state, dispatch } = useEmail();

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
            onClose={() => setSelectedEmail(null)} 
          />
        ) : (
          <EmailList onSelectEmail={setSelectedEmail} />
        )}
      </main>

      {state.toast && (
        <Toast
          message={state.toast.message}
          type={state.toast.type}
          onClose={() => dispatch({ type: 'CLEAR_TOAST' })}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <EmailProvider>
      <AppContent />
    </EmailProvider>
  );
}

export default App;
