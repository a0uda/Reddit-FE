import React, { useState } from 'react';

import { Button, Input } from '@material-tailwind/react';

function InputWButton(props: { label: string; buttonText: string }) {
  const [inputValue, setInputValue] = useState('');
  return (
    <div>
      <div className='relative flex w-full w-[40rem]'>
        {/* comment : label text size */}
        <Input
          label={props.label}
          size='lg'
          className='pr-20'
          color='blue'
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
          className='!absolute right-1 top-1 text-blue-600  hover:shadow-none focus:shadow-none shadow-none hover:inherit'
        >
          {props.buttonText}
        </Button>
      </div>
    </div>
  );
}

export default InputWButton;
