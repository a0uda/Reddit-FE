import React from 'react';
import { useState } from 'react';
import { Alert, Button } from '@material-tailwind/react';
import { TfiClose } from 'react-icons/tfi';

function Icon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='h-6 w-6'
    >
      <path
        fillRule='evenodd'
        d='M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
        clipRule='evenodd'
      />
    </svg>
  );
}

interface AlertProps {
  //alert data
  msgg: string;
  errorr: boolean;
}

const GenericAlert: React.FC<AlertProps> = (props) => {
  const [open, setOpen] = useState(true);

  return (
    <div className='absolute w-full z-50'>
      <Alert
        variant='gradient'
        open={open}
        icon={props.errorr && <Icon />}
        className={`w-auto mx-16 my-3 p-2 text-sm flex items-center bg-${props.errorr ? 'red' : 'black'}`} //it accepts only red, white and black
        color='red'
        action={
          <Button
            variant='text'
            color='white'
            size='sm'
            className='right-1 !absolute'
            onClick={() => setOpen(false)}
          >
            <TfiClose className='' />
          </Button>
        }
      >
        {props.msgg}
      </Alert>
    </div>
  );
};

export default GenericAlert;
