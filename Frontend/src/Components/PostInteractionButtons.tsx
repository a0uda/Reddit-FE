import ButtonContainer from './ButtonContainer';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { VoteArrow } from '../assets/icons/Icons';
import {
  ArrowUpTrayIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { postRequest } from '../API/User';
import { useMutation } from 'react-query';
import { useState } from 'react';

const PostInteractionButtons = ({
  postId,
  upvotes,
  downvotes,
  comments,
}: {
  postId: string;
  upvotes: number;
  downvotes: number;
  comments: number;
}) => {
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);

  const mutate = useMutation(
    ({ postId, rank }: { postId: string; rank: number }) =>
      postRequest({
        endPoint: 'posts-or-comments/vote',
        data: { id: postId, isPost: true, rank: rank },
      }),
    {
      onError: () => {
        // Perform any actions on error, like showing an error message
        console.log('Error');
      },
    }
  );

  return (
    <>
      <div className='flex flex-row items-center gap-4 text-black'>
        <ButtonContainer
          className={upvote ? 'bg-orange' : downvote ? 'bg-violet-muted' : ''}
        >
          <IconButton
            variant='text'
            className={upvote ? 'bg-orange' : ''}
            onClick={() => {
              setUpvote(!upvote);
              setDownvote(false);
              mutate.mutate({ postId, rank: upvote ? -1 : 1 });
            }}
          >
            <VoteArrow className='h-5 w-5 hover:fill-orange-muted ' />
          </IconButton>
          <Typography variant='lead' className='text-sm'>
            {upvotes - downvotes}
          </Typography>
          <IconButton
            variant='text'
            className={downvote ? 'bg-violet-muted' : ''}
            onClick={() => {
              setDownvote(!downvote);
              setUpvote(false);
              mutate.mutate({ postId, rank: downvote ? 1 : -1 });
            }}
          >
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
              {comments}
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
