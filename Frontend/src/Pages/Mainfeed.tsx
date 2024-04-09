import { Card, CardBody } from '@material-tailwind/react';
import SideBar from '../Components/SideBar';
import { PopularCommunities } from '../Components/RightSideBar/PopularCommunities';
import { RecentPosts } from '../Components/RightSideBar/RecentPosts';
import PostsListings from '../Components/PostsListings';

const Mainfeed = () => {
  return (
    <>
      <div className='flex '>
        <div className='lg-max:hidden border-r'>
          <SideBar />
        </div>
        <div className='lg-max:block grid mx-5 grid-col-1 lg:grid-cols-16 gap-6 flex-grow'>
          <Card className='shadow-none col-span-11'>
            <CardBody className='px-0 h-[calc(100vh-3.5rem)] overflow-auto'>
              <PostsListings />
            </CardBody>
          </Card>
          <Card className='lg-max:hidden shadow-none col-span-5'>
            <CardBody className='space-y-4 px-0 overflow-auto h-[calc(100vh-3.5rem)]'>
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
