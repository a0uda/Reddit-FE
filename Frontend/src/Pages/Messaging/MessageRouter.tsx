import { Route, Routes } from 'react-router-dom';
import { MessagingNavbar } from './MessagingNavbar';
import Compose from './Compose';
import Inbox from './Inbox';
import Sent from './Sent';
import Unread from './Unread';
import Messages from './Messages';
import Selfreply from './Selfreply';
import Mentions from './Mentions';

const MessageRouter = () => {
  return (
    <>
      <MessagingNavbar />
      <Routes>
        <Route path='compose' element={<Compose />} />
        <Route path='inbox' element={<Inbox />} />
        <Route path='sent' element={<Sent />} />
        <Route path='unread' element={<Unread />} />
        <Route path='messages' element={<Messages />} />
        <Route path='selfreply' element={<Selfreply />} />
        <Route path='mentions' element={<Mentions />} />
      </Routes>
    </>
  );
};

export default MessageRouter;
