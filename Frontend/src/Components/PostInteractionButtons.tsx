import React from 'react';
import ButtonContainer from './ButtonContainer';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { VoteArrow } from '../assets/icons/Icons';
import {
  ArrowUpTrayIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';

const PostInteractionButtons = () => {
  return (
    <>
      <div className='flex flex-row items-center gap-4 text-black'>
        <ButtonContainer>
          <IconButton variant='text'>
            <VoteArrow className='h-5 w-5 hover:fill-orange-muted' />
          </IconButton>
          <Typography variant='lead' className='text-sm'>
            1000
          </Typography>
          <IconButton variant='text'>
            <VoteArrow className='h-5 w-5 hover:fill-violet rotate-180' />
          </IconButton>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            variant='text'
            className='flex flex-row items-center justify-center gap-1 rounded-full'
          >
            <ChatBubbleLeftIcon className='h-5 w-5' />
            <Typography variant='lead' className='text-sm'>
              1000
            </Typography>
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            variant='text'
            className='flex flex-row items-center justify-center gap-1 rounded-full'
          >
            <ArrowUpTrayIcon className='h-5 w-5' />
            <Typography variant='lead' className='text-sm'>
              Share
            </Typography>
          </Button>
        </ButtonContainer>
      </div>
    </>
  );
};

export default PostInteractionButtons;
