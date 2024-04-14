import React from 'react';

const ContentContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className='bg-[#edeff1] min-h-[100vh] py-5 text-[#373c3f]'>
      <div className='bg-white mx-[13rem]'>{props.children}</div>
    </div>
  );
};

export default ContentContainer;
