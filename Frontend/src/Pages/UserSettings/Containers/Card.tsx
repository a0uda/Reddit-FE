import React, { ReactNode } from 'react';
import RoundedButton from '../../../Components/RoundedButton';
import imageSrc from '../../../assets/react.svg';

function Card(props: {
  children?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`flex justify-between items-center ${props.className}`}>
      {props.title && (
        <div className=' w-[65%]'>
          <h5 className='userSettingsCardHeader'>{props.title}</h5>
          <p className='userSettingsCardContent text-sm'>{props.description}</p>
        </div>
      )}
      {props.children}
    </div>
  );
}

export default Card;
