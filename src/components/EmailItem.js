import React, { useCallback, useMemo } from 'react';
import { useEmail } from '../context/EmailContext';
import './EmailItem.css';

const EmailItem = ({ email, onSelect, isTrash }) => {
  const { dispatch } = useEmail();
  
  const formattedDate = useMemo(() => {
    return new Date(email.time).toLocaleString();
  }, [email.time]);

  const previewText = useMemo(() => {
    const firstLine = email.email_body.split('\n').join(' ');
    return firstLine.length > 100 
      ? `${firstLine.substring(0, 100)}...`
      : firstLine;
  }, [email.email_body]);

  const handleToggleRead = useCallback((e) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_READ', payload: email.id });
  }, [dispatch, email.id]);

  const handleDelete = useCallback((e) => {
    e.stopPropagation();
    if (isTrash) {
      dispatch({ type: 'PERMANENT_DELETE', payload: email.id });
    } else {
      dispatch({ type: 'DELETE_EMAIL', payload: email.id });
    }
  }, [dispatch, email.id, isTrash]);

  const handleRestore = useCallback((e) => {
    e.stopPropagation();
    dispatch({ type: 'RESTORE_EMAIL', payload: email.id });
  }, [dispatch, email.id]);

  return (
    <div 
      className={`email-item ${email.isRead ? 'read' : 'unread'}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`Email from ${email.sender}: ${email.title}`}
    >
      <div className="email-header">
        <div className="sender">{email.sender}</div>
        <div className="time">{formattedDate}</div>
      </div>
      <div className="title">{email.title}</div>
      <div className="preview">{previewText}</div>
      <div className="actions">
        <button 
          onClick={handleToggleRead}
          className={`read-button ${email.isRead ? 'read' : 'unread'}`}
          aria-label={email.isRead ? 'Mark as unread' : 'Mark as read'}
        >
          {email.isRead ? 'Mark as Unread' : 'Mark as Read'}
        </button>
        {isTrash ? (
          <>
            <button 
              onClick={handleRestore} 
              className="restore-button"
              aria-label="Restore email"
            >
              Restore
            </button>
            <button 
              onClick={handleDelete} 
              className="delete-button permanent"
              aria-label="Delete permanently"
            >
              Delete Permanently
            </button>
          </>
        ) : (
          <button 
            onClick={handleDelete} 
            className="delete-button"
            aria-label="Move to trash"
          >
            Move to Trash
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(EmailItem, (prevProps, nextProps) => {
  return (
    prevProps.email.id === nextProps.email.id &&
    prevProps.email.isRead === nextProps.email.isRead &&
    prevProps.isTrash === nextProps.isTrash
  );
}); 