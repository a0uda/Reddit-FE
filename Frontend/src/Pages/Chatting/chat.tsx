import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../../Components/Input';
import { Avatar } from '@material-tailwind/react';

interface Message {
  id: number;
  content: string;
  author: string;
}

const Chat: React.FC = () => {
  const userChatting = {
    _id: '66314d36c16d394bc516c17f',
    otherUsername: 'Dayana.Buckridge',
    lastMessageSender: 'Dayana.Buckridge',
    lastMessageText: 'Conqueror cetera adsuesco arma communis vita.',
    lastMessageTimestamp: '2024-04-30T19:57:35.732Z',
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1223,
      content: 'set',
      author: 'username1',
    },
    {
      id: 123,
      content: 'set2',
      author: 'username1',
    },
    {
      id: 123,
      content: 'set2',
      author: 'username2',
    },
    {
      id: 123,
      content: 'set2',
      author: 'username2',
    },
    {
      id: 123,
      content: 'set2',
      author: 'username2',
    },
    {
      id: 123,
      content: 'set2',
      author: 'username2',
    },
    {
      id: 123,
      content: 'set2',
      author: 'username2',
    },
    {
      id: 123,
      content: 'set2',
      author: 'username2',
    },
    {
      id: 123,
      content: 'set2',
      author: 'username2',
    },
    {
      id: 123,
      content: 'set2',
      author: 'username2',
    },
    {
      id: 123,
      content: 'set2',
      author: 'username2',
    },
    {
      id: 123,
      content: 'set2',
      author: 'username2',
    },
    {
      id: 123,
      content: 'set2',
      author: 'username2',
    },
    {
      id: 1223,
      content: 'set',
      author: 'username1',
    },
    {
      id: 1223,
      content: 'set',
      author: 'username1',
    },
    {
      id: 1223,
      content: 'set',
      author: 'username1',
    },

    {
      id: 1223,
      content: 'set',
      author: 'username1',
    },
    {
      id: 1223,
      content: 'set',
      author: 'username1',
    },
    {
      id: 1223,
      content: 'set',
      author: 'username1',
    },
    {
      id: 1223,
      content: 'set',
      author: 'username1',
    },
    {
      id: 123,
      content: 'set2',
      author: 'username2',
    },
  ]);

  return (
    <div className='grid grid-cols-1 xl:grid-cols-layout h-[500px]'>
      <div className='hidden xl:block'></div>
      <div className='container pt-4 flex flex-col h-full'>
        <div className='border-b'> {userChatting.otherUsername}</div>

        <div className='flex-grow overflow-y-auto'>
          <div className='overflow-y-auto max-h-[70vh] mt-16'>
            <div className='h-full'>
              <div className='flex-grow flex flex-col justify-center items-center'>
                <div>
                  <Avatar
                    variant='circular'
                    alt='https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'
                    src='https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'
                    style={{ width: '40px', height: '40px' }}
                    className='ms-2'
                  />
                </div>
                <div>{userChatting.otherUsername}</div>
              </div>
              {messages.map((message, index) => (
                <div key={message.id}>
                  {index === 0 ||
                  messages[index - 1].author !== message.author ? (
                    <strong>
                      <Avatar
                        variant='circular'
                        alt='https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'
                        src='https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'
                        style={{ width: '25px', height: '25px' }}
                        className='ms-2'
                      />
                      {message.author}
                    </strong>
                  ) : null}{' '}
                  <div className='ms-10'>{message.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Input
            type='text'
            placeholder='Message'
            style={{ backgroundColor: '#DCDCDC' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
