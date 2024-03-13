import React from 'react';
import { Button } from 'react-bootstrap';
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
      className='rounded-pill d-flex align-items-center'
    >
      {/* {props.buttonImagePath && (
        <img src={props.buttonImagePath} width='20px' height='auto'></img>
      )} */}
      {props.buttonText}
    </Button>
  );
}
