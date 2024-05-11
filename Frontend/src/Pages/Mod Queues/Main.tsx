import { useParams } from 'react-router-dom';
import ModSideBar from '../Rules and Removal reasons/ModSidebar';
import Navbar from './components/Navbar';
import Edited from './Edited';
import Removed from './Removed';
import Unmoderated from './Unmoderated';
import useSession from '../../hooks/auth/useSession';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
const Main = (props: { page: string }) => {
  const { community_name } = useParams();
  const { user } = useSession();
  const [postPerm, setPostPerm] = useState(false);
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
      setPostPerm(
        perm?.has_access.everything || perm?.has_access.manage_settings
      );
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
        <div className=' md:px-32 md:py-8 p-4'>
          <Navbar page={props.page} />
          {props.page == 'removed' ? (
            <Removed page='removed' postPerm={postPerm} />
          ) : props.page == 'unmoderated' ? (
            <Unmoderated page='unmoderated' postPerm={postPerm} />
          ) : props.page == 'edited' ? (
            <Edited page='edited' postPerm={postPerm} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
