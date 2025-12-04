import { forwardRef } from 'react';
import './TextArea.css';

export const TextArea = forwardRef(({
  value,
  onChange,
  placeholder,
  disabled,
  rows = 5,
}, ref) => {
  return (
    <textarea
      ref={ref}
      className="textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
    />
  );
});

TextArea.displayName = 'TextArea';
