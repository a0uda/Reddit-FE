import React from 'react';
import { useState, useEffect } from 'react';
import { Avatar, Typography, Card, CardBody } from '@material-tailwind/react';
import { postRequest } from '../../API/User';
import { useMutation } from 'react-query';
import { CommunityIcon } from '../../assets/icons/Icons';
import { Link } from 'react-router-dom';
import { useAlert } from '../../Providers/AlertProvider';

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
  const { setAlertMessage, setIsError, trigger, setTrigger } = useAlert();
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
      onError: (error: string) => {
        setAlertMessage(error);
        setIsError(true);
        setTrigger(!trigger);
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
      onError: (error: string) => {
        setAlertMessage(error);
        setIsError(true);
        setTrigger(!trigger);
      },
    }
  );

  return (
    <Card className='shadow-none' data-testid='community-popup'>
      {/* the content of popup only and you should handle PopoverHandler outside this component*/}
      {props.communityCoverImage && (
        <div className='relative w-full' data-testid='community-cover-image'>
          <img
            src={props.communityCoverImage}
            alt='Community Cover'
            className='w-full h-32 object-cover rounded-t-lg'
          />
        </div>
      )}
      <CardBody className='' data-testid='card-body'>
        <div
          className='mb-2 flex items-center justify-between gap-4'
          data-testid='community-info'
        >
          <div
            className='flex justify-start items-center gap-2 pt-0'
            data-testid='community-avatar'
          >
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
              data-testid='community-name'
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
              data-testid='join-button'
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
              data-testid='leave-button'
            >
              Leave
            </button>
          )}
        </div>
        <Typography
          variant='small'
          color='gray'
          className='font-norma text-xs relative w-80'
          data-testid='community-description'
        >
          {props.communityDescription}
        </Typography>
        <footer
          className='mt-6 flex items-center gap-8 border-t border-blue-gray-50 pt-4'
          data-testid='community-footer'
        >
          <div className='flex flex-col'>
            <p
              className='font-body font-bold -tracking-tight text-sm'
              data-testid='community-members'
            >
              {props.communityMembers}
            </p>
            <p className='flex items-center gap-1 font-body font-thin -tracking-tight text-xs text-gray-600'>
              Members
            </p>
          </div>
        </footer>
      </CardBody>
    </Card>
  );
};

export default CommunityPopup;
