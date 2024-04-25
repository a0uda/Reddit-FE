import { Card, CardBody } from '@material-tailwind/react';
import UserRightSideBar from './UserRightSideBar';
import { Link, useParams } from 'react-router-dom';
import Overview from './Overview';
import Posts from './Posts';
import Comments from './Comments';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import UserContent from './UserContent';
import { fetchRequest } from '../../API/User';
import { useMutation } from 'react-query';
import ContentLayout from '../../Components/ContentLayout';
import useSession from '../../hooks/auth/useSession';
import Saved from './Saved';
import { useEffect, useState } from 'react';
import { AboutType } from '../../types/types';

const NavButton = (props: {
  active?: boolean | undefined;
  buttonName: string;
  buttonLink: string;
  username?: string;
}) => {
  return (
    <Link
      to={`/user/${props.username}/${props.buttonLink}`}
      className={`${props.active ? 'bg-neutral-500' : ''}  text-black rounded-full p-[10px] mx-[5px]  hover:underline`}
    >
      <div className='text-black text-sm'>{props.buttonName}</div>
    </Link>
  );
};

const SubNavBar = (props: {
  buttonArray: string[];
  active: string | undefined;
  username?: string;
}) => {
  const pagesArray = [
    'overview',
    'posts',
    'comments',
    'saved',
    'hidden',
    'upvoted',
    'downvoted',
  ];
  return (
    <div className='flex mb-2'>
      {props.buttonArray.map((butt, i) => (
        <NavButton
          key={`${i}${butt}`}
          active={props.active == pagesArray[i]}
          buttonName={butt}
          buttonLink={pagesArray[i]}
          username={props.username}
        />
      ))}
    </div>
  );
};
function User() {
  const { user } = useSession();

  const { page } = useParams();

  // const { data } = useQuery('about data', () =>
  //   fetchRequest(`users/about/${user?.username}`)
  // );
  const [response, setResponse] = useState<AboutType>();

  const fetchReq = useMutation(fetchRequest);
  useEffect(() => {
    if (user?.username) {
      fetchReq.mutate(`users/about/${user?.username}`, {
        onSuccess: (data) => {
          console.log('reem', data.data);
          setResponse(data.data);
        },
      });
    }
  }, [user?.username]);
  const about = response;
  const username = about?.username ?? '';
  const display_name = about?.display_name ?? '';
  const profile_picture = about?.profile_picture ?? '';

  return (
    <>
      <ContentLayout>
        <ContentLayout.Main>
          <Card className='shadow-none'>
            <CardBody className='px-0'>
              <div className='flex gap-2 mb-7'>
                <div className='flex flex-col relative '>
                  <img
                    src={profile_picture}
                    alt='card-image'
                    className='w-[70px] h-[70px] object-cover rounded-full'
                  />
                  <div className='absolute bottom-0 right-0 '>
                    <Link
                      to={`/settings/profile`}
                      className='flex rounded-full border text-xs bg-white'
                    >
                      <div className=' text-black p-1'>
                        <PlusCircleIcon strokeWidth={2.5} className='h-4 w-4' />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className='text-2xl text-black font-semibold'>
                  {display_name}
                  <div className='text-base text-neutral-900'>{username}</div>
                </div>
              </div>
              <div className='overflow-auto'>
                <SubNavBar
                  buttonArray={[
                    'Overview',
                    'Posts',
                    'Comments',
                    'Saved',
                    'Hidden',
                    'Upvoted',
                    'Downvoted',
                  ]}
                  active={page}
                  username={user?.username}
                />
              </div>

              {page == 'overview' ? (
                <Overview />
              ) : page == 'posts' ? (
                <Posts />
              ) : page == 'comments' ? (
                <Comments />
              ) : page == 'saved' ? (
                <Saved />
              ) : page == 'hidden' ? (
                <UserContent
                  endpoint='users/hidden-and-reported-posts'
                  queryName='hidden'
                />
              ) : page == 'upvoted' ? (
                <UserContent
                  endpoint='users/upvoted-posts'
                  queryName='upvoted'
                />
              ) : (
                <UserContent
                  endpoint='users/downvoted-posts'
                  queryName='downvoted'
                />
              )}
            </CardBody>
          </Card>
        </ContentLayout.Main>
        <ContentLayout.RightSideBar>
          <UserRightSideBar />
        </ContentLayout.RightSideBar>
      </ContentLayout>
    </>
  );
}

export default User;
