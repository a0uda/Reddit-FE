import { Card, CardBody } from '@material-tailwind/react';
import SideBar from '../Components/SideBar';
import { PopularCommunities } from '../Components/RightSideBar/PopularCommunities';
import { RecentPosts } from '../Components/RightSideBar/RecentPosts';
import PostsListings from '../Components/Posts/PostsListings';

const Mainfeed = () => {
  return (
    <>
      <div className='mx-8 grid grid-col-1 lg:grid-cols-layout gap-6'>
        <div className='lg-max:hidden'>
          <SideBar className='sticky top-[var(--navbar-height)] ' />
        </div>
        <div className='flex justify-center px-10 gap-6'>
          <Card className='shadow-none w-full overflow-auto'>
            <CardBody className='px-0'>
              <PostsListings />
            </CardBody>
          </Card>
          <Card className='lg-max:hidden shadow-none w-80 min-w-80'>
            <CardBody className='sticky top-[var(--navbar-height)] space-y-4 px-0 overflow-auto h-[calc(100vh-var(--navbar-height))]'>
              <RecentPosts />
              <PopularCommunities />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Mainfeed;
