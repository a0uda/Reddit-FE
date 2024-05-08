import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
} from '@material-tailwind/react';
import { HiArrowRightOnRectangle, HiEllipsisHorizontal } from 'react-icons/hi2';
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
import { getTimeDifference } from '../utils/helper_functions';
import { CommunityIcon } from '../assets/icons/Icons';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { fetchRequest, patchRequest } from './../API/User';
import useSession from '../hooks/auth/useSession';
import SearchBar from './Search/SearchBar';
import MobileSearchBar from './Search/MobileSearchBar';
import Credentials from '../Pages/credential/Credentials';

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

const CampainLoggedOut = () => {
  const [loginMod, setLoginMod] = useState(false);

  return (
    <>
      <div className='flex items-center gap-x-1'>
        <Credentials loginMod={loginMod} setLoginMod={setLoginMod} />
        <MobileSearchBar />
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
            navigate(`/u/${user?.username}/overview`);
            location.reload();
          }}
        >
          <Avatar
            src={
              user?.profile_picture ||
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
        <Link to='/chat/create'>
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
                    user?.profile_picture ||
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
                user?.profile_picture ||
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
  // const { data, refetch } = useQuery(
  //   'notifications data',
  //   async () => await fetchRequest('notifications'),
  //   {
  //     onSuccess: (data) => {
  //       setNotifications(data?.data ?? []);
  //     },
  //   }
  // );
  // console.log(data);
  // const [notifications, setNotifications] = useState(data?.data ?? []);
  const url = window.location.href;
  const { data, refetch } = useQuery({
    queryKey: ['notifications data in notifications menu', url],
    queryFn: async () => await fetchRequest(`notifications`),
    onSuccess: (data) => {
      setNotifications(data?.data ?? []);
    },
  });
  // console.log('notification dataaaa', data);
  const [notifications, setNotifications] = useState(data?.data ?? []);

  // handle mark all as read
  const markAllAsReadMutation = useMutation(patchRequest);
  const markAllAsRead = async () => {
    try {
      await markAllAsReadMutation.mutateAsync({
        endPoint: 'notifications/mark-all-as-read',
        newSettings: {
          // read_flag: true,
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
        endPoint: `notifications/mark-as-read`,
        newSettings: {
          // read_flag: false,
          id: id,
        },
      });
      refetch();
    } catch (error) {
      console.error('Failed to notification as read:', error);
    }
  };

  // handle hide notification
  const hideNotification = useMutation(
    (id: string) =>
      new Promise((resolve, reject) => {
        patchRequest({
          endPoint: `notifications/hide`,
          newSettings: { id: id },
        })
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
    // description: string;
    community_name: string;
    unread_flag: boolean;
    hidden_flag: boolean;
    type:
      | 'upvotes_posts'
      | 'upvotes_comments'
      | 'comments'
      | 'replies'
      | 'new_followers'
      | 'invitations'
      | 'private_messages'
      | 'mentions'
      | 'chat_messages'
      | 'chat_requests';
    profile_picture: string;
    is_in_community: boolean;
  };

  const generateNotificationDescription = (
    notification: Notification
  ): string => {
    let description = '';
    const communityPart = notification.is_in_community
      ? ` in r/${notification.community_name}`
      : '.';
    switch (notification.type) {
      case 'upvotes_posts':
        description = `${notification.sending_user_username} upvoted your post${communityPart}`;
        break;
      case 'upvotes_comments':
        description = `${notification.sending_user_username} upvoted your comment${communityPart}`;
        break;
      case 'comments':
        description = `${notification.sending_user_username} commented on your post${communityPart}`;
        break;
      case 'replies':
        description = notification.comment_id
          ? `${notification.sending_user_username} replied to your comment${communityPart}`
          : `${notification.sending_user_username} replied to your post${communityPart}`;
        break;
      case 'new_followers':
        description = `${notification.sending_user_username} started following you`;
        break;
      case 'invitations':
        description = `${notification.sending_user_username} invited you to be a moderator of r/${notification.community_name}`;
        break;
      case 'private_messages':
        description = `${notification.sending_user_username} sent you a private message`;
        break;
      case 'mentions':
        description = `${notification.sending_user_username} mentioned you in a post${communityPart}`;
        break;
      case 'chat_messages':
        description = `${notification.sending_user_username} sent you a message in a chat`;
        break;
      case 'chat_requests':
        description = `${notification.sending_user_username} sent you a chat request`;
        break;
      default:
        description = '';
    }
    return description;
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
            {notification.is_in_community ? (
              <div className='min-w-10'>
                {notification.profile_picture && (
                  <Avatar
                    size='sm'
                    variant='circular'
                    alt={notification.profile_picture}
                    src={notification.profile_picture}
                  />
                )}
                {!notification.profile_picture && <CommunityIcon />}
              </div>
            ) : (
              <div className='min-w-10'>
                <Avatar
                  size='sm'
                  variant='circular'
                  alt={notification.profile_picture}
                  src={
                    notification.profile_picture ||
                    'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
                  }
                />
              </div>
            )}
          </ListItemPrefix>
          <div>
            <div className='flex items-center gap-2'>
              {notification.is_in_community && (
                <Typography variant='small' color='blue-gray'>
                  r/ {notification.community_name}
                </Typography>
              )}
              {!notification.is_in_community && (
                <Typography variant='small' color='blue-gray'>
                  u/ {notification.sending_user_username}
                </Typography>
              )}
              <Typography variant='paragraph' className='text-xs text-gray-600'>
                {getTimeDifference(notification.created_at)}
              </Typography>
            </div>
            <p className='font-normal text-xs text-gray-600 line-clamp-2 overflow-hidden text-ellipsis'>
              {generateNotificationDescription(notification)}
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
