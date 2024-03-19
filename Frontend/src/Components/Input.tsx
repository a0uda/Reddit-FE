import PropTypes from 'prop-types';
import React from 'react';

interface InputProps {
  placeholder: string;
  style?: React.CSSProperties;
  id?: string;
  type?: string;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  style,
  id,
  type,
  className,
  value = '',
  onChange,
}) => {
  return (
    <input
      id={id}
      type={type}
      className={className}
      placeholder={placeholder}
      style={style}
      value={value}
      onChange={onChange}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.object,
  id: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
