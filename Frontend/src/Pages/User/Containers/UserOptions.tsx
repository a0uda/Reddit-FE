import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import {
  EnvelopeIcon,
  FlagIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
type UserOptionsProps = {
  handleSendMessage: () => void;
  handleReport: () => void;
  handleBlock: () => void;
};

function UserOptions({
  handleSendMessage,
  handleReport,
  handleBlock,
}: UserOptionsProps) {
  return (
    <div>
      <Menu placement='bottom-end'>
        <MenuHandler>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.nativeEvent.stopImmediatePropagation();
              e.stopPropagation();
            }}
            variant='text'
            className='p-2 z-10'
          >
            <HiEllipsisHorizontal size={20} />
          </Button>
        </MenuHandler>
        <MenuList className='p-0 text-foreground min-w-min w-max shadow-lg shadow-black/25'>
          <MenuItem
            onClick={handleSendMessage}
            className='py-3 flex gap-2 items-center'
          >
            <EnvelopeIcon strokeWidth={1.5} className='h-5 w-5' />
            Send a Message
          </MenuItem>
          <MenuItem
            onClick={handleBlock}
            className='py-3 flex gap-2 items-center'
          >
            <ExclamationCircleIcon strokeWidth={1.5} className='h-5 w-5' />
            Block Account
          </MenuItem>
          <MenuItem
            onClick={handleReport}
            className='py-3 flex gap-2 items-center'
          >
            <FlagIcon strokeWidth={1.5} className='h-5 w-5' />
            Report Profile
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default UserOptions;
