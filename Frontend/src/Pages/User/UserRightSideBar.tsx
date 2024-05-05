import { useEffect, useState } from 'react';
import RoundedButton from '../../Components/RoundedButton';
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import {
  PlusCircleIcon,
  PlusIcon,
  ShieldCheckIcon,
  MinusCircleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import SidebarSection from './Containers/SidebarSection';
import CommunityItem from '../../Components/RightSideBar/CommunityItem';
import { Link, useNavigate, useParams } from 'react-router-dom';
import facebookIcon from '../../assets/facebookIcon.svg';
import instagramIcon from '../../assets/instagramIcon.svg';
import { useMutation } from 'react-query';
import { fetchRequest, postRequest } from '../../API/User';
import { AboutType, ModeratedCommunity, SocialLink } from '../../types/types';
import useSession from '../../hooks/auth/useSession';
import UserOptions from './Containers/UserOptions';

function UserRightSideBar() {
  const { user } = useSession();
  const [aboutData, setAboutData] = useState<AboutType | undefined>();
  const { username } = useParams();
  const [myData, setMyData] = useState(false);
  const [moderatedCommunities, setModeratedCommunities] = useState<
    ModeratedCommunity[]
  >([]);
  const fetchReq = useMutation(fetchRequest);
  const [joinStates, setJoinStates] = useState(() => {
    if (moderatedCommunities) {
      return moderatedCommunities.map(() => true);
    } else {
      return [];
    }
  });
  const [followState, setFollowState] = useState(false);
  useEffect(() => {
    console.log('reemtasneem', user?.username);
    if (user?.username) {
      fetchReq.mutate(`users/about/${username}`, {
        onSuccess: (data) => {
          console.log('reemn', data.data);
          setAboutData(data.data);
          setModeratedCommunities(data.data.moderatedCommunities);
          if (data.data.moderatedCommunities) {
            setJoinStates(
              data.data.moderatedCommunities.map(
                (community) => community.joined
              )
            );
          } else {
            setJoinStates([]);
          }
          if (user?.username == username) {
            setMyData(true);
          }
          if (user?.username != username) {
            fetchReq.mutate(`users/following`, {
              onSuccess: (data) => {
                const userList = data.data;
                for (const user of userList) {
                  console.log(user.username, 'tasneem');

                  if (user.username === username) {
                    setFollowState(true);

                    break;
                  }
                }
              },
            });
          }
        },
      });
    }
  }, [user?.username]);

  const joinMutation = useMutation(
    (communityName: string) =>
      postRequest({
        endPoint: 'users/join-community',
        data: { community_name: communityName },
      }),
    {
      onSuccess: () => {},
    }
  );

  const leaveMutation = useMutation((communityName: string) =>
    postRequest({
      endPoint: 'users/leave-community',
      data: { community_name: communityName },
    })
  );
  const handleFollow = () => {
    postRequest({
      endPoint: 'users/follow-unfollow-user',
      data: { other_username: username },
    });

    setFollowState(!followState);
  };
  const navigate = useNavigate();
  const social_links = aboutData?.social_links ?? [];
  const display_name = aboutData?.display_name ?? '';
  const profile_picture = aboutData?.profile_picture ?? '';
  const banner_picture = aboutData?.banner_picture ?? '';
  const created_at = aboutData?.created_at ?? '';
  const date = new Date(created_at);
  const formattedDate = date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  const handleJoin = (index: number) => {
    const newJoinStates = [...joinStates];
    newJoinStates[index] = true;
    setJoinStates(newJoinStates);

    joinMutation.mutate(moderatedCommunities[index].name);
  };

  const handleLeave = (index: number) => {
    const newJoinStates = [...joinStates];
    newJoinStates[index] = false;
    setJoinStates(newJoinStates);

    leaveMutation.mutate(moderatedCommunities[index].name);
  };
  const handleBlock = () => {
    postRequest({
      endPoint: 'users/block-unblock-user',
      data: { blocked_username: username },
    });
  };
  const handleReport = () => {
    postRequest({
      endPoint: 'users/report-user',
      data: { reported_username: username },
    });
  };

  const handleSendMessage = () => {
    navigate(`/message/compose?to=${username}`);
  };
  return (
    <>
      <Card className=' shadow-none  mt-2 mx-1 bg-neutral-200 overflow-auto '>
        <div className='flex flex-col h-full relative '>
          {myData ? (
            <img
              src={
                banner_picture ||
                'https://upload.wikimedia.org/wikipedia/commons/b/bd/Oxford_Blue.png'
              }
              alt='card-image'
              className='w-full h-[120px] object-cover'
            />
          ) : (
            banner_picture && (
              <img
                src={
                  banner_picture ||
                  'https://upload.wikimedia.org/wikipedia/commons/b/bd/Oxford_Blue.png'
                }
                alt='card-image'
                className='w-full h-[120px] object-cover'
              />
            )
          )}
          {myData ? (
            <div className='absolute bottom-2 right-2 '>
              <Link
                to={`/settings/profile`}
                className='flex rounded-full border text-xs bg-white'
              >
                <div className='gap-2 flex justify-between items-center p-2 text-black'>
                  <PlusCircleIcon strokeWidth={2.5} className='h-4 w-4' />
                </div>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <Card
          color='transparent'
          shadow={false}
          className='w-full max-w-[20rem]  '
        >
          <div className='text-black font-semibold px-4 pt-2 flex justify-between'>
            {display_name}
            {!myData ? (
              <UserOptions
                handleBlock={handleBlock}
                handleReport={handleReport}
                handleSendMessage={handleSendMessage}
              />
            ) : (
              <></>
            )}
          </div>
          <div className='m-4 '>
            {!myData && (
              <div className='flex gap-4'>
                {followState ? (
                  <RoundedButton
                    buttonBorderColor='none'
                    buttonColor='bg-neutral-500'
                    buttonText='unfollow'
                    buttonTextColor='text-black'
                    onClick={() => handleFollow()}
                  >
                    <MinusCircleIcon strokeWidth={1.5} className='h-5 w-5' />
                  </RoundedButton>
                ) : (
                  <RoundedButton
                    buttonBorderColor='none'
                    buttonColor='bg-indigo-900'
                    buttonText='follow'
                    buttonTextColor='text-white'
                    onClick={() => handleFollow()}
                  >
                    <PlusCircleIcon strokeWidth={1.5} className='h-5 w-5' />
                  </RoundedButton>
                )}
                <RoundedButton
                  buttonBorderColor='none'
                  buttonColor='bg-neutral-500'
                  buttonText='Chat'
                  buttonTextColor='text-black'
                  onClick={() => {
                    navigate(`/chat/u/${username}`);
                  }}
                >
                  <ChatBubbleOvalLeftEllipsisIcon
                    strokeWidth={1.5}
                    className='h-5 w-5'
                  />
                </RoundedButton>
              </div>
            )}
          </div>
          <CardBody className='flex flex-col gap-2'>
            <div className='text-black text-sm'>{formattedDate}</div>
            <div className='text-xs'> Cake Day</div>
          </CardBody>
        </Card>
        <CardBody className='p-4'>
          {myData ? (
            <SidebarSection sectionTitle='settings'>
              <Card
                color='transparent'
                shadow={false}
                className='w-full max-w-[20rem]'
              >
                <CardHeader
                  color='transparent'
                  floated={false}
                  shadow={false}
                  className='mx-0  flex items-center gap-4 pt-0 '
                >
                  <Avatar
                    size='sm'
                    variant='circular'
                    src={
                      profile_picture ||
                      'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
                    }
                    alt='tania andrew'
                  />
                  <div className='flex w-full flex-col '>
                    <div className='flex items-center justify-between mb-0'>
                      <Typography variant='small' color='blue-gray'>
                        Profile
                        <Typography
                          variant='small'
                          color='gray'
                          className='text-xs mt-0'
                        >
                          Customize your profile
                        </Typography>
                      </Typography>

                      <div className='5 flex items-center'>
                        <Link
                          to={`/settings/profile`}
                          className='flex rounded-full border text-xs bg-neutral-500'
                        >
                          <div className='gap-2 flex justify-between items-center p-2 px-3 text-black'>
                            Edit profile
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </SidebarSection>
          ) : (
            <></>
          )}
          <SidebarSection sectionTitle='Links'>
            <div className='flex flex-start gap-2 flex-wrap'>
              {social_links &&
                social_links.map((link: SocialLink, i: number) => {
                  return (
                    <Link
                      key={i}
                      to={
                        link.custom_url.includes('www')
                          ? link.custom_url
                          : 'https://www.' +
                            link.type.toLowerCase() +
                            '.com/' +
                            link.custom_url +
                            '/'
                      }
                      target='_blank'
                    >
                      <RoundedButton
                        buttonBorderColor='none'
                        buttonColor='bg-neutral-500'
                        buttonText={link.display_text || link.custom_url}
                        buttonTextColor='text-black'
                      >
                        <img
                          src={
                            link.type == 'facebook'
                              ? facebookIcon
                              : instagramIcon
                          }
                          className='h-3.5 w-3.5'
                        />
                      </RoundedButton>
                    </Link>
                  );
                })}
              {myData ? (
                <Link
                  to={`/settings/profile`}
                  className='flex rounded-full border text-xs bg-neutral-500'
                >
                  <div className='gap-2 flex justify-between items-center p-2 px-3 text-black'>
                    <PlusIcon strokeWidth={2.5} className='h-3.5 w-3.5' />
                    Add Social Link
                  </div>
                </Link>
              ) : (
                <></>
              )}
            </div>
          </SidebarSection>
          <SidebarSection sectionTitle={`MODERATOR OF THESE COMMUNITIES`}>
            <div className='flex flex-col w-full '>
              {moderatedCommunities &&
                moderatedCommunities.map(
                  (link: ModeratedCommunity, i: number) => {
                    return (
                      <div
                        key={i}
                        className='flex justify-between items-center'
                      >
                        <div
                          onClick={() => {
                            navigate(`/r/${link.name}`);
                          }}
                        >
                          <CommunityItem
                            src={link.profile_picture}
                            name={link.name}
                            membersNumber={link.members_count}
                          ></CommunityItem>
                        </div>
                        {joinStates[i] ? (
                          <RoundedButton
                            buttonBorderColor='none'
                            buttonColor='bg-neutral-500'
                            buttonText='leave'
                            buttonTextColor='text-black'
                            onClick={() => handleLeave(i)}
                          ></RoundedButton>
                        ) : (
                          <RoundedButton
                            buttonBorderColor='none'
                            buttonColor='bg-neutral-500'
                            buttonText='join'
                            buttonTextColor='text-black'
                            onClick={() => handleJoin(i)}
                          ></RoundedButton>
                        )}
                      </div>
                    );
                  }
                )}
            </div>
          </SidebarSection>
        </CardBody>
      </Card>
    </>
  );
}

export default UserRightSideBar;
