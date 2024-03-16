import React, { ReactNode } from 'react';
import { Button } from '@material-tailwind/react';

export default function RoundedButton(props: {
  buttonColor: string;
  buttonBorderColor: string;
  buttonText: string;
  buttonTextColor: string;
  imgRight?: any;
  children?: ReactNode;
}) {
  return (
    <Button
      style={{
        //backgroundColor: props.buttonColor,
        // color: props.buttonTextColor,
        width: 'max-content',
      }}
      // color='black'
      className={`!border ${props.buttonColor} ${props.buttonBorderColor} !normal-case ${props.buttonTextColor} hover:bg-sky-600 active:bg-blue-900 rounded-full hover:shadow-none focus:shadow-none shadow-none `}
      size='sm'
      ripple={false}
    >
      <div className='flex justify-between items-center gap-1'>
        {props.children}
        {props.buttonText}
        {props.imgRight}
      </div>
    </Button>
  );
}
