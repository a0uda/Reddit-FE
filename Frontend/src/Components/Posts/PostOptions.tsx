import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  EyeIcon,
  EyeSlashIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';

type PostOptionsProps = {
  saved: boolean;
  hidden: boolean;
};

const PostOptions = ({ saved, hidden }: PostOptionsProps) => {
  return (
    <Menu placement='bottom-end'>
      <MenuHandler>
        <Button variant='text' className='p-2'>
          <HiEllipsisHorizontal
            size={20}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        </Button>
      </MenuHandler>
      <MenuList className='p-0 text-foreground min-w-min w-max shadow-lg shadow-black/25'>
        <MenuItem className='py-3 flex gap-2 items-center'>
          {saved ? (
            <>
              <BookmarkSlashIcon className='w-5 h-5' />
              <a href='#'>Unsave</a>
            </>
          ) : (
            <>
              <BookmarkIcon className='w-5 h-5' />
              <a href='#'>Save</a>
            </>
          )}
        </MenuItem>
        <MenuItem className='py-3 flex gap-2 items-center'>
          {hidden ? (
            <>
              <EyeSlashIcon className='w-5 h-5' />
              <a href='#'>Unhide</a>
            </>
          ) : (
            <>
              <EyeIcon className='w-5 h-5' />
              <a href='#'>Hide</a>
            </>
          )}
        </MenuItem>
        <MenuItem className='py-3 flex gap-2 items-center'>
          <FlagIcon className='w-5 h-5' />
          <a href='#'>Report</a>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PostOptions;
