import Navbar from './components/Navbar';
import Banned from './Banned';
import Contributors from './Contributors';
import Moderators from './Moderators';
import Muted from './Muted';
import ModSideBar from '../Rules and Removal reasons/ModSidebar';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { fetchRequest } from '../../API/User';
import useSession from '../../hooks/auth/useSession';

const UserManagement = (props: { page: string }) => {
  const { community_name } = useParams();
  const { user } = useSession();
  const [userPerm, setUserPerm] = useState(false);
  useQuery({
    queryKey: ['access', community_name],
    queryFn: async () =>
      await fetchRequest(
        `communities/about/moderators-sorted/${community_name}`
      ),
    onSuccess: (data) => {
      const perm = data?.data.find(
        (moderator: { username: string }) =>
          moderator.username === user?.username
      );
      console.log(perm, 'perm');
      setUserPerm(perm?.has_access.everything || perm?.has_access.manage_users);
    },
  });

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
        <div
          style={{ maxWidth: '100%', overflowX: 'auto' }}
          className='p-5 mx-auto w-full xl:w-[1080px] xl:max-w-[calc(100vw-272px)]'
        >
          <Navbar page={props.page} />
          {props.page == 'approved' ? (
            <Contributors page={props.page} userPerm={userPerm} />
          ) : props.page == 'moderators' ? (
            <Moderators page={props.page} userPerm={userPerm} />
          ) : props.page == 'banned' ? (
            <Banned page={props.page} userPerm={userPerm} />
          ) : props.page == 'muted' ? (
            <Muted page={props.page} userPerm={userPerm} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
