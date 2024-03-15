// import React from 'react';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
// import { Select, Option } from '@material-tailwind/react';

export default function DropDownButton(props: {
  buttonText: string;
  buttonList: string[];
}) {
  return (
    <Menu>
      <MenuHandler>
        <Button
          ripple={false}
          className='text-blue-500 flex items-center gap-3 text-xs font-extrabold uppercase bg-inherit p-3 hover:shadow-none focus:shadow-none shadow-none '
        >
          {props.buttonText}
          <ChevronDownIcon
            color='gray'
            strokeWidth={2.5}
            className='h-3.5 w-3.5'
          />
        </Button>
      </MenuHandler>
      <MenuList className='m-0 p-0'>
        <MenuItem className='border-b rounded-none text-blue-500 focus:text-blue-500 active:text-blue-500 hover:text-blue-500 font-medium'>
          Menu Item 1
        </MenuItem>
        <MenuItem className='border-b rounded-none font-medium'>
          Menu Item 2
        </MenuItem>
        <MenuItem className='border-b rounded-none font-medium'>
          Menu Item 3
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

{
  /* <select className='flex items-center gap-3 text-sm uppercase bg-inherit text-black p-3 hover:shadow-none focus:shadow-none shadow-none'>
<option>Material Tailwind HTML</option>
<option>Material Tailwind HTM</option>
<option>Material Tailwind HT</option>
<option>Material Tailwind H</option>
</select> */
}
