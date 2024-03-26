import { useEffect, useState } from 'react';
import { Alert as TailwindAlert, Button } from '@material-tailwind/react';
import { TfiClose } from 'react-icons/tfi';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const Icon = (props: { isError: boolean }) => {
  return props.isError ? (
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
  ) : (
    <CheckCircleIcon strokeWidth={1.5} className='h-6 w-6' />
  );
};

export default function Alert(props: {
  //   show: boolean;
  message: string;
  isError: boolean;
  trigger: boolean;
  setMessage;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timeoutId;
    console.log(props.trigger);
    if (props.message) {
      setOpen(true);
      console.log(props.message);

      timeoutId = setTimeout(() => {
        setOpen(false);
        props.setMessage('');
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId); // Clear the timeout on component unmount or when error changes
    };
  }, [props.trigger]);

  return (
    <>
      {/* <div className='absolute w-full z-50'> */}
      <TailwindAlert
        variant='gradient'
        open={open}
        icon={<Icon isError={props.isError} />}
        className='fixed top-[35px] inset-x-[50%] translate-x-[-50%] translate-y-[-50%] w-[85%]  p-2 text-sm flex items-center'
        color={props.isError ? 'red' : 'green'}
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
        {props.message}
      </TailwindAlert>
      {/* </div> */}
    </>
  );
}
