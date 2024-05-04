import { Avatar, Typography } from '@material-tailwind/react';

import { cn } from '../../utils/helper_functions';
import newChat from '../../assets/newChat.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
type ChatItemType = {
  _id: string;
  otherUsername: string;
  lastMessageSender: string;
  lastMessageText: string;
  lastMessageTimestamp: string;
  otherProfilePicture: string;
};
const SideBar = ({ className }: { className?: string }) => {
  const chats = [
    {
      content: "Hey, how's it going?",
      created_at: '2024-05-03T14:23:00',
      profilePicture: 'https://example.com/images/user1.jpg',
      username: 'User1',
    },
    {
      content: 'Pretty good, thanks! What about you?',
      created_at: '2024-05-03T14:24:00',
      profilePicture: 'https://example.com/images/user2.jpg',
      username: 'User2',
    },
    {
      content:
        'Just got back from a hike, feeling great asdasdasdfafgefgadfafsdf!',
      created_at: '2024-05-03T14:25:00',
      profilePicture: 'https://example.com/images/user3.jpg',
      username: 'User3',
    },
  ];

  const { data, isLoading, isError } = useQuery('chatsSidebar', () =>
    fetchRequest('chats/')
  );
  const navigate = useNavigate();
  const username = useParams();
  console.log(username);

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
        {data?.data.map((chat: ChatItemType, i) => (
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
  lastMessage: ChatItemType;
};

const ChatItem = ({ lastMessage }: ListItemProps) => {
  const navigate = useNavigate();
  const { username } = useParams();
  console.log(username, lastMessage.lastMessageSender, 'hiii');

  return (
    <div
      className={`p-3 flex gap-1 items-center cursor-pointer hover:bg-gray-200  w-[320px] ${username == lastMessage.lastMessageSender && 'bg-gray-200'} `}
      onClick={() => {
        navigate(`/chat/u/${lastMessage.lastMessageSender}`);
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
            {lastMessage.lastMessageSender}
          </Typography>
          <Typography className='text-xs'>
            {`${new Date(lastMessage.lastMessageTimestamp).toDateString()}`}
          </Typography>
        </div>
        <Typography className='text-xs w-[16.5rem] overflow-hidden whitespace-nowrap text-ellipsis'>
          {lastMessage.lastMessageText}
        </Typography>
      </div>
    </div>
  );
};

export default SideBar;
