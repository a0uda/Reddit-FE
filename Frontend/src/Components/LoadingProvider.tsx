import React, { ReactNode } from 'react';
import { Spinner } from '@material-tailwind/react';
import { useAlert } from '../Providers/AlertProvider';

function LoadingProvider(props: {
  children: ReactNode;
  isLoading: boolean;
  error: boolean;
}) {
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();
  React.useEffect(() => {
    console.log(props.error);
    if (props.error) {
      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage('Unable to fetch data');
    }
  }, [props.error]);
  return props.isLoading ? (
    <div className='w-full h-[30rem] flex items-center justify-center'>
      <Spinner className='h-16 w-16 text-gray-200' />
    </div>
  ) : props.error ? (
    <h2 className='w-full h-[30rem] flex items-center justify-center text-xl font-bold'>
      Error
    </h2>
  ) : (
    props.children
  );
}

export default LoadingProvider;
