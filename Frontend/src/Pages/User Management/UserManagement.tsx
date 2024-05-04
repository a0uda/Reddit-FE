import Navbar from './components/Navbar';
import Banned from './Banned';
import Contributors from './Contributors';
import Moderators from './Moderators';
import Muted from './Muted';
import ModSideBar from '../Rules and Removal reasons/ModSidebar';
import { useParams } from 'react-router-dom';

const UserManagement = (props: { page: string }) => {
  const { community_name } = useParams();
  return (
    <div className='Container'>
      <div className='text-blue-light ps-4 ms-4 mt-4 font-bold border-b-2 pb-2 '>
        <span className='border rounded-full bg-blue-light text-white ps-1 pe-1 me-2'>
          r/
        </span>{' '}
        R/ {community_name}
        <span className='text-black ms-2 uppercase'>{' / ' + props.page}</span>
      </div>
      <div className='grid grid-col-1 xl:grid-cols-layout'>
        <div className='hidden xl:block'>
          <ModSideBar className='sticky top-[var(--navbar-height)]' />
        </div>
        <div className='p-5'>
          <Navbar page={props.page} />
          {props.page == 'approved' ? (
            <Contributors />
          ) : props.page == 'moderators' ? (
            <Moderators />
          ) : props.page == 'banned' ? (
            <Banned />
          ) : props.page == 'muted' ? (
            <Muted />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
