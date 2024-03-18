import { Card, CardBody } from '@material-tailwind/react';
import Post from '../components/Post';
import SideBar from '../components/SideBar';

const Mainfeed = () => {
  return (
    <>
      <div className='mx-16 grid grid-col-1 lg:grid-cols-16 gap-6'>
        <SideBar className='col-span-3' />
        <Card className='shadow-none col-span-9'>
          <CardBody className='h-full'>
            <h1 className='text-5xl border-b-2'>Mainfeed</h1>
            <Post />
          </CardBody>
        </Card>
        <Card className='lg-max:hidden shadow-none col-span-4'>
          <CardBody>
            <h1>SideBar</h1>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Mainfeed;
