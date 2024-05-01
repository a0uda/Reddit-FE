import { useParams } from 'react-router-dom';
import ModSideBar from '../Rules and Removal reasons/ModSidebar';
import Navbar from './components/Navbar';
import Edited from './Edited';
import Removed from './Removed';
import Unmoderated from './Unmoderated';
const Main = (props: { page: string }) => {
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
          <ModSideBar />
        </div>
        <div className='px-32 py-8'>
          <Navbar page={props.page} />
          {props.page == 'removed' ? (
            <Removed />
          ) : props.page == 'unmoderated' ? (
            <Unmoderated />
          ) : props.page == 'edited' ? (
            <Edited />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
