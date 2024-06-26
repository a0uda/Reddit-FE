import { Avatar, Card, CardBody } from '@material-tailwind/react';
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
import LoadingProvider from '../../Components/LoadingProvider';

const NavButton = (props: {
  active?: boolean | undefined;
  buttonName: string;
  buttonLink: string;
  username?: string;
  textSize: string;
}) => {
  return (
    <Link
      to={`/u/${props.username}/${props.buttonLink}`}
      className={`${props.active ? 'bg-neutral-500' : ''}  text-black font-semibold rounded-full py-[10px] px-2 hover:underline`}
    >
      <div className={`text-black ${props.textSize}`}>{props.buttonName}</div>
    </Link>
  );
};

const SubNavBar = (props: {
  buttonArray: string[];
  active: string | undefined;
  username?: string;
  textSize: string;
}) => {
  const pagesArray = [
    'overview',
    'posts',
    'comments',
    'saved',
    'hidden',
    'upvoted',
    'downvoted',
    'history',
  ];
  return (
    <div className='flex gap-3 mb-2 overflow-x-auto w-0 min-w-full'>
      {props.buttonArray.map((butt, i) => (
        <NavButton
          key={`${i}${butt}`}
          active={props.active == pagesArray[i]}
          buttonName={butt}
          buttonLink={pagesArray[i]}
          username={props.username}
          textSize={props.textSize}
        />
      ))}
    </div>
  );
};
function User() {
  const { user } = useSession();

  const { page, username } = useParams();

  const [response, setResponse] = useState<AboutType>();
  const [myData, setMyData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchReq = useMutation(fetchRequest);
  useEffect(() => {
    if (user?.username) {
      setIsLoading(true);
      fetchReq.mutate(`users/about/${username}`, {
        onSuccess: (data) => {
          setIsLoading(false);
          setResponse(data?.data);
          if (user?.username == username) {
            setMyData(true);
          }
        },
        onError: () => {
          setIsLoading(false); // Set loading state to false on error
          setError(true); // Set error state
        },
      });
    }
  }, [user?.username]);
  const display_name = response?.display_name ?? '';
  const profile_picture = response?.profile_picture ?? '';

  return (
    <>
      <LoadingProvider error={error} isLoading={isLoading}>
        <ContentLayout>
          <ContentLayout.Main>
            <Card className='shadow-none mx-1 ml-3'>
              <CardBody className='px-0'>
                <div className='flex gap-2 mb-7'>
                  <div className='flex flex-col relative '>
                    <Avatar
                      src={
                        profile_picture ||
                        'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
                      }
                      alt={username + "'s Profile"}
                      variant='circular'
                      size='sm'
                      className='w-[70px] h-[70px] object-cover rounded-full mx-2'
                    />
                    {/* <img
                    src={profile_picture}
                    alt='card-image'
                    className='w-[70px] h-[70px] object-cover rounded-full'
                  /> */}
                    {myData ? (
                      <div className='absolute bottom-0 right-0 '>
                        <Link
                          to={`/settings/profile`}
                          className='flex rounded-full border text-xs bg-white'
                        >
                          <div className=' text-black p-1'>
                            <PlusCircleIcon
                              strokeWidth={2.5}
                              className='h-4 w-4'
                            />
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className='text-2xl text-black font-semibold'>
                    {display_name}
                    <div className='text-base text-neutral-900'>{username}</div>
                  </div>
                </div>
                {myData ? (
                  <>
                    <div className=''>
                      <SubNavBar
                        buttonArray={[
                          'Overview',
                          'Posts',
                          'Comments',
                          'Saved',
                          'Hidden',
                          'Upvoted',
                          'Downvoted',
                          'History',
                        ]}
                        active={page}
                        username={username}
                        textSize='text-sm'
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
                    ) : page == 'history' ? (
                      <UserContent
                        endpoint='users/history-posts'
                        queryName='history'
                      />
                    ) : (
                      <UserContent
                        endpoint='users/downvoted-posts'
                        queryName='downvoted'
                      />
                    )}
                  </>
                ) : (
                  <>
                    <div className='overflow-auto'>
                      <SubNavBar
                        buttonArray={['Overview', 'Posts', 'Comments']}
                        active={page}
                        username={username}
                        textSize='text-sm'
                      />
                    </div>

                    {page == 'overview' ? (
                      <Overview />
                    ) : page == 'posts' ? (
                      <Posts />
                    ) : (
                      <Comments />
                    )}
                  </>
                )}
              </CardBody>
            </Card>
          </ContentLayout.Main>
          <ContentLayout.RightSideBar>
            <UserRightSideBar />
          </ContentLayout.RightSideBar>
        </ContentLayout>
      </LoadingProvider>
    </>
  );
}

export default User;
