import { useEffect, useState } from 'react';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { getTimeDifference } from '../utils/helper_functions';
import { CommunityIcon } from '../assets/icons/Icons';
// import { Link } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import { useQuery, useMutation } from 'react-query';
import { fetchRequest, patchRequest } from './../API/User';
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Card,
  CardBody,
} from '@material-tailwind/react';

const Notifications = () => {
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
            <div className='flex items-center gap-2 '>
              <Typography variant='small' color='blue-gray'>
                {notification.community_name}
              </Typography>
              <Typography variant='paragraph' className='text-xs text-gray-600'>
                {getTimeDifference(notification.created_at)}
              </Typography>
            </div>
            <p className='font-normal text-xs text-gray-600 line-clamp-1 overflow-hidden text-ellipsis flex-grow '>
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
    console.log(notifications);

    console.log(today);
  }, [notifications]);

  //   const unreadNotifications = notifications.filter(
  //     (notification: Notification) => notification.unread_flag
  //   );
  return (
    <>
      <div className=' flex'>
        <div
          className={'lg-max:hidden border-r'}
          style={{ scrollbarWidth: 'none' }} // Hide scrollbar
        >
          <SideBar />
        </div>
        <div className=' grid mx-5 grid-col-1 lg:grid-cols-16 gap-6'>
          <Card className='shadow-none col-span-11'>
            <Typography variant='h4' className='text-black py-5 mb-3'>
              Notifications
            </Typography>
            <CardBody className='p-0 h-[calc(100vh-3.5rem)] overflow-auto'>
              <List className='p-0 text-foreground w-full'>
                <ListItem className='p-0 flex gap-2 items-center justify-around hover:bg-transparent focus:bg-transparent  w-min'>
                  <Button
                    variant='text'
                    className='text-gray-700 hover:bg-transparent p-0 text-sm'
                  >
                    Notifications
                  </Button>
                  <a href='/message/messages'>
                    <Button
                      variant='text'
                      className='text-gray-600 hover:bg-transparent py-0 text-sm'
                    >
                      {/* // TODO: update the link after creating the messages page */}
                      Messages
                    </Button>
                  </a>
                </ListItem>
                <div className='bg-blue w-20 h-1 rounded-full' />
                {notifications.length > 0 ? (
                  <>
                    <div className='flex items-center justify-between py-1 pr-4'>
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
                    <div className='flex items-center justify-between py-1'>
                      <Typography
                        variant='small'
                        className='text-neutral-900 uppercase font-medium'
                      >
                        Earlier
                      </Typography>
                    </div>
                    {renderNotificationItems(earlier)}
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
            </CardBody>
          </Card>
          <Card className='lg-max:hidden shadow-none col-span-5'>
            <CardBody className='space-y-4 px-0 overflow-auto h-[calc(100vh-3.5rem)]'>
              <div></div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Notifications;
