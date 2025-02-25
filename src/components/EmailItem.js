import React from 'react';
import { useEmail } from '../context/EmailContext';
import './EmailItem.css';

const EmailItem = ({ email, onSelect }) => {
  const { dispatch } = useEmail();
  const formattedDate = new Date(email.time).toLocaleString();

  const handleToggleRead = (e) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_READ', payload: email.id });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch({ type: 'DELETE_EMAIL', payload: email.id });
  };

  return (
    <div 
      className={`email-item ${email.isRead ? 'read' : 'unread'}`}
      onClick={onSelect}
    >
      <div className="email-header">
        <div className="sender">{email.sender}</div>
        <div className="time">{formattedDate}</div>
      </div>
      <div className="title">{email.title}</div>
      <div className="preview">
        {email.email_body.split("\n").slice(0, 3).join("\n")}...
      </div>
      <div className="actions">
        <button 
          onClick={handleToggleRead}
          className={`read-button ${email.isRead ? 'read' : 'unread'}`}
        >
          {email.isRead ? 'Mark as Unread' : 'Mark as Read'}
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmailItem; 