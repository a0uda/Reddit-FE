import PropTypes from 'prop-types';
import { Input as TailwindInput, Typography } from '@material-tailwind/react';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface InputProps {
  placeholder: string;
  style?: React.CSSProperties;
  id?: string;
  type?: string;
  className?: string;
  value?: string;
  touched?: boolean;
  error?: boolean;
  errorMsg?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmpty: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  style,
  id,
  type,
  className,
  value,
  error,
  errorMsg,
  onChange,
  isEmpty,
}) => {
  const [showTick, setShowTick] = React.useState(false);
  return (
    <div className='w-full mb-3'>
      <div className='relative flex'>
        <TailwindInput
          crossOrigin={undefined}
          id={id}
          type={type}
          className={
            !className
              ? `!border !border-t-[rgb(176,190,197)]
       bg-white text-gray-900 rounded-full placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 ${error && '!border-t-danger-red'}  `
              : className
          }
          placeholder={placeholder}
          style={style}
          value={value}
          error={error}
          onChange={onChange}
          onBlur={() => {
            setShowTick(true);
          }}
          onFocus={() => {
            setShowTick(false);
          }}
          labelProps={{
            className: 'hidden',
          }}
        />

        {!error && showTick && !isEmpty && (
          <FaCheckCircle className='absolute right-3  top-1/2 -translate-y-1/2 text-green-muted ' />
        )}
      </div>
      {errorMsg && (
        <Typography
          variant='small'
          color='gray'
          className={'ps-2 font-normal text-danger-red mt-1'}
        >
          {errorMsg}
        </Typography>
      )}
    </div>
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
