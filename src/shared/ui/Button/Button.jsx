import './Button.css';

export const Button = ({ children, onClick, disabled, variant = 'primary' }) => {
  return (
    <button
      className={`button button--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

