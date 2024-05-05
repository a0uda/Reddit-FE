import { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../../Components/Input';
import { Avatar } from '@material-tailwind/react';

interface Message {
  id: number;
  content: string;
  author: string;
}
interface UserChatting {
  _id: '66314d36c16d394bc516c17f';
  otherUsername: 'Dayana.Buckridge';
  lastMessageSender: 'Dayana.Buckridge';
  lastMessageText: 'Conqueror cetera adsuesco arma communis vita.';
  lastMessageTimestamp: '2024-04-30T19:57:35.732Z';
}

function Chat(props: { userChatting: UserChatting }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [msg, setMsg] = useState('');
  const FetchMessages = async () => {
    try {
      const res = await axios.get(
        `${process.env.VITE_BASE_URL}chats/${props.userChatting.otherUsername}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setMessages(res.data);
      console.log(res.data, 'resss');
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
  useEffect(() => {
    FetchMessages();
  }, []);
  function handlesend(e: any) {
    e.preventDefault();
    console.log('Sssssssssssssssss', msg);
  }
  return (
    <div className='grid grid-cols-1 xl:grid-cols-layout h-[500px]'>
      <div className='hidden xl:block'></div>
      <div className='container pt-4 flex flex-col h-full'>
        <div className='border-b'> "props.userChatting.otherUsername"</div>

        <div className='flex-grow overflow-y-auto'>
          <div className='overflow-y-auto h-[70vh] mt-16'>
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
                <div>"props.userChatting.otherUsername"</div>
              </div>
              {messages.map((message, index) => (
                <div key={index}>
                  {index === 0 ||
                  messages[index - 1].author !== message.author ? (
                    <div className='font-bold'>
                      <Avatar
                        variant='circular'
                        alt='https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'
                        src='https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'
                        style={{ width: '25px', height: '25px' }}
                        className='ms-2'
                      />
                      {message.author}
                    </div>
                  ) : null}{' '}
                  <div className='ms-10'>{message.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handlesend}>
            <Input
              type='text'
              placeholder='Message'
              style={{ backgroundColor: '#DCDCDC' }}
              NoCheck={true}
              onChange={(e) => setMsg(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
