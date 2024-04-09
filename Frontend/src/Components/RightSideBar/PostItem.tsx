import React from 'react';
import { Avatar, Card, CardBody, CardFooter } from '@material-tailwind/react';
import CommunityBadge from '../CommunityBadge';

interface PostItemProps {
  //community data
  communityCoverImage: string;
  communityIcon: string;
  communityName: string;
  joined: boolean;
  communityDescription: string;
  communityMembers: number;
  communityOnline: number;
  //post data
  postDescription: string;
  postMediaSrc: string;
  upvotes: number;
  comments: number;
}

const PostItem: React.FC<PostItemProps> = (props) => {
  return (
    <div>
      <Card
        color='transparent'
        shadow={false}
        className='w-full max-w-[26rem] px-4'
      >
        <CardBody
          color='transparent'
          className='mx-0 flex items-start gap-4 pt-0 pb-2 p-0 m-0'
        >
          <div className='flex flex-col justify-start gap-2 pt-0 m-0'>
            <CommunityBadge
              name={props.communityName}
              joined={props.joined}
              avatar={props.communityIcon}
              coverImage={props.communityCoverImage}
              description={props.communityDescription}
              members={props.communityMembers}
              online={props.communityOnline}
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
      </Card>
    </div>
  );
};

export default PostItem;
