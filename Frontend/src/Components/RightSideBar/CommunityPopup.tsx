import React from 'react';
import { useState, useEffect } from 'react';
import { Avatar, Typography, Card, CardBody } from '@material-tailwind/react';
import { postRequest } from '../../API/User';
import { useMutation } from 'react-query';
import { CommunityIcon } from '../../assets/icons/Icons';
import { Link } from 'react-router-dom';

interface CommunityPopupItemProps {
  //community data
  communityCoverImage?: string;
  communityAvatar?: string;
  communityName: string;
  joined?: boolean;
  communityDescription?: string;
  communityMembers?: number;
}

const CommunityPopup: React.FC<CommunityPopupItemProps> = (props) => {
  const [isJoined, setIsJoined] = useState(props.joined);
  const [JustJoined, setJustJoined] = useState(false); // to handle the appearance of leave button if the user has just joined the community
  useEffect(() => {
    // Check if the user has just joined the community
    if (!isJoined) {
      setJustJoined(true);
    }
  }, [isJoined]);

  const joinMutation = useMutation(
    (communityName: string) =>
      postRequest({
        endPoint: 'users/join-community',
        data: { community_name: communityName },
      }),
    {
      onSuccess: () => {
        setIsJoined(true);
      },
      onError: () => {
        console.log('Error Joining Community');
      },
    }
  );

  const leaveMutation = useMutation(
    (communityName: string) =>
      postRequest({
        endPoint: 'users/leave-community',
        data: { community_name: communityName },
      }),
    {
      onSuccess: () => {
        setJustJoined(false);
        setIsJoined(false);
      },
      onError: () => {
        console.log('Error Leaving Community');
      },
    }
  );

  return (
    <Card className='shadow-none'>
      {/* the content of popup only and you should handle PopoverHandler outside this component*/}
      {props.communityCoverImage && (
        <div className='relative w-full'>
          <img
            src={props.communityCoverImage}
            alt='Community Cover'
            className='w-full h-32 object-cover rounded-t-lg'
          />
        </div>
      )}
      <CardBody className=''>
        <div className='mb-2 flex items-center justify-between gap-4'>
          <div className='flex justify-start items-center gap-2 pt-0'>
            {props.communityAvatar ? (
              <Avatar
                variant='circular'
                alt={props.communityName}
                src={props.communityAvatar}
                style={{ width: '45px', height: '45px' }}
              />
            ) : (
              <CommunityIcon className='h-5 w-5' />
            )}
            <Typography
              variant='small'
              className='font-body font-bold -tracking-tight text-lg text-black overflow-hidden whitespace-nowrap text-ellipsis'
            >
              <Link
                to={`/r/${props.communityName}`}
                className='hover:underline'
              >
                r/{props.communityName}
              </Link>
            </Typography>
          </div>
          {!isJoined && JustJoined && (
            <button
              className='bg-gray-200 rounded-full font-body font-semibold text-black -tracking-tight text-xs m-0 px-3 py-1 selection:border-0'
              onClick={() => {
                joinMutation.mutate(props.communityName);
              }}
            >
              Join
            </button>
          )}
          {isJoined && JustJoined && (
            <button
              className='bg-gray-200 rounded-full font-body font-semibold text-black -tracking-tight text-xs m-0 px-3 py-1 selection:border-0'
              onClick={() => {
                leaveMutation.mutate(props.communityName);
              }}
            >
              Leave
            </button>
          )}
        </div>
        <Typography
          variant='small'
          color='gray'
          className='font-norma text-xs relative w-80'
        >
          {props.communityDescription}
        </Typography>
        <footer className='mt-6 flex items-center gap-8 border-t border-blue-gray-50 pt-4'>
          <div className='flex flex-col'>
            <p className='font-body font-bold -tracking-tight text-sm'>
              {props.communityMembers}
            </p>
            <p className='flex items-center gap-1 font-body font-thin -tracking-tight text-xs text-gray-600'>
              Members
            </p>
          </div>
          {/* <div className='flex flex-col'>
            <p className='font-body font-bold -tracking-tight text-sm'>
              {props.communityOnline}
            </p>
            <p className='flex items-center gap-1 font-body font-thin -tracking-tight text-xs text-gray-600'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
                width='10'
                height='10'
              >
               
                <circle cx='12' cy='12' r='10' fill='#4caf50' />
              </svg>
              Online
            </p>
          </div> */}
        </footer>
      </CardBody>
    </Card>
  );
};

export default CommunityPopup;
