import React from 'react';
import { useEmail } from '../context/EmailContext';
import EmailItem from './EmailItem';
import './EmailList.css';

const EmailList = ({ onSelectEmail }) => {
  const { state } = useEmail();
  const { emails, searchQuery } = state;

  const filteredEmails = emails.filter(email => {
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
        />
      ))}
      {filteredEmails.length === 0 && (
        <div className="no-emails">No emails found</div>
      )}
    </div>
  );
};

export default EmailList; 