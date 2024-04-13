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
import { Link } from 'react-router-dom';

const InteractionButtons = ({
  id,
  upvotes,
  downvotes,
  comments_replies,
  isPost = true,
  refLink,
  className,
}: {
  id: string;
  upvotes: number;
  downvotes: number;
  comments_replies: number;
  isPost?: boolean;
  refLink?: string;
  className?: string;
}) => {
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const queryClient = useQueryClient();

  const mutate = useMutation(
    ({ id, rank }: { id: string; rank: number }) =>
      postRequest({
        endPoint: 'posts-or-comments/vote',
        data: { id: id, is_post: isPost, rank: rank },
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

  return (
    <>
      <div
        className={cn(
          'flex flex-row items-center gap-4 text-black',
          !isPost ? 'gap-0' : '',
          className
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ButtonContainer
          className={cn(
            upvote ? 'bg-orange' : downvote ? 'bg-violet-muted' : '',
            !isPost && 'bg-inherit'
          )}
        >
          <IconButton
            variant='text'
            className={cn(
              upvote ? 'bg-orange' : '',
              upvote || downvote ? 'text-white' : ''
            )}
            onClick={() => {
              setUpvote(!upvote);
              downvote && mutate.mutate({ id, rank: 1 });
              mutate.mutate({ id, rank: upvote ? -1 : 1 });
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
              upvote && mutate.mutate({ id, rank: -1 });
              mutate.mutate({ id, rank: downvote ? 1 : -1 });
              setUpvote(false);
            }}
          >
            <VoteArrow className='h-5 w-5 hover:fill-violet rotate-180' />
          </IconButton>
        </ButtonContainer>
        <ButtonContainer className={!isPost ? 'bg-inherit' : ''}>
          <Button
            variant='text'
            className='flex flex-row items-center justify-center gap-1 rounded-full'
          >
            <ChatBubbleLeftIcon className='h-5 w-5' />
            <div className='hidden sm:block'>
              {isPost ? (
                <>
                  <Link to={`${refLink}`}>
                    <Typography variant='lead' className='text-sm'>
                      {comments_replies}
                    </Typography>
                  </Link>
                </>
              ) : (
                <>
                  <Typography variant='lead' className='text-sm'>
                    Reply
                  </Typography>
                </>
              )}
            </div>
          </Button>
        </ButtonContainer>
        <ButtonContainer className={!isPost ? 'bg-inherit' : ''}>
          <Button
            variant='text'
            className='flex flex-row items-center justify-center gap-1 rounded-full'
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}${refLink}`
              );
            }}
          >
            <ArrowUpTrayIcon className='h-5 w-5' />
            <div className='hidden sm:block'>
              <Typography variant='lead' className='text-sm'>
                Share
              </Typography>
            </div>
          </Button>
        </ButtonContainer>
      </div>
    </>
  );
};

export default InteractionButtons;
