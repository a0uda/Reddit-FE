import { Card, CardBody } from '@material-tailwind/react';
import Post from '../Components/Post';
import SideBar from '../Components/SideBar';
import { PopularCommunities } from '../Components/RightSideBar/PopularCommunities';
import { RecentPosts } from '../Components/RightSideBar/RecentPosts';
import SortOptions from '../Components/SortOptions';

const Mainfeed = () => {
  return (
    <>
      <div className='mx-16 grid grid-col-1 lg:grid-cols-16 gap-6'>
        <SideBar className='col-span-3' />
        <Card className='shadow-none col-span-9'>
          <CardBody className='px-0 h-full overflow-auto'>
            {/* Sort by dropdown */}
            <SortOptions />
            <hr className='border-neutral-muted' />
            <Post />
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
