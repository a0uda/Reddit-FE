import { Avatar, Typography } from '@material-tailwind/react';

import { cn } from '../../utils/helper_functions';
import newChat from '../../assets/newChat.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import { useEffect, useState } from 'react';
type UserChatSidebar = {
  _id: string;
  otherUsername: string;
  lastMessageSender: string;
  lastMessageText: string;
  lastMessageTimestamp: string;
  otherProfilePicture: string;
};

interface User {
  _id: string;
  username: string;
  profile_picture: string;
}

interface MessageStatus {
  flag: boolean;
  reason: string | null;
}

interface Message {
  reported: MessageStatus;
  removed: MessageStatus;
  _id: string;
  senderId: User;
  receiverId: User;
  message: string;
  createdAt: string; // ISO 8601 date-time format
  updatedAt: string; // ISO 8601 date-time format
  __v: number; // version field, commonly used in MongoDB
}
const SideBar = ({
  newMessage,
  className,
}: {
  newMessage: Message;
  className: string;
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
  const [response, setResponse] = useState<UserChatSidebar[]>([]);
  const { data, isLoading, isError, refetch } = useQuery(
    'chatsSidebar',
    () => fetchRequest('chats/'),
    {
      onSuccess: (data) => {
        setResponse(data.data);
      },
    }
  );
  const navigate = useNavigate();
  const username = useParams();
  console.log(username);

  useEffect(() => {
    if (newMessage) {
      refetch();
    }
  }, [newMessage]);

  return (
    <>
      <div
        className={cn(
          'h-[calc(100vh-var(--navbar-height))]  w-80 shadow-none border-r',
          className
        )}
        // style={{ scrollbarWidth: 'none' }} // Hide scrollbar
      >
        <div className='flex justify-between items-center p-3'>
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
        {data?.data.map((chat: UserChatSidebar, i) => (
          <ChatItem
            lastMessage={chat}
            key={chat.lastMessageTimestamp}
            // isSelected={username == chat.username.toLowerCase()}
          />
        ))}
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
      className={`p-3 flex gap-1 items-center cursor-pointer hover:bg-gray-200  w-[320px] ${username == lastMessage.lastMessageSender && 'bg-gray-200'} `}
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
        style={{ width: '35px', height: '35px' }}
      />
      <div className='w-72 items-center justify-center '>
        <div className='flex gap-[8.5rem] w-full'>
          <Typography className='text-xs'>
            {lastMessage.lastMessageSender == 'You'
              ? lastMessage.otherUsername
              : lastMessage.lastMessageSender}
          </Typography>
          <Typography className='text-xs'>
            {`${new Date(lastMessage.lastMessageTimestamp).toDateString()}`}
          </Typography>
        </div>
        <Typography className='text-xs w-[16.5rem] overflow-hidden whitespace-nowrap text-ellipsis'>
          {lastMessage.lastMessageSender + ': ' + lastMessage.lastMessageText}
        </Typography>
      </div>
    </div>
  );
};

export default SideBar;
