import { MouseEventHandler, ReactNode } from 'react';
import { Button } from '@material-tailwind/react';

export default function OvalButton(props: {
  buttonColor: string;
  buttonBorderColor: string;
  buttonIcon?: ReactNode;
  buttonText: ReactNode;
  buttonTextColor: string;
  buttonShape?: string;
  imgRight?: ReactNode;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <Button
      onClick={props.onClick}
      style={{
        // backgroundColor: props.buttonColor,
        // color: props.buttonTextColor,
        width: 'max-content',
      }}
      type={props.type || 'button'}
      // color='black'
      className={`${props.buttonColor} ${props.buttonBorderColor} ${props.buttonTextColor} ${props.className}`}
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
