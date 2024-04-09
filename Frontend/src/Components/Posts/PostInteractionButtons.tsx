import ButtonContainer from '../ButtonContainer';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { VoteArrow } from '../../assets/icons/Icons';
import {
  ArrowUpTrayIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { postRequest } from '../../API/User';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { cn } from '../../utils/helper_functions';

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
  const queryClient = useQueryClient();

  const mutate = useMutation(
    ({ postId, rank }: { postId: string; rank: number }) =>
      postRequest({
        endPoint: 'posts-or-comments/vote',
        data: { id: postId, isPost: true, rank: rank },
      }),
    {
      onSuccess: () => {
        // Invalidate or refetch a query on success
        queryClient.invalidateQueries(['listings', 'all']);
      },
      onError: () => {
        // Perform any actions on error, like showing an error message
        console.log('Error');
      },
    }
  );

  console.log('upvote', upvote);
  console.log('downvote', downvote);

  return (
    <>
      <div className='flex flex-row items-center gap-4 text-black'>
        <ButtonContainer
          className={upvote ? 'bg-orange' : downvote ? 'bg-violet-muted' : ''}
        >
          <IconButton
            variant='text'
            className={cn(
              upvote ? 'bg-orange' : '',
              upvote || downvote ? 'text-white' : ''
            )}
            onClick={() => {
              setUpvote(!upvote);
              downvote && mutate.mutate({ postId, rank: 1 });
              mutate.mutate({ postId, rank: upvote ? -1 : 1 });
              setDownvote(false);
            }}
          >
            <VoteArrow className='h-5 w-5 hover:fill-orange-muted' />
          </IconButton>
          <Typography
            variant='lead'
            className={cn('text-sm', upvote || downvote ? 'text-white' : '')}
          >
            {upvotes - downvotes}
          </Typography>
          <IconButton
            variant='text'
            className={cn(
              downvote ? 'bg-violet-muted' : '',
              upvote || downvote ? 'text-white' : ''
            )}
            onClick={() => {
              setDownvote(!downvote);
              upvote && mutate.mutate({ postId, rank: -1 });
              mutate.mutate({ postId, rank: downvote ? 1 : -1 });
              setUpvote(false);
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
