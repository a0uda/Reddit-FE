import { Avatar, Typography } from '@material-tailwind/react';

import { cn } from '../../utils/helper_functions';
import newChat from '../../assets/newChat.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import { useEffect } from 'react';

type SocketMessageType = {
  createdAt: string;
  message: string;
  receiverId: string;
  removed: {
    flag: boolean;
  };
  reported: {
    flag: boolean;
    reason: null | string;
  };
  senderId: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

type UserChatSidebar = {
  _id: string;
  otherUsername: string;
  lastMessageSender: string;
  lastMessageText: string;
  lastMessageTimestamp: string;
  otherProfilePicture: string;
};

const SideBar = ({
  newMessage,
  className,
}: {
  newMessage: SocketMessageType | undefined;
  className?: string;
}) => {
  // const chats = [
  //   {
  //     content: "Hey, how's it going?",
  //     created_at: '2024-05-03T14:23:00',
  //     profilePicture: 'https://example.com/images/user1.jpg',
  //     username: 'User1',
  //   },
  //   {
  //     content: 'Pretty good, thanks! What about you?',
  //     created_at: '2024-05-03T14:24:00',
  //     profilePicture: 'https://example.com/images/user2.jpg',
  //     username: 'User2',
  //   },
  //   {
  //     content:
  //       'Just got back from a hike, feeling great asdasdasdfafgefgadfafsdf!',
  //     created_at: '2024-05-03T14:25:00',
  //     profilePicture: 'https://example.com/images/user3.jpg',
  //     username: 'User3',
  //   },
  // ];
  // const [response, setResponse] = useState<UserChatSidebar[]>([]);
  const { data, refetch } = useQuery(
    'chatsSidebar',
    () => fetchRequest('chats/')
    // {
    //   onSuccess: (data) => {
    //     setResponse(data?.data);
    //   },
    // }
  );
  const navigate = useNavigate();
  const username = useParams();
  console.log(username);

  useEffect(() => {
    if (newMessage) {
      refetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  return (
    <>
      <div
        className={cn(
          'h-[calc(100vh - var(--navbar-height))]  shadow-none border-r w-52 md:w-80',
          className
        )}
        // style={{ scrollbarWidth: 'none' }} // Hide scrollbar
      >
        <div className='flex justify-between items-center p-3 h-14'>
          <Typography variant='h5'>Chats</Typography>
          <div
            onClick={() => {
              navigate('/chat/create');
            }}
            className=' cursor-pointer p-2 rounded-full hover:bg-gray-200'
          >
            <img src={newChat} alt='new chat' className='w-5 h-5' />
          </div>
        </div>
        <div
          className='overflow-y-auto'
          style={{ height: 'calc(100vh - var(--navbar-height) - 3.5rem)' }}
        >
          {data?.data.map((chat: UserChatSidebar) => (
            <ChatItem
              lastMessage={chat}
              key={chat.lastMessageTimestamp}
              // isSelected={username == chat.username.toLowerCase()}
            />
          ))}
        </div>
      </div>
    </>
  );
};

type ListItemProps = {
  lastMessage: UserChatSidebar;
};

const ChatItem = ({ lastMessage }: ListItemProps) => {
  const navigate = useNavigate();
  const { username } = useParams();
  console.log(username, lastMessage.lastMessageSender, 'hiii');

  return (
    <div
      className={`p-3 flex gap-1 items-center  cursor-pointer hover:bg-gray-200  overflow-hidden whitespace-nowrap text-ellipsis w-full ${username == lastMessage.lastMessageSender && 'bg-gray-200'} `}
      onClick={() => {
        navigate(
          `/chat/u/${
            lastMessage.lastMessageSender == 'You'
              ? lastMessage.otherUsername
              : lastMessage.lastMessageSender
          }`
        );
      }}
    >
      <Avatar
        variant='circular'
        // alt={name}
        src={
          lastMessage.otherProfilePicture ||
          'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
        }
        style={{ width: '30px', height: '30px' }}
      />
      <div className=' w-[88%] items-center justify-center '>
        <div className='flex justify-between w-full '>
          <Typography className='text-xs font-semibold'>
            {lastMessage.lastMessageSender == 'You'
              ? lastMessage.otherUsername
              : lastMessage.lastMessageSender}
          </Typography>
          <Typography className='text-xs '>
            {`${new Date(lastMessage.lastMessageTimestamp).toLocaleDateString()}`}
          </Typography>
        </div>
        <Typography className='text-xs flex-1 overflow-hidden whitespace-nowrap text-ellipsis'>
          <strong className='font-semibold'>
            {lastMessage.lastMessageSender + ': '}{' '}
          </strong>
          {lastMessage.lastMessageText}
        </Typography>
      </div>
    </div>
  );
};

export default SideBar;
