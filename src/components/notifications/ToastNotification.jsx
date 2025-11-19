import React, { useState, useEffect } from 'react';

const ToastNotification = ({ message, type, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onDismiss) {
        onDismiss();
      }
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!isVisible) {
    return null;
  }

  // Basic styling for demonstration. This should ideally be moved to a CSS file.
  const toastStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '15px',
    borderRadius: '8px',
    color: 'white',
    backgroundColor: '#333', // Default background
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '250px',
  };

  if (type === 'success') {
    toastStyle.backgroundColor = '#4CAF50';
  } else if (type === 'error') {
    toastStyle.backgroundColor = '#f44336';
  } else if (type === 'info') {
    toastStyle.backgroundColor = '#2196F3';
  }

  const dismissButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '1.2em',
    cursor: 'pointer',
    marginLeft: '10px',
  };

  return (
    <div style={toastStyle}>
      <span>{message}</span>
      <button onClick={handleDismiss} style={dismissButtonStyle}>
        &times;
      </button>
    </div>
  );
};

export default ToastNotification;
