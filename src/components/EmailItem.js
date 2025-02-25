import React from 'react';
import { useEmail } from '../context/EmailContext';
import './EmailItem.css';

const EmailItem = ({ email, onSelect, isTrash }) => {
  const { dispatch } = useEmail();
  const formattedDate = new Date(email.time).toLocaleString();

  const handleToggleRead = (e) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_READ', payload: email.id });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (isTrash) {
      dispatch({ type: 'PERMANENT_DELETE', payload: email.id });
    } else {
      dispatch({ type: 'DELETE_EMAIL', payload: email.id });
    }
  };

  const handleRestore = (e) => {
    e.stopPropagation();
    dispatch({ type: 'RESTORE_EMAIL', payload: email.id });
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
        {email.email_body.split('\n')[0].substring(0, 100)}...
      </div>
      <div className="actions">
        <button 
          onClick={handleToggleRead}
          className={`read-button ${email.isRead ? 'read' : 'unread'}`}
        >
          {email.isRead ? 'Mark as Unread' : 'Mark as Read'}
        </button>
        {isTrash ? (
          <>
            <button onClick={handleRestore} className="restore-button">
              Restore
            </button>
            <button onClick={handleDelete} className="delete-button permanent">
              Delete Permanently
            </button>
          </>
        ) : (
          <button onClick={handleDelete} className="delete-button">
            Move to Trash
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailItem; 