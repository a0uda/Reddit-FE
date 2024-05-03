import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../../Components/Input';

interface Message {
  id: number;
  content: string;
  author: string;
}
// {
//     "reported": {
//       "flag": false,
//       "reason": "Copyright violation"
//     },
//     "removed": {
//       "flag": true
//     },
//     "_id": "66314d30c16d394bc516c01c",
//     "senderId": "662fe6dead2ab3b4e6cccafc",
//     "receiverId": "662fc24f9584d8f0826737c5",
//     "message": "Molestiae tantum trepide blandior turpis cupiditas depraedor.",
//     "createdAt": "2024-04-30T19:57:35.748Z",
//     "__v": 0,
//     "updatedAt": "2024-04-30T19:57:36.333Z"
//   },

const Chat: React.FC = () => {
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
  ]);

  //   useEffect(() => {

  //     fetchMessages();
  //   }, []);

  //   const fetchMessages = async () => {
  //     try {
  //       const response = await axios.get<Message[]>('/api/messages');
  //       setMessages(response.data);
  //     } catch (error) {
  //       console.error('Error fetching messages:', error);
  //     }
  //   };

  return (
    <div>
      {/* <h1>Chat Page</h1>
      <div>
        {messages.map((message, index) => (
          <div key={message.id}>
            {index === 0 || messages[index - 1].author !== message.author ? (
              <strong>{message.author}:</strong>
            ) : null}{' '}
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          rows={3}
          cols={50}
          placeholder='Type your message here...'
        />
        <br />
      </div> */}
      <div className='grid grid-col-1 xl:grid-cols-layout h-screen'>
        <div className='hidden xl:block'></div>
        <div className='container mt-4 flex flex-col'>
          <div className='border-b'> "Username"</div>
          <div className='flex justify-center mt-20'>USERNAME</div>
          <div className='flex-grow flex flex-col-reverse'>
            <Input
              type='text'
              placeholder='Message'
              style={{ backgroundColor: '#DCDCDC' }}
            />
            <div className='overflow-y-auto max-h-[70vh]'>
              <div className='h-full'>
                {' '}
                {/* Ensure the wrapper fills the available height */}
                {messages.map((message, index) => (
                  <div key={message.id}>
                    {index === 0 ||
                    messages[index - 1].author !== message.author ? (
                      <strong>{message.author}</strong>
                    ) : null}{' '}
                    <div>{message.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
