import React from 'react';

export default function SidebarSection(props: {
  sectionTitle?: string;
  children?: React.ReactNode;
  background?: string;
}) {
  return (
    <div className={`mb-5 bg-[url('${props.background}')]`}>
      <div
        className={`border-t-[1px] border-blue-gray-100 pt-4 text-[10px] font-semibold uppercase tracking-wider text-gray-light  `}
      >
        {props.sectionTitle}
      </div>
      <div className=' flex my-4 flex-col justify-between '>
        {props.children}
      </div>
    </div>
  );
}
