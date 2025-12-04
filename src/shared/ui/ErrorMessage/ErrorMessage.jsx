import './ErrorMessage.css';

export const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      <span className="error-icon">⚠️</span>
      <p className="error-text">{message}</p>
    </div>
  );
};

