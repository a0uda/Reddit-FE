import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
} from '@material-tailwind/react';
import { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import SearchDropdown from './SearchDropdown';

const MobileSearchBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <div className='lg:hidden'>
      {/* Use Dialog as a fullscreen */}
      <IconButton variant='text' onClick={() => setOpen(!open)}>
        <HiMagnifyingGlass size={20} className='fill-black' />
      </IconButton>

      <Dialog open={open} handler={() => setOpen(!open)} size='xxl'>
        <DialogHeader className='px-4 space-x-5'>
          <IconButton variant='text' onClick={() => setOpen(!open)}>
            <ArrowLeftIcon className='w-6 h-6' />
          </IconButton>
          <div className='flex items-center space-x-2 rounded-full z-50 w-full'>
            <HiMagnifyingGlass size={20} className='fill-black' />
            <input
              className='!border-0 bg-transparent w-full font-normal focus:outline-none placeholder:text-black/80 placeholder:font-light'
              placeholder='Search Reddit'
              aria-label='Search Reddit'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setOpen(false);
                  navigate(`/search/?q=${search}&type=link`);
                }
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </DialogHeader>
        <DialogBody className='p-0'>
          <SearchDropdown />
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default MobileSearchBar;
