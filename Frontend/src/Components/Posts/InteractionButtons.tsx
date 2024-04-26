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
import { PostType } from '../../types/types';

const InteractionButtons = ({
  id,
  upvotes,
  downvotes,
  comments_replies,
  isPost = true,
  refLink,
  className,
  myVote,
}: {
  id: string;
  upvotes: number;
  downvotes: number;
  comments_replies: number;
  isPost?: boolean;
  refLink?: string;
  className?: string;
  myVote: number;
}) => {
  const [vote, setVote] = useState<number>(myVote || 0);
  const [totalVotes, setTotalVotes] = useState(upvotes - downvotes);
  const queryClient = useQueryClient();

  const mutate = useMutation(
    ({ id, rank }: { id: string; rank: number }) =>
      postRequest({
        endPoint: 'posts-or-comments/vote',
        data: { id: id, is_post: isPost, vote: rank },
      }),
    {
      onSuccess: () => {
        // Invalidate or refetch a query on success
        // queryClient.invalidateQueries(['listings']);
        // queryClient.invalidateQueries(['post']);
        // queryClient.invalidateQueries(['posts']);
        // queryClient.invalidateQueries(['comments']);
        // queryClient.invalidateQueries(['downvoted']);
        // queryClient.invalidateQueries(['upvoted']);
        // queryClient.invalidateQueries(['hidden']);
        // queryClient.invalidateQueries(['saved']);
        // queryClient.invalidateQueries(['userComments']);
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
          'flex flex-row items-center gap-4 text-black z-10',
          !isPost ? 'gap-0' : '',
          className
        )}
        onClick={(e) => {
          // Wahed fehom yeshel el event (mesh 3ayez yed5ol lel post details)
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <ButtonContainer
          className={cn(
            !isPost && 'bg-inherit',
            vote == 1 ? 'bg-orange' : vote == -1 ? 'bg-violet-muted' : ''
          )}
        >
          <IconButton
            variant='text'
            className={cn(
              vote == 1 ? 'bg-orange' : '',
              vote != 0 ? 'text-white' : ''
            )}
            onClick={() => {
              const lastVote = vote;
              let newVote = vote;

              if (vote === 1) {
                setVote(0);
                newVote = 0;
              } else {
                setVote(1);
                newVote = 1;
              }
              // const { id, isPost, rank } = req.body;
              console.log(newVote);

              mutate.mutate(
                { id, rank: newVote },
                {
                  onSuccess: () => {
                    setTotalVotes(totalVotes + newVote == 0 ? -1 : 1);
                  },
                  onError: () => {
                    setVote(lastVote);
                  },
                }
              );
            }}
          >
            <VoteArrow className='h-5 w-5 hover:fill-orange-muted' />
          </IconButton>
          <Typography
            variant='lead'
            className={cn('text-sm', vote != 0 ? 'text-white' : '')}
          >
            {totalVotes}
          </Typography>
          <IconButton
            variant='text'
            className={cn(
              vote == -1 ? 'bg-violet-muted' : '',
              vote != 0 ? 'text-white' : ''
            )}
            onClick={() => {
              const lastVote = vote;
              let newVote = vote;

              if (vote === -1) {
                setVote(0);
                newVote = 0;
              } else {
                setVote(-1);
                newVote = -1;
              }
              // const { id, isPost, rank } = req.body;
              console.log(newVote);

              mutate.mutate(
                {
                  id,
                  rank: newVote,
                },
                {
                  onSuccess: () => {
                    setTotalVotes(totalVotes + newVote == 0 ? 1 : -1);
                  },
                  onError: () => {
                    setVote(lastVote);
                  },
                }
              );
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
