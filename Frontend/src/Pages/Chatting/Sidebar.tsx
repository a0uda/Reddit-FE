import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react';
import {
  HomeIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
  PlusIcon,
  DocumentTextIcon,
  PhotoIcon,
  LinkIcon,
} from '@heroicons/react/24/solid';
import { ReactNode, useState } from 'react';
import { CommunityIcon } from '../../assets/icons/Icons';
import { cn } from '../../utils/helper_functions';
import newChat from '../../assets/newChat.svg';
import { useQuery } from 'react-query';
import { CommunityOverviewType, CommunityType } from '../../types/types';
import { fetchRequest } from '../../API/User';
import { useNavigate, useParams } from 'react-router-dom';

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
  const navigate = useNavigate();
  const username= useParams();
  console.log(username);

  return (
    <>
      <div
        className={cn('h-[calc(100vh-var(--navbar-height))]  w-80 shadow-none border-r', className)}
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
        {chats.map((chat: ChatType, i) => (
          <ChatItem
            lastMessage={chat}
            key={chat.created_at}
            // isSelected={username == chat.username.toLowerCase()}
          />
        ))}
      </div>
    </>
  );
};

type ChatType = {
  content: string;
  created_at: string;
  profilePicture: string;
  username: string;
};

type ListItemProps = {
  lastMessage: ChatType;
};

const ChatItem = ({ lastMessage }: ListItemProps) => {
  const navigate = useNavigate();
  const { username } = useParams();
  console.log(username, lastMessage.username, 'hiii');

  return (
    <div
      className={`p-3 flex gap-1 items-center cursor-pointer hover:bg-gray-200  w-[320px] ${username == lastMessage.username && 'bg-gray-200'} `}
      onClick={() => {
        navigate(`/chat/u/${lastMessage.username}`);
      }}
    >
      <Avatar
        variant='circular'
        alt={name}
        src={newChat}
        style={{ width: '35px', height: '35px' }}
      />
      <div className='w-72 items-center justify-center '>
        <div className='flex gap-[8.5rem] w-full'>
          <Typography className='text-xs'>{lastMessage.username}</Typography>
          <Typography className='text-xs'>
            {`${new Date(lastMessage.created_at).toDateString()}`}
          </Typography>
        </div>
        <Typography className='text-xs w-[16.5rem] overflow-hidden whitespace-nowrap text-ellipsis'>
          {lastMessage.content}
        </Typography>
      </div>
    </div>
  );
};

export default SideBar;
