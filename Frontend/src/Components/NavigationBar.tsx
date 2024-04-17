import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
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
  HiEllipsisHorizontal,
  HiMagnifyingGlass,
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
import { cn, getTimeDifference } from '../utils/helper_functions';
import { CommunityIcon } from '../assets/icons/Icons';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { fetchRequest, patchRequest } from './../API/User';
import Login from '../Pages/credential/Login';
import RecoverUsername from '../Pages/credential/RecoverUsername';
import ResetPassword from '../Pages/credential/ResetPassword';
import Signup from '../Pages/credential/Signup';
import useSession from '../hooks/auth/useSession';

export function NavigationBar() {
  const [openNav, setOpenNav] = useState(false);

  const { status } = useSession();
  const [avatarDrawer, setAvatarDrawer] = useState(false);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <>
      <div className='px-4 sticky top-0 z-20 w-full bg-white overflow-visible'>
        <nav className='m-0 p-0 flex flex-row justify-between border-b-[1px] border-b-neutral-muted h-navbar w-full'>
          <div className=' flex items-center col-span-4 gap-2 p-0'>
            <IconButton
              variant='text'
              className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent xl:hidden'
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
            <Link to='/'>
              <div className='flex gap-2 items-center justify-center h-12'>
                <LogoMark />
                <div className='hidden lg:flex'>
                  <LogoText />
                </div>
              </div>
            </Link>
          </div>
          <div className='col-span-4 hidden w-full relative lg:flex lg:items-center lg:justify-center'>
            <SearchBar />
          </div>
          <div className='col-span-4 flex justify-end shrink-0'>
            {status === 'authenticated' ? (
              <CampainLoggedIn setAvatarDrawer={setAvatarDrawer} />
            ) : (
              <CampainLoggedOut />
            )}
          </div>
        </nav>
      </div>
      <Drawer
        open={openNav}
        onClose={() => setOpenNav(false)}
        className='absolute left-0 p-4 w-full bg-white z-[9999] h-full'
      >
        <div className='flex items-center justify-between'>
          <LogoMark />
          <IconButton onClick={() => setOpenNav(false)}>
            <XMarkIcon className='w-6 h-6' />
          </IconButton>
        </div>
        <hr className='border-neutral-muted my-4' />
        <SideBar className='p-0' />
      </Drawer>
      <Drawer
        placement='bottom'
        open={avatarDrawer}
        onClose={() => setAvatarDrawer(false)}
        className='fixed mt-14 h-max'
      >
        <AvatarMenu />
      </Drawer>
    </>
  );
}

const SearchBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Menu
        open={isFocused}
        handler={() => {
          setIsFocused((cur) => !cur);
        }}
        offset={{ mainAxis: -41 }}
        placement='bottom'
        dismiss={{
          itemPress: false,
        }}
      >
        <MenuHandler>
          <div
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-muted absolute max-w-[550px] w-full'
            )}
          >
            <HiMagnifyingGlass size={20} className='fill-black' />
            {/* <input
              className='!border-0 bg-transparent w-full focus:outline-none placeholder:text-black/80 placeholder:font-light'
              placeholder='Search Reddit'
              aria-label='Search Reddit'
            /> */}
            <span className='text-black/80 font-light'>Search Reddit</span>
          </div>
        </MenuHandler>
        <MenuList className='*:focus:bg-transparent *:hover:bg-transparent p-0 pt-1 hidden z-30 shadow-md shadow-black/25 max-w-[550px] w-full rounded-3xl lg:block min-h-24 max-h-[calc(100vh-3.5rem)]'>
          <div
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-muted absolute z-30 max-w-[550px] w-full h-10',
              isFocused
                ? ' bg-white border-b-2 border-neutral-muted relative items-start rounded-none rounded-t-xl overflow-y-auto overflow-x-hidden'
                : ''
            )}
          >
            <HiMagnifyingGlass size={20} className='fill-black' />
            <input
              className='!border-0 bg-transparent w-full focus:outline-none placeholder:text-black/80 placeholder:font-light'
              placeholder='Search Reddit'
              aria-label='Search Reddit'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsFocused(false);
                  setSearch('');
                  navigate(`/r/AskReddit/search/?q=${search}&type=link`);
                }
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ref={inputRef}
              // onFocus={() => inputRef.current?.focus()}
              onBlur={() => inputRef.current?.focus()}
            />
          </div>
          <div className='hidden z-50 max-w-[550px] w-full rounded-none rounded-b-xl lg:block'>
            <SearchList />
          </div>
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
  const [loginMod, setLoginMod] = useState(false);
  const [recoverMod, setRecoverMod] = useState(false);
  const [resetPwdMod, setResetPwdMod] = useState(false);
  const [signupMod, setSignupMod] = useState(false);
  console.log(loginMod);

  return (
    <>
      <div className='flex items-center gap-x-1'>
        <Login
          open={loginMod}
          handleOpen={() => {
            setLoginMod(!loginMod);
          }}
          openPassword={() => {
            setResetPwdMod(true);
          }}
          openSignup={() => {
            setSignupMod(true);
          }}
          openUsername={() => {
            setRecoverMod(true);
          }}
        />
        <RecoverUsername
          open={recoverMod}
          handleOpen={() => {
            setRecoverMod(!recoverMod);
          }}
          handlePrevious={() => {
            setLoginMod(true);
          }}
          openSignup={() => {
            setSignupMod(true);
          }}
        />
        <ResetPassword
          open={resetPwdMod}
          handleOpen={() => {
            setResetPwdMod(!resetPwdMod);
          }}
          handlePrevious={() => {
            setLoginMod(true);
          }}
          openSignup={() => {
            setSignupMod(true);
          }}
          openUsername={() => {
            setRecoverMod(true);
          }}
        />
        <Signup
          open={signupMod}
          handleOpen={() => {
            setSignupMod(!signupMod);
          }}
          openLogin={() => {
            setLoginMod(true);
          }}
        />
        <IconButton variant='text'>
          <HiMagnifyingGlass size={20} className='fill-black' />
        </IconButton>
        <Button
          className='bg-orange-muted'
          onClick={() => {
            setLoginMod(true);
          }}
        >
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
              <Link to='#'>Log In / Sign Up</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </>
  );
};

const AvatarMenu = () => {
  const { user } = useSession();

  const navigate = useNavigate();

  return (
    <>
      <List className='p-0 text-foreground w-full'>
        <ListItem
          className='py-2 flex gap-2 items-center'
          onClick={() => {
            navigate(`user/${user?.username}/saved`);
            location.reload();
          }}
        >
          <Avatar
            src={
              user?.imageUrl ||
              'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
            }
            alt={user?.name + "'s Profile"}
            variant='circular'
            size='sm'
          />
          <div>
            <Typography variant='small'>View Profile</Typography>
            <Typography
              variant='small'
              className='text-neutral-900 font-normal text-xs'
            >
              u/{user?.username}
            </Typography>
          </div>
        </ListItem>
        <ListItem className='py-3 flex gap-2 items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <ShieldCheckIcon className='w-6 h-6' />
            <Link to='#'>Mod Mode</Link>
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
        <ListItem
          className='py-3 flex gap-2 items-center'
          onClick={() => {
            localStorage.clear();
            navigate('/');
            location.reload();
          }}
        >
          <ArrowRightEndOnRectangleIcon className='w-6 h-6' />
          Log Out
        </ListItem>
        <hr className='border-neutral-muted pb-2' />
        <Link to='/settings/account'>
          <ListItem className='py-3 flex gap-2 items-center'>
            <Cog8ToothIcon className='w-6 h-6' />
            Settings
          </ListItem>
        </Link>
      </List>
    </>
  );
};

const CampainLoggedIn = ({
  setAvatarDrawer,
}: {
  setAvatarDrawer: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useSession();

  return (
    <>
      <div className='flex items-center gap-x-1'>
        <MobileSearchBar />
        <Link to='/chat'>
          <IconButton variant='text'>
            <ChatBubbleOvalLeftEllipsisIcon className='w-6 h-6' />
          </IconButton>
        </Link>
        <Link to='/submit'>
          <Button variant='text' className='flex items-center gap-1.5'>
            <PlusIcon className='w-6 h-6' />
            Create
          </Button>
        </Link>
        <NotificationMenu />
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
                  src={
                    user?.imageUrl ||
                    'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
                  }
                  alt={user?.name + "'s Profile"}
                  variant='circular'
                  size='sm'
                />
              </Button>
            </MenuHandler>
            <MenuList className='p-0 py-2 text-foreground w-64 shadow-lg shadow-black/25 overflow-hidden'>
              <AvatarMenu />
            </MenuList>
          </Menu>
        </div>
        {/* Avatar Mobile */}
        <div className='lg:hidden'>
          <Button variant='text' onClick={() => setAvatarDrawer(true)}>
            <Avatar
              src={
                user?.imageUrl ||
                'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
              }
              alt={user?.name + "'s Profile"}
              variant='circular'
              size='sm'
            />
          </Button>
        </div>
      </div>
    </>
  );
};

const NotificationMenu = () => {
  const { data, refetch } = useQuery(
    'notifications data',
    async () => await fetchRequest('notifications'),
    {
      onSuccess: (data) => {
        setNotifications(data?.data ?? []);
      },
    }
  );
  console.log(data);
  const [notifications, setNotifications] = useState(data?.data ?? []);

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
  const markAsRead = async (id: string) => {
    try {
      await markAllAsReadMutation.mutateAsync({
        endPoint: `notifications/mark-as-read/${id}`,
        newSettings: {
          read_flag: false,
        },
      });
      refetch();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  // handle hide notification
  const hideNotification = useMutation(
    (id: string) =>
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
  const handleHideNotification = async (id: string) => {
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
          className={`py-8 flex gap-2 h-10 items-center rounded-none ${
            notification.unread_flag ? 'bg-light-blue-50' : 'bg-transparent'
          }`}
          onClick={() => markAsRead(notification.id)}
        >
          <ListItemPrefix className='mr-0'>
            {notification.communityAvatarSrc ? (
              <div className='min-w-10'>
                <Avatar
                  size='sm'
                  variant='circular'
                  alt={notification.communityAvatarSrc}
                  src={notification.communityAvatarSrc}
                />
              </div>
            ) : (
              <CommunityIcon />
            )}
          </ListItemPrefix>
          <div>
            <div className='flex items-center gap-2'>
              <Typography variant='small' color='blue-gray'>
                r/{notification.community_name}
              </Typography>
              <Typography variant='paragraph' className='text-xs text-gray-600'>
                {getTimeDifference(notification.created_at)}
              </Typography>
            </div>
            <p className='font-normal text-xs text-gray-600 line-clamp-2 overflow-hidden text-ellipsis'>
              {notification.description}
            </p>
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

  const [today, setToday] = useState([]);
  const [earlier, setEarlier] = useState([]);
  console.log(notifications);

  useEffect(() => {
    if (notifications) {
      setToday(
        notifications?.filter((notification: Notification) => {
          const todayDate = new Date();
          const createdAt = new Date(notification.created_at);
          return createdAt.toDateString() === todayDate.toDateString();
        })
      );

      setEarlier(
        notifications?.filter((notification: Notification) => {
          const createdAt = new Date(notification.created_at);
          const todayDate = new Date();
          return createdAt.toDateString() !== todayDate.toDateString();
        })
      );
    }
    // console.log(notifications);
    // console.log(today);
  }, [notifications]);

  const unreadNotifications = notifications.filter(
    (notification: Notification) => notification.unread_flag
  );

  // console.log(today);
  // console.log(earlier);

  return (
    <Menu
      dismiss={{
        itemPress: false,
      }}
      placement='bottom-end'
    >
      <MenuHandler>
        <IconButton variant='text' className='!overflow-visible'>
          {unreadNotifications.length > 0 ? (
            <Badge
              overlap='circular'
              className='text-xs p-0 min-w-4 min-h-4'
              content={<div>{unreadNotifications.length}</div>}
            >
              <BellIcon className='w-6 h-6' />
            </Badge>
          ) : (
            <BellIcon className='w-6 h-6' />
          )}
        </IconButton>
      </MenuHandler>
      <MenuList className='p-0 py-2 text-foreground w-[346px] rounded-2xl shadow-lg *:hover:bg-none shadow-black/25 overflow-hidden'>
        <List className='p-0 text-foreground w-full'>
          <ListItem className='p-0 flex gap-2 items-center justify-around hover:bg-transparent focus:bg-transparent'>
            <Button
              variant='text'
              className='text-gray-700 hover:bg-transparent'
            >
              Notifications
            </Button>
            <a href='/message/messages'>
              <Button
                variant='text'
                className='text-gray-600 hover:bg-transparent'
              >
                {/* // TODO: update the link after creating the messages page */}
                Messages
              </Button>
            </a>
          </ListItem>
          <div className='bg-blue w-1/2 h-1 rounded-full mb-3' />
          {notifications.length > 0 ? (
            <>
              <div className='flex items-center justify-between px-3'>
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
              <div className='flex items-center justify-between px-3'>
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
                <Link to='/notifications'>
                  <Button
                    variant='filled'
                    className='w-full h-10 bg-neutral-muted text-black text-sm'
                  >
                    See All
                  </Button>
                </Link>
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
      </MenuList>
    </Menu>
  );
};

export default NavigationBar;
