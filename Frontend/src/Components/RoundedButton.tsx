import { MouseEventHandler, ReactNode } from 'react';
import { Button } from '@material-tailwind/react';

export default function RoundedButton(props: {
  buttonColor: string;
  buttonBorderColor: string;
  buttonIcon?: ReactNode;
  buttonText: string;
  buttonTextColor: string;
  buttonShape?: string;
  imgRight?: any;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <Button
      onClick={props.onClick}
      style={{
        //backgroundColor: props.buttonColor,
        // color: props.buttonTextColor,
        width: 'max-content',
      }}
      type={props.type || 'button'}
      // color='black'
      className={`rounded-full !border ${props.buttonColor} ${props.buttonBorderColor} !normal-case ${props.buttonTextColor} hover:opacity-50 active:brightness-150  hover:shadow-none focus:shadow-none shadow-none `}
      size='sm'
      ripple={false}
      disabled={props.disabled || false}
    >
      <div className='flex justify-between items-center gap-1'>
        {props.children}
        {props.buttonIcon}
        {props.buttonText}
        {props.imgRight}
      </div>
    </Button>
  );
}
