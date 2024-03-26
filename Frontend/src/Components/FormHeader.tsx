import PropTypes from 'prop-types';
import React from 'react';

interface InputProps {
  title?: string;
  paragraph?: string;
}

const FormHeader: React.FC<InputProps> = ({ title, paragraph }) => {
  return (
    <>
      <div className='my-10 text-black'>
        <h1 className='m-2 pl-3 font-bold text-2xl'>{title}</h1>
        <p className='m-2 pl-2 mb-3'>{paragraph}</p>
      </div>
    </>
  );
};

FormHeader.propTypes = {
  title: PropTypes?.string,
  paragraph: PropTypes?.string,
};

export default FormHeader;
