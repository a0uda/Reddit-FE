import React, { useState } from 'react';

import { Button, Input } from '@material-tailwind/react';

function InputWButton(props: { label: string; buttonText: string }) {
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <div className='relative flex w-full'>
        {/* comment : label text size */}
        <Input
          label={props.label}
          size='lg'
          className='pr-20 w-full'
          containerProps={{
            className: 'min-w-5 ',
          }}
          crossOrigin={undefined}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          size='sm'
          color='white'
          ripple={false}
          disabled={!inputValue}
          className='!absolute right-1 top-[0.38rem] text-blue-light  hover:shadow-none focus:shadow-none shadow-none hover:inherit'
        >
          {props.buttonText}
        </Button>
      </div>
    </>
  );
}

export default InputWButton;
