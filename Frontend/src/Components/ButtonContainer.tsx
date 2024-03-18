import { ReactNode } from 'react';

type ButtonContainerProps = {
  children: ReactNode;
};

const ButtonContainer = ({ children }: ButtonContainerProps) => {
  return (
    <>
      <div className='flex flex-row items-center justify-center gap-0.5 rounded-full bg-neutral-muted px-2 h-8 overflow-hidden'>
        {children}
      </div>
    </>
  );
};

export default ButtonContainer;
