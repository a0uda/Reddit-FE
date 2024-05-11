import SideBar from './Sidebar';
import CreateChat from './CreateChat';
import { useSocketContext } from '../../Providers/SocketProvider';
import { useEffect, useState } from 'react';
import Chat from './Chat';
import { Socket } from 'socket.io-client';

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
type SocketContextType = {
  socket: Socket | undefined;
};

// interface User {
//   _id: string;
//   username: string;
//   profile_picture: string;
// }

// interface MessageStatus {
//   flag: boolean;
//   reason: string | null;
// }

// interface Message {
//   reported: MessageStatus;
//   removed: MessageStatus;
//   _id: string;
//   senderId: User;
//   receiverId: User;
//   message: string;
//   createdAt: string; // ISO 8601 date-time format
//   updatedAt: string; // ISO 8601 date-time format
//   __v: number; // version field, commonly used in MongoDB
// }
const ChatMain = ({ page }: { page: 'create' | 'chat' }) => {
  const { socket } = useSocketContext() as SocketContextType;
  const [newMessage, setNewMessage] = useState<SocketMessageType>();

  useEffect(() => {
    socket?.on('newMessage', (newMessage: SocketMessageType) => {
      // newMessage.shouldShake = true;
      console.log(newMessage, 'messfromabdo');
      setNewMessage(newMessage);
    });

    // return () => socket?.off('newMessage');
  }, [socket]);
  return (
    <div className='flex'>
      <SideBar newMessage={newMessage} />
      {page == 'create' ? <CreateChat /> : <Chat newMessage={newMessage} />}
    </div>
  );
};

export default ChatMain;
