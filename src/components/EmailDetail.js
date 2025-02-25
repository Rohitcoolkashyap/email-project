import React from 'react';
import { useEmail } from '../context/EmailContext';
import './EmailDetail.css';

const EmailDetail = ({ email, onClose }) => {
  const { state, dispatch } = useEmail();
  const formattedDate = new Date(email.time).toLocaleString();
  const isTrash = state.currentCategory === 'trash';

  const handleToggleRead = () => {
    dispatch({ type: 'TOGGLE_READ', payload: email.id });
  };

  const handleDelete = () => {
    if (isTrash) {
      dispatch({ type: 'PERMANENT_DELETE', payload: email.id });
    } else {
      dispatch({ type: 'DELETE_EMAIL', payload: email.id });
    }
    onClose();
  };

  const handleRestore = () => {
    dispatch({ type: 'RESTORE_EMAIL', payload: email.id });
    onClose();
  };

  return (
    <div className="email-detail">
      <div className="email-detail-header">
        <button onClick={onClose} className="back-button">
          Back to {isTrash ? 'Trash' : 'Inbox'}
        </button>
        <div className="actions" style={{ opacity: 1 }}>
          <button onClick={handleToggleRead} className="read-button">
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