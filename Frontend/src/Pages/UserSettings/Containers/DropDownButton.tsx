// import React from 'react';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React from 'react';
// import { Select, Option } from '@material-tailwind/react';

export default function DropDownButton(props: {
  buttonText?: string;
  buttonList?: string[];
  selected?: string;
  handleSelectionChange?: (selectedItem: string) => void;
}) {
  const [selectedItem, setSelectedItem] = React.useState(props.selected);
  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    if (props.handleSelectionChange) {
      props.handleSelectionChange(item);
    }
  };
  return (
    <Menu>
      <MenuHandler>
        <Button
          ripple={false}
          className='text-blue-light flex items-center gap-3 text-xs font-extrabold uppercase bg-inherit p-3 hover:shadow-none focus:shadow-none shadow-none '
        >
          {selectedItem || props.buttonText}
          <ChevronDownIcon
            color='gray'
            strokeWidth={2.5}
            className='h-3.5 w-3.5'
          />
        </Button>
      </MenuHandler>
      <MenuList className='m-0 p-0'>
        {props.buttonList?.map((item, i) => (
          <MenuItem
            value={item}
            className={`border-b border-[#EDEFF1] uppercase rounded-none focus:text-blue-500 active:text-blue-500 hover:text-black font-medium ${selectedItem == item && 'text-blue-light hover:!text-blue-light'} `}
            key={`${item}${i}`}
            onClick={() => {
              handleItemClick(item);
            }}
          >
            {item}
          </MenuItem>
        ))}
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
