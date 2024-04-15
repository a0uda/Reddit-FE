import React from 'react';

const ContentContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className='bg-[#edeff1] min-h-[100vh] p-5 text-[#373c3f] flex justify-center'>
      <div className='bg-white w-[60rem]'>{props.children}</div>
    </div>
  );
};

export default ContentContainer;
