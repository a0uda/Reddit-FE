import SideBar from './Sidebar';
import CreateChat from './CreateChat';

const ChatMain = ({ page }: { page: 'create' | 'chat' }) => {
  return (
    <div className='flex'>
      <SideBar  />
      {page == 'create' ? <CreateChat /> : <></>}
    </div>
  );
};

export default ChatMain;
