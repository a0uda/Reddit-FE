import { ReactNode } from 'react';

type ButtonContainerProps = {
  children: ReactNode;
};

const ButtonContainer = ({ children }: ButtonContainerProps) => {
  return (
    <>
      <div className='flex flex-row items-center justify-center rounded-full bg-neutral-muted h-8 overflow-hidden'>
        {children}
      </div>
    </>
  );
};

export default ButtonContainer;
