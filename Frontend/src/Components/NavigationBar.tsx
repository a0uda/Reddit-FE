import { useEffect, useState } from 'react';
import {
  // Navbar,
  // MobileNav,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import Logo from './Logo';
import {
  HiArrowRightOnRectangle,
  HiCursorArrowRipple,
  HiEllipsisHorizontal,
  HiMagnifyingGlass,
  HiQrCode,
  HiShoppingBag,
} from 'react-icons/hi2';

export function NavigationBar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const isLogged = false;

  return (
    <div className='px-4'>
      <nav className='m-0 px-4 flex flex-row justify-between border-b-[1px] border-b-neutral-muted h-14 w-full lg:grid lg:grid-cols-12 lg:gap-4'>
        <div className=' flex items-center col-span-4 p-0'>
          <a
            href='/'
            className='flex items-center cursor-pointer font-medium h-12'
          >
            <Logo />
          </a>
        </div>
        <div className='col-span-4 hidden lg:flex lg:items-center'>
          <SearchBar />
        </div>
        <div className='col-span-4 flex justify-end'>
          {isLogged ? <CampainLoggedIn /> : <CampainLoggedOut />}

          <IconButton
            variant='text'
            className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                className='h-6 w-6'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </IconButton>
        </div>
        {/* {navList} */}
        {/* <MobileNav open={openNav}>
          <div className='container mx-auto'>
            <div className='flex items-center gap-x-1'>
              <Button fullWidth variant='text' size='sm' className=''>
                <span>Log In</span>
              </Button>
              <Button fullWidth variant='gradient' size='sm' className=''>
                <span>Sign in</span>
              </Button>
            </div>
          </div>
        </MobileNav> */}
      </nav>
    </div>
  );
}

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <div
        // onClick={() => setIsFocused(true)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          console.log('blur');
          setIsFocused(false);
        }}
        className={
          'flex items-center space-x-2 px-3 py-2 rounded-full bg-neutral-muted w-full' +
          (isFocused ? ' bg-white shadow-md shadow-black/25' : '')
        }
        tabIndex={0}
      >
        <HiMagnifyingGlass size={20} className='fill-black' />
        <input
          className='!border-0 bg-transparent w-full'
          placeholder='Search in Reddit'
          aria-label='Search in Reddit'
          autoFocus={isFocused}
        />
      </div>
    </>
  );
};

const CampainLoggedOut = () => {
  return (
    <>
      <div className='flex items-center gap-x-1'>
        <Button
          variant='filled'
          className='flex items-center gap-2 h-10 bg-neutral-500 text-neutral-black'
        >
          <span className='flex items-center gap-2 h-full'>
            <HiQrCode size={20} />
            Get App
          </span>
        </Button>
        <Button variant='filled' className='bg-orange-muted'>
          Log In
        </Button>
        <Menu placement='bottom-end'>
          <MenuHandler>
            <Button variant='text' className='p-2'>
              <HiEllipsisHorizontal size={20} />
            </Button>
          </MenuHandler>
          <MenuList className='p-0 py-2 text-foreground w-max shadow-lg shadow-black/25'>
            <MenuItem className='py-2 flex gap-2 items-center'>
              <HiArrowRightOnRectangle size={20} />
              <a href='#'>Log In / Sign Up</a>
            </MenuItem>
            <MenuItem className='py-3 flex gap-2 items-center'>
              <HiCursorArrowRipple size={20} />
              <a href='#'>Advertise on Reddit</a>
            </MenuItem>
            <MenuItem className='py-3 flex gap-2 items-center'>
              <HiShoppingBag size={20} />
              <a href='#'>Shop Collectible Avatars</a>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </>
  );
};

const CampainLoggedIn = () => {
  return (
    // Get App
    //         Log In
    // Log In / Sign Up
    // Advertise on Reddit
    // Shop Collectible Avatars
    <></>
  );
};

export default NavigationBar;
