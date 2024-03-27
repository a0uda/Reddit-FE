import { ReactNode } from 'react';
import { Spinner } from '@material-tailwind/react';

function LoadingProvider(props: {
  children: ReactNode;
  isLoading: boolean;
  error: boolean;
}) {
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
