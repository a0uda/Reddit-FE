import React from 'react';
import { Avatar, Card, CardBody, CardFooter } from '@material-tailwind/react';
import CommunityBadge from '../CommunityBadge';
import UserBadge from '../UserBadge';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../LoadingProvider';
import { CommunityType } from '../../types/types';
// import User from '../../Pages/User/User';

interface PostItemProps {
  //community data
  communityName: string;
  //post data
  postId: string;
  postTitle: string;
  postDescription: string;
  postMediaSrc: string;
  upvotes: number;
  comments: number;
  username: string;
}

const PostItem: React.FC<PostItemProps> = (props) => {
  const url = window.location.href;
  const { isLoading, isError } = useQuery({
    queryKey: ['communitiesPostItemRecentPosts', props.communityName, url],
    queryFn: () =>
      fetchRequest(`communities/get-community-view/${props.communityName}/`),
    onSuccess: (data) => {
      setCommunity(data.data);
    },
    // onError: () => {
    //   // Handle error here
    //   console.error('Error occurred while fetching community data');
    //   return;
    // },
  });
  const [Community, setCommunity] = useState<CommunityType | undefined>();
  const link = Community
    ? `/r/${props.communityName}/comments/${props.postId}/${props.postTitle.split(' ').splice(0, 10).join('_')}/`
    : `/u/${props.username}/comments/${props.postId}/${props.postTitle.split(' ').splice(0, 10).join('_')}/`;

  return (
    <div>
      <Card
        color='transparent'
        shadow={false}
        className='w-full max-w-[26rem] px-4'
      >
        <Link to={link} reloadDocument>
          <CardBody
            color='transparent'
            className='mx-0 flex justify-between items-start gap-4 pt-0 pb-2 p-0 m-0'
          >
            <div className='flex flex-col justify-start gap-2 pt-0 m-0'>
              {Community && (
                <LoadingProvider error={isError} isLoading={isLoading}>
                  <CommunityBadge
                    name={props.communityName}
                    joined={Community?.joined_flag}
                    avatar={Community?.profile_picture}
                    coverImage={Community?.banner_picture}
                    description={Community?.description}
                    members={Community?.members_count}
                    // online={Community.communityOnline}
                    username={props.username}
                    page='home'
                  />
                </LoadingProvider>
              )}
              {!Community && <UserBadge username={props.username} />}
              <p className='font-body font-bold -tracking-tight text-xs text-gray-700 line-clamp-2 overflow-hidden text-ellipsis'>
                {props.postTitle}
              </p>
            </div>
            {props.postMediaSrc !== '' && (
              <Avatar
                variant='rounded'
                alt='candice'
                src={props.postMediaSrc}
                style={{ width: '80px', height: '80px' }}
              />
            )}
          </CardBody>
          <CardFooter
            color='transparent'
            className='mx-0 flex items-center gap-4 p-0'
          >
            <p className='font-body font-thin -tracking-tight text-xs text-gray-600 py-2'>
              {props.upvotes} upvotes . {props.comments} comments
            </p>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
};

export default PostItem;
