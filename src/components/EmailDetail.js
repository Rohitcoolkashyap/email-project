import React from 'react';
import { useEmail } from '../context/EmailContext';
import './EmailDetail.css';

const EmailDetail = ({ email, onClose }) => {
  const { dispatch } = useEmail();
  const formattedDate = new Date(email.time).toLocaleString();

  const handleToggleRead = () => {
    dispatch({ type: 'TOGGLE_READ', payload: email.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_EMAIL', payload: email.id });
    onClose();
  };

  return (
    <div className="email-detail">
      <div className="email-detail-header">
        <button onClick={onClose} className="back-button">
          Back to Inbox
        </button>
        <div className="actions">
          <button onClick={handleToggleRead} className="read-button">
            {email.isRead ? 'Mark as Unread' : 'Mark as Read'}
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </div>
      </div>
      
      <div className="email-content">
        <div className="email-info">
          <h2>{email.title}</h2>
          <div className="sender-info">
            <span className="sender">From: {email.sender}</span>
            <span className="time">Time: {formattedDate}</span>
          </div>
        </div>
        <div className="email-body">
          {email.email_body.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailDetail; 