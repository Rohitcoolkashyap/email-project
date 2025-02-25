import React from 'react';
import { useEmail } from '../context/EmailContext';
import EmailItem from './EmailItem';
import './EmailList.css';

const EmailList = ({ onSelectEmail }) => {
  const { state } = useEmail();
  const { emails, trashedEmails, searchQuery, currentCategory } = state;

  const currentEmails = currentCategory === 'inbox' ? emails : trashedEmails;

  const filteredEmails = currentEmails.filter(email => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      email.sender.toLowerCase().includes(searchTerm) ||
      email.title.toLowerCase().includes(searchTerm) ||
      email.email_body.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="email-list">
      {filteredEmails.map(email => (
        <EmailItem
          key={email.id}
          email={email}
          onSelect={() => onSelectEmail(email)}
          isTrash={currentCategory === 'trash'}
        />
      ))}
      {filteredEmails.length === 0 && (
        <div className="no-emails">
          {searchQuery 
            ? 'No emails found matching your search'
            : `No emails in ${currentCategory}`}
        </div>
      )}
    </div>
  );
};

export default EmailList; 