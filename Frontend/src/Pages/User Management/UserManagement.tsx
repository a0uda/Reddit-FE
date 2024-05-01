import Navbar from './components/Navbar';
import Banned from './Banned';
import Contributors from './Contributors';
import Moderators from './Moderators';
import Muted from './Muted';

const UserManagement = (props: { page: string }) => {
  return (
    <div className='px-32 py-8'>
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
  );
};

export default UserManagement;
