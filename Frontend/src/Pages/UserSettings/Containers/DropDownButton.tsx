import React from 'react';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Select, Option } from '@material-tailwind/react';

export default function DropDownButton(props: {
  buttonText: string;
  buttonList: string[];
}) {
  return (
    <select className='flex items-center gap-3 text-sm uppercase bg-inherit text-black p-3 hover:shadow-none focus:shadow-none shadow-none'>
      <option>Material Tailwind HTML</option>
      <option>Material Tailwind HTM</option>
      <option>Material Tailwind HT</option>
      <option>Material Tailwind H</option>
    </select>
  );
}
// <Menu>
//   <MenuHandler>
//     <Button className='flex items-center gap-3 text-sm uppercase bg-inherit text-black p-3 hover:shadow-none focus:shadow-none shadow-none '>
//       {props.buttonText}
//       <ChevronDownIcon strokeWidth={2.5} className='h-3.5 w-3.5' />
//     </Button>
//   </MenuHandler>
//   <MenuList>
//     <MenuItem>Menu Item 1</MenuItem>
//     <MenuItem>Menu Item 2</MenuItem>
//     <MenuItem>Menu Item 3</MenuItem>
//   </MenuList>
// </Menu>
