import SideBar from '../Components/SideBar';
import { PopularCommunities } from '../Components/RightSideBar/PopularCommunities';
// import { RecentPosts } from '../Components/RightSideBar/RecentPosts';

const Mainfeed = () => {
  return (
    <>
      <div className='grid grid-col-1 lg:grid-cols-4'>
        <SideBar />
        <div>
          <h1>Mainfeed</h1>
        </div>
        <div></div>
        {/* <div className='py-5'>
          <RecentPosts />
        </div> */}
        <div className='py-5'>
          <PopularCommunities />
        </div>
      </div>
    </>
  );
};

export default Mainfeed;
