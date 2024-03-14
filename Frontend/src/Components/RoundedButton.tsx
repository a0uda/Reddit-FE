import React from 'react';
import { Button } from '@material-tailwind/react';

export default function RoundedButton(props: {
  buttonColor: string;
  buttonBorderColor: string;
  buttonText: string;
  buttonTextColor: string;
  buttonImagePath?: string;
}) {
  return (
    <Button
      style={{
        backgroundColor: props.buttonColor,
        borderBlockColor: props.buttonBorderColor,
        color: props.buttonTextColor,
      }}
      className='rounded-full border-solid border-blue-400 hover:shadow-none focus:shadow-none shadow-none '
      variant='outlined'
      size='sm'
      ripple={false}
    >
      {/* {props.buttonImagePath && (
        <img src={props.buttonImagePath} width='20px' height='auto'></img>
      )} */}
      {props.buttonText}
    </Button>
  );
}
