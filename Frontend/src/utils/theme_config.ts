import type { ButtonStyleTypes } from '@material-tailwind/react';

const button: ButtonStyleTypes = {
  defaultProps: {
    // variant: string,
    size: 'sm',
    // color: string,
    // fullWidth: boolean,
    // ripple: boolean,
    className: 'rounded-full font-medium p-3 normal-case text-base',
  },
  valid: {
    variants: ['filled'],
    // sizes: string[],
    // colors: string[],
  },
  styles: {
    //   base: {
    //     initial: object,
    //     fullWidth: object,
    //   },
    //   sizes: {
    //     sm: object,
    //     md: object,
    //     lg: object,
    //   },
    variants: {
      //   filled: object,
      // gradient: object,
      // outlined: object,
      // text: object,
    },
  },
};

const iconButton: ButtonStyleTypes = {
  defaultProps: {
    // variant: string,
    size: 'sm',
    className: 'rounded-full font-medium p-3 normal-case',
  },
};

export const theme = {
  button,
  iconButton,
};
