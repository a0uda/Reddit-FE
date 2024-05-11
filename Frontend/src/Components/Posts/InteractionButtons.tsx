import ButtonContainer from '../ButtonContainer';
import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { VoteArrow } from '../../assets/icons/Icons';
import {
  ArrowUpTrayIcon,
  ChatBubbleLeftIcon,
  LinkIcon,
  ArrowPathRoundedSquareIcon,
} from '@heroicons/react/24/outline';
import { postRequest } from '../../API/User';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { cn } from '../../utils/helper_functions';
import { Link } from 'react-router-dom';
import SharePostModal from './SharePostModal';

const InteractionButtons = ({
  id,
  upvotes,
  downvotes,
  comments_replies,
  isPost = true,
  refLink,
  className,
  myVote,
  isReposted,
}: {
  id: string;
  upvotes: number;
  downvotes: number;
  comments_replies: number;
  isPost?: boolean;
  refLink?: string;
  className?: string;
  myVote: number;
  isReposted: boolean;
}) => {
  const [vote, setVote] = useState<number>(myVote || 0);
  const [upVotes, setUpVotes] = useState(upvotes);
  const [downVotes, setDownVotes] = useState(downvotes);
  const [openSPModal, setOpenSPModal] = useState(false);
  const handleOpenSPModal = () => setOpenSPModal(!openSPModal);
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
      // onError: () => {
      //   // Perform any actions on error, like showing an error message
      //   console.log('Error');
      // },
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
                // setVote(0);
                newVote = 0;
              } else {
                // setVote(1);
                newVote = 1;
              }

              mutate.mutate(
                {
                  id,
                  rank: newVote,
                },
                {
                  onSuccess: () => {
                    setUpVotes(upVotes + newVote - lastVote);
                    setVote(newVote);
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
            {upVotes - downVotes}
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
                    // setDownVotes(totalVotes + (newVote == 0 ? 1 : -1));
                    setDownVotes(downVotes - newVote + lastVote);
                    setVote(newVote);
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

        <Menu placement='bottom-end'>
          <MenuHandler>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
                e.stopPropagation();
              }}
              variant='text'
              className={`flex flex-row items-center justify-center gap-1 rounded-full ${isPost ? 'bg-neutral-500' : ''}`}
            >
              <ArrowUpTrayIcon className='h-5 w-5' />
              Share
            </Button>
          </MenuHandler>
          <MenuList className='p-0 text-foreground min-w-min w-max shadow-lg shadow-black/25'>
            <MenuItem
              className='py-3 flex gap-2 items-center'
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}${refLink}`
                );
              }}
            >
              <LinkIcon strokeWidth={1.5} className='h-4 w-4' />
              <span>Copy Link</span>
            </MenuItem>

            {isPost && !isReposted && (
              <MenuItem
                onClick={handleOpenSPModal}
                className='py-3 flex gap-2 items-center'
              >
                <ArrowPathRoundedSquareIcon
                  strokeWidth={1.5}
                  className='h-4 w-4'
                />
                <span>Cross Post</span>
              </MenuItem>
            )}
          </MenuList>
        </Menu>
        <SharePostModal
          handleOpen={handleOpenSPModal}
          open={openSPModal}
          postId={id}
        />
      </div>
    </>
  );
};

export default InteractionButtons;
