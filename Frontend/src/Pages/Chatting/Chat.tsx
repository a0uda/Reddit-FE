import { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../../Components/Input';
import { Avatar } from '@material-tailwind/react';
import { useMutation } from 'react-query';
import { postRequest } from '../../API/User';
import { useParams } from 'react-router-dom';
import useSession from '../../hooks/auth/useSession';

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

function Chat({ newMessage }: { newMessage: Message }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [msg, setMsg] = useState('');
  const postReq = useMutation(postRequest);
  const { username } = useParams();
  const { user } = useSession();

  const FetchMessages = async () => {
    try {
      const res = await axios.get(
        `${process.env.VITE_BASE_URL}chats/${username}`,
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
    setMessages([]);
    FetchMessages();
  }, [username]);
  function handlesend(e: any) {
    e.preventDefault();
    postReq.mutate(
      {
        endPoint: `chats/send/${username}`,
        data: {
          message: msg,
        },
      },
      {
        onSuccess: () => {
          const { myId, hisId } = messages.map((mess) => {
            if (mess.senderId.username == user?.username) {
              return mess.senderId, mess.receiverId;
            } else if (mess.receiverId.username == user?.username) {
              return mess.receiverId, mess.senderId;
            }
          });
          const myHisIds = messages.map((mess) => {
            if (mess.senderId.username === user?.username) {
              return { myId: mess.senderId, hisId: mess.receiverId };
            } else if (mess.receiverId.username === user.username) {
              return { myId: mess.receiverId, hisId: mess.senderId };
            } else {
              // Returning null to indicate that the condition wasn't met
              return null;
            }
          });
          const newMess: Message = {
            _id: '111',
            createdAt: new Date().toISOString(),
            message: msg,
            receiverId: myHisIds[0]?.hisId,
            senderId: myHisIds[0]?.myId,
            removed: { flag: false, reason: null },
            reported: { flag: false, reason: null },
            updatedAt: 'null',
            __v: 1,
          };
          setMsg('');

          setMessages([...messages, newMess]);
        },
      }
    );
  }

  useEffect(() => {
    if (newMessage) {
      // if(newMessage.senderId)
      let newMess: Message;
      const m = messages.find(
        (mess) => mess.senderId._id == newMessage.senderId
      );
      if (m) {
        newMess = {
          _id: newMessage._id,
          createdAt: newMessage.createdAt,
          message: newMessage.message,
          receiverId: m.receiverId,
          senderId: m.senderId,
          removed: newMessage.removed,
          reported: newMessage.reported,
          updatedAt: newMessage.updatedAt,
        };
        console.log(m, newMessage, messages, 'newmesss');
        setMessages([...messages, newMess]);
      }
    }
  }, [newMessage]);
  return (
    <div className='w-full xl:grid-cols-layout '>
      <div className='hidden xl:block'></div>
      <div className='container pt-4 flex flex-col h-full'>
        <div className='border-b'> {username}</div>

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
                <div>{username}</div>
              </div>
              {messages.map((message, index) => (
                <div key={index}>
                  {index === 0 ||
                  messages[index - 1].senderId._id !== message.senderId._id ? (
                    <div className='font-bold'>
                      <Avatar
                        variant='circular'
                        alt='https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'
                        src='https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'
                        style={{ width: '25px', height: '25px' }}
                        className='ms-2'
                      />
                      {message.senderId.username}
                    </div>
                  ) : null}{' '}
                  <div className='ms-10'>{message.message}</div>
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
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              value={msg}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
