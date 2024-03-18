import React from 'react';
import { useState } from 'react';
import CommunityPopup from './CommunityPopup';
import {
  Avatar,
  Typography,
  Card,
  CardBody,
  CardFooter,
  Popover,
  PopoverHandler,
  PopoverContent,
} from '@material-tailwind/react';

interface PostItemProps {
  //community data
  communityAvatarSrc: string;
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
  const [openPopover, setOpenPopover] = useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

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
            <Popover open={openPopover} handler={setOpenPopover}>
              <PopoverHandler {...triggers}>
                <div className='flex justify-start items-center gap-2 pt-0'>
                  <Avatar
                    variant='circular'
                    alt='candice'
                    src={props.communityAvatarSrc}
                    style={{ width: '25px', height: '25px' }}
                  />
                  <Typography
                    variant='small'
                    className='font-body font-thin -tracking-tight text-xs text-gray-600'
                  >
                    <a href='' className='hover:underline'>
                      {props.communityName}
                    </a>
                  </Typography>
                </div>
              </PopoverHandler>
              <PopoverContent
                {...triggers}
                className='z-50 max-w-[24rem] rounded-2xl'
              >
                <CommunityPopup
                  communityAvatarSrc={props.communityAvatarSrc}
                  communityName={props.communityName}
                  joined={props.joined}
                  communityDescription={props.communityDescription}
                  communityMembers={props.communityMembers}
                  communityOnline={props.communityOnline}
                />
              </PopoverContent>
            </Popover>
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
