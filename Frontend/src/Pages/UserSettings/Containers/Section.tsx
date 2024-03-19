import React from 'react';

export default function Section(props: {
  sectionTitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className='mb-10'>
      <div className='border-b-[1px] pb-1 text-[10px] font-bold tracking-wider text-gray-light border-[#EDEFF1]'>
        {props.sectionTitle}
      </div>
      <div className=' flex my-6 flex-col gap-8'>{props.children}</div>
    </div>
  );
}
