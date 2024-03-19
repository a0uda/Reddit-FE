import React from 'react';

interface PopUpProps {
  children:
    | React.ReactElement<JSX.IntrinsicElements[keyof JSX.IntrinsicElements]>
    | React.ReactNode;
}

const PopUp: React.FC<PopUpProps> = ({ children }) => {
  return (
    <div
      id='crud-modal'
      tabIndex={-1}
      aria-hidden='true'
      className='fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center'
    >
      <div
        className='relative bg-white rounded-lg shadow-md mx-auto flex flex-col h-auto mt-10 mb-10'
        style={{ maxWidth: '1000px' }}
      >
        <div className='p-4 flex-grow'>{children}</div>
      </div>
    </div>
  );
};

export default PopUp;
