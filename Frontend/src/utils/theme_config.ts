import type { ButtonStyleTypes } from '@material-tailwind/react';

const button: ButtonStyleTypes = {
  defaultProps: {
    // variant: string,
    size: 'sm',
    className: 'rounded-full font-medium p-3 normal-case',
  },
};

export const theme = {
  button,
};
