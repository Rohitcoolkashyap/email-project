import React, { useState } from 'react';
import { EmailProvider } from './context/EmailContext';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import SearchBar from './components/SearchBar';
import CategorySelector from './components/CategorySelector';
import './App.css';

function App() {
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <EmailProvider>
      <div className="App">
        <header className="app-header">
          <h1>Email Client</h1>
          <SearchBar />
        </header>
        
        <main className="app-main">
          <CategorySelector />
          {selectedEmail ? (
            <EmailDetail 
              email={selectedEmail} 
              onClose={() => setSelectedEmail(null)} 
            />
          ) : (
            <EmailList onSelectEmail={setSelectedEmail} />
          )}
        </main>
      </div>
    </EmailProvider>
  );
}

export default App;
