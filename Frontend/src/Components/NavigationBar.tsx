import { useEffect, useRef, useState } from 'react';
import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Badge,
  Avatar,
  Typography,
  Switch,
  Drawer,
  List,
  ListItem,
} from '@material-tailwind/react';
import {
  HiArrowRightOnRectangle,
  HiCursorArrowRipple,
  HiEllipsisHorizontal,
  HiMagnifyingGlass,
  HiShoppingBag,
} from 'react-icons/hi2';
import { LogoMark, LogoText } from '../assets/icons/Logo';
import { PlusIcon } from '@heroicons/react/24/solid';
import {
  ArrowRightEndOnRectangleIcon,
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Cog8ToothIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import SideBar from './SideBar';
import { cn } from '../utils/helper_functions';

export function NavigationBar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const isLogged = true;

  return (
    <div className='px-4'>
      <nav className='m-0 px-4 flex flex-row justify-between border-b-[1px] border-b-neutral-muted h-14 w-full'>
        <div className=' flex items-center col-span-4 gap-2 p-0'>
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
          <a href='/'>
            <div className='flex gap-2 items-center justify-center h-12'>
              <LogoMark />
              <div className='hidden lg:flex'>
                <LogoText />
              </div>
            </div>
          </a>
        </div>
        <div className='col-span-4 hidden w-full relative lg:flex lg:items-center lg:justify-center'>
          <SearchBar />
        </div>
        <div className='col-span-4 flex justify-end shrink-0'>
          {isLogged ? <CampainLoggedIn /> : <CampainLoggedOut />}
        </div>
        <Drawer
          open={openNav}
          onClose={() => setOpenNav(false)}
          className='absolute left-0 mt-14 p-4'
        >
          <div className='flex items-center justify-between'>
            <LogoMark />
            <IconButton onClick={() => setOpenNav(false)}>
              <XMarkIcon className='w-6 h-6' />
            </IconButton>
          </div>
          <hr className='border-neutral-muted my-4' />
          <SideBar />
        </Drawer>
      </nav>
    </div>
  );
}

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        onFocus={() => {
          setIsFocused(true);
          inputRef.current?.focus();
        }}
        onBlur={() => {
          console.log('blur');
          setIsFocused(false);
        }}
        className={cn(
          'flex items-center space-x-2 px-3 py-2 rounded-full bg-neutral-muted absolute z-50 max-w-[550px] w-full',
          isFocused
            ? ' bg-white shadow-md shadow-black/25 absolute top-3 items-start rounded-xl  h-[calc(100vh-3.5rem)]'
            : ''
        )}
        tabIndex={0}
      >
        <HiMagnifyingGlass size={20} className='fill-black' />
        <input
          className='!border-0 bg-transparent w-full focus:outline-none placeholder:text-black/80 placeholder:font-light'
          placeholder='Search Reddit'
          aria-label='Search Reddit'
          ref={inputRef}
        />
      </div>
    </>
  );
};

const MobileSearchBar = () => {
  return (
    <>
      {/* Use Dialog as a fullscreen */}
      <div className='flex items-center space-x-2 px-3 py-2 rounded-full bg-neutral-muted absolute z-50 max-w-[550px] w-full'>
        <HiMagnifyingGlass size={20} className='fill-black' />
        <input
          className='!border-0 bg-transparent w-full focus:outline-none placeholder:text-black/80 placeholder:font-light'
          placeholder='Search Reddit'
          aria-label='Search Reddit'
        />
      </div>
    </>
  );
};

const CampainLoggedOut = () => {
  return (
    <>
      <div className='flex items-center gap-x-1'>
        <IconButton variant='text'>
          <HiMagnifyingGlass size={20} className='fill-black' />
        </IconButton>
        <Button className='bg-orange-muted'>Log In</Button>
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
  const user = {
    name: 'Ahmed Tarek',
    username: 'ahmedtarek',
    icon: 'https://www.redditstatic.com/avatars/avatar_default_07_24A0ED.png',
  };

  const [avatarDrawer, setAvatarDrawer] = useState(false);

  const avatarMenu = (
    <>
      <List className='p-0 text-foreground w-full'>
        <ListItem className='py-2 flex gap-2 items-center'>
          <Avatar
            src={user.icon}
            alt={user.name + ' Profile'}
            variant='circular'
            size='sm'
          />
          <div>
            <Typography variant='small'>View Profile</Typography>
            <Typography
              variant='small'
              className='text-neutral-900 font-normal text-xs'
            >
              u/{user.username}
            </Typography>
          </div>
        </ListItem>
        <ListItem className='py-3 flex gap-2 items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <ShieldCheckIcon className='w-6 h-6' />
            <a href='#'>Mod Mode</a>
          </div>
          <Switch
            crossOrigin
            id='custom-switch-component'
            className='h-full w-full checked:bg-blue-light-muted'
            containerProps={{
              className: 'w-11 h-6',
            }}
            circleProps={{
              className: 'before:hidden left-0.5 border-none',
            }}
          />
        </ListItem>
        <ListItem className='py-3 flex gap-2 items-center'>
          <ArrowRightEndOnRectangleIcon className='w-6 h-6' />
          <a href='#'>Log Out</a>
        </ListItem>
        <hr className='border-neutral-muted pb-2' />
        <ListItem className='py-3 flex gap-2 items-center'>
          <Cog8ToothIcon className='w-6 h-6' />
          <a href='#'>Settings</a>
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      <div className='flex items-center gap-x-1'>
        <IconButton variant='text'>
          <HiMagnifyingGlass size={20} className='fill-black' />
        </IconButton>
        <Badge overlap='circular'>
          <a href='/chat'>
            <IconButton variant='text'>
              <ChatBubbleOvalLeftEllipsisIcon className='w-6 h-6' />
            </IconButton>
          </a>
        </Badge>
        <Badge overlap='circular' color='red'>
          <a href='/submit'>
            <Button variant='text' className='flex items-center gap-1.5'>
              <PlusIcon className='w-6 h-6' />
              Create
            </Button>
          </a>
        </Badge>
        <Menu
          dismiss={{
            itemPress: false,
          }}
          placement='bottom-end'
        >
          <MenuHandler>
            {/* <Badge overlap='circular'> */}
            <IconButton variant='text'>
              <BellIcon className='w-6 h-6' />
            </IconButton>
            {/* </Badge> */}
          </MenuHandler>
          <MenuList className='p-0 py-2 text-foreground w-96 shadow-lg *:hover:bg-none shadow-black/25 overflow-hidden'>
            <List className='p-0 text-foreground w-full'>
              <ListItem className='py-2 flex gap-2 items-center justify-around hover:bg-none  '>
                <Button variant='text' className='text-neutral-900'>
                  Notifications
                </Button>
                <Button variant='text' className='text-neutral-900'>
                  Messages
                </Button>
              </ListItem>
              <div className='bg-blue w-1/2 h-1 rounded-full' />
              <ListItem className='py-2 flex flex-col items-center justify-center hover:bg-none text-center'>
                <Typography variant='lead'>Recent Notifications</Typography>
                <Typography variant='small'>
                  Turn on email digest Stay in the loop on content from
                  communities you love right in your email inbox.
                </Typography>
              </ListItem>
              <ListItem className='py-2  hover:bg-none'>
                <Button
                  variant='filled'
                  className='w-full bg-neutral-muted text-black'
                >
                  See All
                </Button>
                {/* <Button variant='text' className='text-neutral-900'>
                    <a href='/settings/account'>View Settings</a>
                  </Button> */}
              </ListItem>
            </List>
          </MenuList>
        </Menu>
        {/* Avatar Dropdown */}
        <div className='hidden lg:block'>
          <Menu
            dismiss={{
              itemPress: false,
            }}
            placement='bottom-end'
          >
            <MenuHandler>
              <Button variant='text' className=''>
                <Avatar
                  src={user.icon}
                  alt={user.name + ' Profile'}
                  variant='circular'
                  size='sm'
                />
              </Button>
            </MenuHandler>
            <MenuList className='p-0 py-2 text-foreground w-64 shadow-lg shadow-black/25 overflow-hidden'>
              {avatarMenu}
            </MenuList>
          </Menu>
        </div>
        {/* Avatar Mobile */}
        <div className='lg:hidden'>
          <Button variant='text' onClick={() => setAvatarDrawer(true)}>
            <Avatar
              src={user.icon}
              alt={user.name + ' Profile'}
              variant='circular'
              size='sm'
            />
          </Button>
          <Drawer
            placement='bottom'
            open={avatarDrawer}
            onClose={() => setAvatarDrawer(false)}
            className='fixed mt-14 h-max'
          >
            {avatarMenu}
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
