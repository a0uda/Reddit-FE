import SideBar from './Sidebar';
import CreateChat from './CreateChat';
import { useSocketContext } from '../../Providers/SocketProvider';
import { useEffect } from 'react';
import Chat from './Chat';
interface UserChatting {
  _id: string;
  otherUsername: string;
  lastMessageSender: string;
  lastMessageText: string;
  lastMessageTimestamp: string;
}
const ChatMain = ({ page }: { page: 'create' | 'chat' }) => {
  const { socket } = useSocketContext();
  const ahmed: UserChatting = {
    _id: '66314d36c16d394bc516c17f',
    otherUsername: 'reem',
    lastMessageSender: 'reem',
    lastMessageText: 'Conqueror cetera adsuesco arma communis vita.',
    lastMessageTimestamp: '2024-04-30T19:57:35.732Z',
  };
  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      newMessage.shouldShake = true;
      console.log(newMessage,'messfromabdo');
    });

    return () => socket?.off('newMessage');
  }, [socket]);
  return (
    <div className='flex'>
      <SideBar />
      {page == 'create' ? <CreateChat /> : <Chat />}
    </div>
  );
};

export default ChatMain;
