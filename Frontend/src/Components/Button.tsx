import PropTypes from 'prop-types';
import React from 'react';

interface ButtonProps {
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  content?: string;
  onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  style,
  type,
  className,
  content,
  onSubmit,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={className}
      style={style}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  style: PropTypes?.object,
  type: PropTypes?.oneOf(['button', 'submit', 'reset']),
  className: PropTypes?.string,
  content: PropTypes?.string,
};

export default Button;
