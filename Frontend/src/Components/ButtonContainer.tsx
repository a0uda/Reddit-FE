import { ReactNode } from 'react';
import { cn } from '../utils/helper_functions';

type ButtonContainerProps = {
  children: ReactNode;
  className?: string;
};

const ButtonContainer = ({ children, className }: ButtonContainerProps) => {
  return (
    <>
      <div
        className={cn(
          'flex checked:bg-orange flex-row items-center justify-center rounded-full bg-neutral-muted h-8 overflow-hidden',
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export default ButtonContainer;
