import React, { MouseEventHandler, ReactNode } from 'react';
import { Button } from '@material-tailwind/react';

export default function RoundedButton(props: {
  buttonColor: string;
  buttonBorderColor: string;
  buttonText: string;
  buttonTextColor: string;
  imgRight?: any;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={props.onClick}
      style={{
        //backgroundColor: props.buttonColor,
        // color: props.buttonTextColor,
        width: 'max-content',
      }}
      // color='black'
      className={`!border ${props.buttonColor} ${props.buttonBorderColor} !normal-case ${props.buttonTextColor} hover:opacity-50 active:brightness-150 rounded-full hover:shadow-none focus:shadow-none shadow-none `}
      size='sm'
      ripple={false}
      disabled={props.disabled || false}
    >
      <div className='flex justify-between items-center gap-1'>
        {props.children}
        {props.buttonText}
        {props.imgRight}
      </div>
    </Button>
  );
}
