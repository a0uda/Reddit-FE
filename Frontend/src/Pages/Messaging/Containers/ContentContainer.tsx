import React from 'react';

const ContentContainer = (props: {
  children: React.ReactNode;
  length: number;
}) => {
  console.log(props.length, 'length');

  return (
    <div className='bg-[#edeff1] min-h-screen p-5 text-[#373c3f] flex justify-center'>
      {props.length ? (
        <div className='bg-white w-[60rem]' style={{ height: 'fit-content' }}>
          {props.children}
        </div>
      ) : (
        <div
          className='bg-white w-[60rem] p-3'
          style={{ height: 'fit-content' }}
        >
          {"there doesn't seem to be anything here"}
        </div>
      )}
    </div>
  );
};

export default ContentContainer;
