import Navbar from './components/Navbar';
import Edited from './Edited';
import Removed from './Removed';
import Unmoderated from './Unmoderated';
const Main = (props: { page: string }) => {
  return (
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
  );
};

export default Main;
