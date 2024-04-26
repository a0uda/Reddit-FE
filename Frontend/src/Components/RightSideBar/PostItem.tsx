import React from 'react';
import { Avatar, Card, CardBody, CardFooter } from '@material-tailwind/react';
import CommunityBadge from '../CommunityBadge';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../LoadingProvider';
import { CommunityType } from '../../types/types';

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
}

const PostItem: React.FC<PostItemProps> = (props) => {
  const { isLoading, isError } = useQuery({
    queryKey: ['communities', props.communityName],
    queryFn: () =>
      fetchRequest(`communities/get-community-view/${props.communityName}/`),
    onSuccess: (data) => {
      setCommunity(data.data);
    },
  });
  const [Community, setCommunity] = useState<CommunityType | undefined>();

  return (
    <div>
      <LoadingProvider error={isError} isLoading={isLoading}>
        <Card
          color='transparent'
          shadow={false}
          className='w-full max-w-[26rem] px-4'
        >
          <Link
            to={`/r/${props.communityName}/comments/${props.postId}/${props.postTitle.split(' ').splice(0, 10).join('_')}/`}
            reloadDocument
          >
            <CardBody
              color='transparent'
              className='mx-0 flex justify-between items-start gap-4 pt-0 pb-2 p-0 m-0'
            >
              <div className='flex flex-col justify-start gap-2 pt-0 m-0'>
                <CommunityBadge
                  name={props.communityName}
                  joined={Community?.joined_flag}
                  avatar={Community?.profile_picture}
                  coverImage={Community?.banner_picture}
                  description={Community?.description}
                  members={Community?.members_count}
                  // online={Community.communityOnline}
                />
                <p className='font-body font-bold -tracking-tight text-xs text-gray-700 line-clamp-2 overflow-hidden text-ellipsis'>
                  {props.postDescription}
                </p>
              </div>
              <Avatar
                variant='rounded'
                alt='candice'
                src={props.postMediaSrc}
                style={{ width: '80px', height: '80px' }}
              />
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
      </LoadingProvider>
    </div>
  );
};

export default PostItem;
