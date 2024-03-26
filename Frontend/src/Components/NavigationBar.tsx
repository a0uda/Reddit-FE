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
  ListItemPrefix,
  Dialog,
  DialogHeader,
  DialogBody,
  ListItemSuffix,
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
  ArrowLeftIcon,
  ArrowRightEndOnRectangleIcon,
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
  Cog8ToothIcon,
  ShieldCheckIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import SideBar from './SideBar';
import { cn } from '../utils/helper_functions';
import { CommunityIcon } from '../assets/icons/Icons';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { fetchRequest, patchRequest } from './../API/User';

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
      <nav className='m-0 p-0 flex flex-row justify-between border-b-[1px] border-b-neutral-muted h-14 w-full'>
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
          className='absolute left-0 p-4'
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
      {/* <div
        onFocus={() => {
          setIsFocused(true);
          inputRef.current?.focus();
        }}
        // onBlur={() => {
        //   console.log('blur');
        //   setIsFocused(false);
        // }}
        className={cn(
          'flex flex-col gap-2 px-3 py-2 rounded-full bg-neutral-muted absolute z-50 max-w-[550px] w-full',
          isFocused
            ? ' bg-white shadow-md shadow-black/25 absolute top-3 items-start rounded-xl overflow-y-auto overflow-x-hidden min-h-40 max-h-[calc(100vh-3.5rem)]'
            : ''
        )}
        tabIndex={0}
      >
        <div className='flex items-center gap-2'>
          <HiMagnifyingGlass size={20} className='fill-black' />
          <input
            className='!border-0 bg-transparent w-full focus:outline-none placeholder:text-black/80 placeholder:font-light'
            placeholder='Search Reddit'
            aria-label='Search Reddit'
            ref={inputRef}
          />
        </div>
        {isFocused && (
          <Collapse open={isFocused}>
            <SearchList />
          </Collapse>
        )}
      </div>
       */}
      <Menu
        open={isFocused}
        handler={() => setIsFocused((cur) => !cur)}
        offset={{ mainAxis: -0 }}
        placement='bottom'
      >
        <MenuHandler>
          <div
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-muted absolute z-50 max-w-[550px] w-full',
              isFocused
                ? ' bg-white shadow-md shadow-black/25 border-b-2 border-neutral-muted absolute top-3 items-start rounded-none rounded-t-xl overflow-y-auto overflow-x-hidden'
                : ''
            )}
          >
            <HiMagnifyingGlass size={20} className='fill-black' />
            <input
              className='!border-0 bg-transparent w-full focus:outline-none placeholder:text-black/80 placeholder:font-light'
              placeholder='Search Reddit'
              aria-label='Search Reddit'
              ref={inputRef}
            />
          </div>
        </MenuHandler>
        <MenuList className='hidden z-50 shadow-md shadow-black/25 max-w-[550px] w-full rounded-none rounded-b-xl lg:block min-h-24 max-h-[calc(100vh-3.5rem)]'>
          <SearchList />
        </MenuList>
      </Menu>
    </>
  );
};

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
                  navigate(`/r/AskReddit/search/?q=${search}&type=link`);
                }
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </DialogHeader>
        <DialogBody className='p-0'>
          <SearchList />
        </DialogBody>
      </Dialog>
    </div>
  );
};

const SearchList = () => {
  const [recent, setRecent] = useState([
    {
      title: 'programming',
      icon: 'https://www.redditstatic.com/avatars/avatar_default_07_24A0ED.png',
    },
    {
      title: 'test',
    },
  ]);

  return (
    <List className='p-0'>
      {recent.length > 0 ? (
        recent.map((item, index) => (
          <ListItem ripple={false} key={index}>
            <ListItemPrefix>
              {item.icon ? (
                <img
                  src={item.icon}
                  alt={item.title}
                  className='w-6 h-6 rounded-full'
                />
              ) : (
                <ClockIcon className='h-6 w-6' />
              )}
            </ListItemPrefix>
            {item.title}
            <ListItemSuffix>
              <IconButton
                variant='text'
                onClick={() => setRecent(recent.filter((_, i) => i !== index))}
              >
                <XCircleIcon className='h-6 w-6' />
              </IconButton>
            </ListItemSuffix>
          </ListItem>
        ))
      ) : (
        <ListItem className='p-0 flex flex-col items-center justify-center text-center hover:bg-transparent focus:bg-transparent'>
          <img
            className='max-h-[150px] mb-xl'
            role='presentation'
            src='https://www.redditstatic.com/shreddit/assets/snoovatar-full-hi.png'
            alt='Image for an empty inbox'
          />
          <Typography variant='lead'>No Recent Searches</Typography>
          <Typography variant='small'>
            Your recent searches will appear here.
          </Typography>
        </ListItem>
      )}
    </List>
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

  const numberOfMessages = 2;

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
            crossOrigin={''}
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
        <MobileSearchBar />
        <Badge
          overlap='circular'
          content={numberOfMessages}
          className={numberOfMessages === 0 ? 'hidden' : ''}
        >
          <a href='/chat'>
            <IconButton variant='text'>
              <ChatBubbleOvalLeftEllipsisIcon className='w-6 h-6' />
            </IconButton>
          </a>
        </Badge>
        <a href='/submit'>
          <Button variant='text' className='flex items-center gap-1.5'>
            <PlusIcon className='w-6 h-6' />
            Create
          </Button>
        </a>
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
          <MenuList className='p-0 py-2 text-foreground w-[346px] rounded-2xl shadow-lg *:hover:bg-none shadow-black/25 overflow-hidden'>
            <NotificationMenu />
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

const NotificationMenu = () => {
  const { data, refetch } = useQuery('notifications data', () =>
    fetchRequest('notifications')
  );
  // console.log(data);
  const notifications = data?.data ?? [];

  // handle mark all as read
  const markAllAsReadMutation = useMutation(patchRequest);
  const markAllAsRead = async () => {
    try {
      await markAllAsReadMutation.mutateAsync({
        endPoint: 'notifications/mark-all-as-read',
        newSettings: {
          read_flag: true,
        },
      });
      refetch();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  // handle hide notification
  const hideNotification = useMutation(
    (id) =>
      new Promise((resolve, reject) => {
        patchRequest({ endPoint: `notifications/hide/${id}`, newSettings: {} })
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      })
  );
  const handleHideNotification = async (id) => {
    try {
      await hideNotification.mutateAsync(id);
      refetch();
    } catch (error) {
      console.error('Failed to hide notification:', error);
    }
  };

  type Notification = {
    // to avoid the any type error
    id: string;
    created_at: string;
    post_id: string;
    comment_id: string;
    sending_user_username: string;
    description: string;
    unread_flag: boolean;
    hidden_flag: boolean;
    type: string;
    //Added
    community_id: string;
    community_name: string;
    communityAvatarSrc: string;
  };

  const renderNotificationItems = (notificationList: Notification[]) => {
    // renders the first two unhidden notifications of today and eralier
    const unhiddenNotifications = notificationList.filter(
      (notification) => !notification.hidden_flag
    );
    const firstTwoUnhiddenNotifications = unhiddenNotifications.slice(0, 2);

    return firstTwoUnhiddenNotifications.map(
      (notification: Notification, index: number) => (
        <ListItem
          key={index}
          className='py-2 flex gap-2 h-10 items-center hover:bg-transparent focus:bg-transparent'
        >
          <ListItemPrefix className='mr-0'>
            {notification.communityAvatarSrc ? (
              <Avatar
                size='sm'
                variant='circular'
                alt={notification.communityAvatarSrc}
                src={notification.communityAvatarSrc}
              />
            ) : (
              <CommunityIcon />
            )}
          </ListItemPrefix>
          <div>
            <Typography variant='small' color='blue-gray'>
              {notification.community_name}{' '}
            </Typography>
            <Typography
              variant='small'
              className='font-normal text-xs text-gray-600'
            >
              {notification.description}
            </Typography>
          </div>
          <div className='ml-auto'>
            <Menu placement='bottom-end'>
              <MenuHandler>
                <Button variant='text' className='p-2'>
                  <HiEllipsisHorizontal size={20} />
                </Button>
              </MenuHandler>
              <MenuList className='p-0 text-foreground min-w-min w-max shadow-lg shadow-black/25'>
                <MenuItem
                  className='py-3 flex gap-2 items-center'
                  onClick={() => {
                    handleHideNotification(notification.id);
                  }}
                >
                  <Typography variant='small' color='blue-gray'>
                    Hide this notification
                  </Typography>
                </MenuItem>
                <MenuItem className='py-3 flex gap-2 items-center'>
                  <Typography variant='small' color='blue-gray'>
                    Disable updates from this community
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </ListItem>
      )
    );
  };

  const today = notifications.filter((notification: Notification) => {
    const todayDate = new Date();
    const createdAt = new Date(notification.created_at);
    return createdAt.toDateString() === todayDate.toDateString();
  });

  const earlier = notifications.filter((notification: Notification) => {
    const createdAt = new Date(notification.created_at);
    const todayDate = new Date();
    return createdAt.toDateString() !== todayDate.toDateString();
  });

  // console.log(today);
  // console.log(earlier);

  return (
    <List className='p-0 text-foreground w-full'>
      <ListItem className='p-0 flex gap-2 items-center justify-around hover:bg-transparent focus:bg-transparent'>
        <Button variant='text' className='text-gray-700 hover:bg-transparent'>
          Notifications
        </Button>
        <a href='/message/messages'>
          <Button variant='text' className='text-gray-600 hover:bg-transparent'>
            {/* // TODO: update the link after creating the messages page */}
            Messages
          </Button>
        </a>
      </ListItem>
      <div className='bg-blue w-1/2 h-1 rounded-full' />
      {notifications.length > 0 ? (
        <>
          <div className='flex items-center justify-between p-3'>
            <Typography
              variant='small'
              className='text-neutral-900 uppercase font-medium'
            >
              Today
            </Typography>
            <div className='flex items-center gap-2'>
              <Typography
                variant='small'
                className='border-neutral-muted border-r-2 pr-2 cursor-pointer font-medium text-gray-800'
                onClick={markAllAsRead}
              >
                Mark all as Read
              </Typography>
              <a href='/settings/notifications'>
                <Cog8ToothIcon className='w-6 h-6 stroke-neutral-900' />
              </a>
            </div>
          </div>
          {renderNotificationItems(today)}
          <div className='flex items-center justify-between p-3'>
            <Typography
              variant='small'
              className='text-neutral-900 uppercase font-medium'
            >
              Earlier
            </Typography>
          </div>
          {renderNotificationItems(earlier)}
          <hr className='border-neutral-muted' />
          <div className='px-5 p-2'>
            <a href='/settings/account'>
              <Button
                variant='filled'
                className='w-full h-10 bg-neutral-muted text-black text-sm'
              >
                See All
              </Button>
            </a>
          </div>
        </>
      ) : (
        <>
          <ListItem className='px-5 py-2 flex flex-col items-center justify-center text-center hover:bg-transparent focus:bg-transparent'>
            <img
              className='max-h-[150px] mb-xl'
              role='presentation'
              src='https://www.redditstatic.com/shreddit/assets/snoovatar-full-hi.png'
              alt='Image for an empty inbox'
            />
            <Typography variant='lead'>No Notifications</Typography>
            <Typography variant='small'>
              All caught up! Check back later for new notifications.
            </Typography>
          </ListItem>
          <hr className='border-neutral-muted' />
          <div className='px-5 p-2'>
            <Button
              variant='filled'
              className='w-full h-10 bg-neutral-muted text-black'
            >
              View Settings
            </Button>
          </div>
        </>
      )}
    </List>
  );
};

export default NavigationBar;
