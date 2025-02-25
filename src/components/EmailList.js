import React, { useMemo } from 'react';
import { useEmail } from '../context/EmailContext';
import EmailItem from './EmailItem';
import './EmailList.css';

const EmailList = ({ onSelectEmail }) => {
  const { state } = useEmail();
  const { emails, trashedEmails, searchQuery, currentCategory } = state;

  const filteredEmails = useMemo(() => {
    const currentEmails = currentCategory === 'inbox' ? emails : trashedEmails;
    if (!searchQuery) return currentEmails;

    const searchTerm = searchQuery.toLowerCase();
    return currentEmails.filter(email => (
      email.sender.toLowerCase().includes(searchTerm) ||
      email.title.toLowerCase().includes(searchTerm) ||
      email.email_body.toLowerCase().includes(searchTerm)
    ));
  }, [emails, trashedEmails, searchQuery, currentCategory]);

  if (filteredEmails.length === 0) {
    return (
      <div className="email-list empty">
        <div className="no-emails">
          {searchQuery 
            ? 'No emails found matching your search'
            : `No emails in ${currentCategory}`}
        </div>
      </div>
    );
  }

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
    </div>
  );
};

export default React.memo(EmailList); 