import { Card, CardBody } from '@material-tailwind/react';
import SideBar from '../Components/SideBar';
import { PopularCommunities } from '../Components/RightSideBar/PopularCommunities';
import { RecentPosts } from '../Components/RightSideBar/RecentPosts';
import PostsListings from '../Components/Posts/PostsListings';

const Mainfeed = () => {
  return (
    <>
      <div className='mx-8 grid grid-col-1 lg:grid-cols-16 gap-6'>
        <div className='lg-max:hidden col-span-3'>
          <SideBar />
        </div>
        <Card className='shadow-none col-span-9'>
          <CardBody className='px-0 h-[calc(100vh-3.5rem)] overflow-auto'>
            <PostsListings />
          </CardBody>
        </Card>
        <Card className='lg-max:hidden shadow-none col-span-4'>
          <CardBody className='space-y-4 px-0 overflow-auto h-[calc(100vh-3.5rem)]'>
            <RecentPosts />
            <PopularCommunities />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Mainfeed;
