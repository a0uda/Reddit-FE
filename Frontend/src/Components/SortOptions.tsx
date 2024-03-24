import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { useState } from 'react';

const SortOptions = () => {
  const sortOptions = ['Best', 'Hot', 'New', 'Top', 'Rising'];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Menu open={openMenu} handler={setOpenMenu}>
        <MenuHandler>
          <Button className='flex items-center gap-2' variant='text'>
            {sortOption}{' '}
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3.5 w-3.5 transition-transform ${
                openMenu ? 'rotate-180' : ''
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className='p-0 *:p-4 min-w-min'>
          {sortOptions.map((option) => (
            <MenuItem
              key={option}
              onClick={() => {
                setSortOption(option);
              }}
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default SortOptions;
