import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { useState } from 'react';
import { cn, dateDuration } from '../../utils/helper_functions';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchRequest, patchRequest, postRequest } from '../../API/User';
import { CommentType, UserType } from '../../types/types';
import { Link } from 'react-router-dom';
import Reply from './Reply';
import { EditorContent, useEditor } from '@tiptap/react';
import { tiptapConfig } from '../../utils/tiptap_config';
import CommentOptions from './CommentOptions';
import ButtonContainer from '../ButtonContainer';
import { VoteArrow } from '../../assets/icons/Icons';
import {
  ArrowUpTrayIcon,
  ChatBubbleLeftIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import AddReply from './AddReply';
import useSession from '../../hooks/auth/useSession';

import EditPostComment from './EditPostComment';
import { useAlert } from '../../Providers/AlertProvider';

const Comment = ({
  comment,
  showButton,
}: {
  comment: CommentType;
  showButton: boolean;
}) => {
  const { setAlertMessage, setIsError, trigger, setTrigger } = useAlert();

  const patchReq = useMutation(patchRequest, {
    onError: (error: string) => {
      setAlertMessage(error);
      setIsError(true);
      setTrigger(!trigger);
    },
  });
  const [author, setAuthor] = useState<UserType | undefined>();
  // const [upvote, setUpvote] = useState(false);
  // const [downvote, setDownvote] = useState(false);
  const queryClient = useQueryClient();
  const [showAddReply, setShowAddReply] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);
  const { user } = useSession();
  const isMyComment = comment.username == user?.username;
  const handleButtonClick = () => {
    setShowAddReply((prevState) => !prevState);
  };

  const mutate = useMutation(
    ({ comment, rank }: { comment: CommentType; rank: number }) =>
      postRequest({
        endPoint: 'posts-or-comments/vote',
        data: { id: comment._id, is_post: false, vote: rank },
      }),
    {
      onSuccess: () => {
        // Invalidate or refetch a query on success
        queryClient.invalidateQueries(['listings']);
        queryClient.invalidateQueries(['post']);
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['comments']);
        queryClient.invalidateQueries(['downvoted']);
        queryClient.invalidateQueries(['upvoted']);
        queryClient.invalidateQueries(['hidden']);
        queryClient.invalidateQueries(['saved']);
        queryClient.invalidateQueries(['userComments']);
      },
      // onError: () => {
      //   // Perform any actions on error, like showing an error message
      //   console.log('Error');
      // },
    }
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const url = window.location.href;
  useQuery({
    queryKey: ['users/about/comment', comment.username, url],
    queryFn: () => fetchRequest(`users/about/${comment.username}`),
    onSuccess: (data) => {
      setAuthor(data?.data);
      setAuthor(data?.data);
    },
  });

  const editable = false;
  const editor = useEditor({
    ...tiptapConfig,
    editable,
    content: comment.description,
  });
  const handleSaveUnsaveComment = () => {
    patchReq.mutate({
      endPoint: 'posts-or-comments/save',
      newSettings: {
        is_post: false,
        id: comment._id,
      },
    });
  };
  const handleEditComment = () => {
    setShowEditComment(!showEditComment);
  };
  const handleDeleteComment = () => {
    postRequest({
      endPoint: 'comments/delete',
      data: { id: comment._id },
    });
  };
  return (
    <>
      <Card className='w-full py-2' shadow={false}>
        <CardHeader
          shadow={false}
          floated={false}
          className='flex flex-row items-center justify-between gap-2 m-0 mb-2 bg-inherit'
        >
          <div className='flex items-center justify-between gap-1 m-0'>
            <Link
              to={`/u/${author?.username || comment.username}/overview`}
              className='flex flex-row items-center gap-2 m-0'
            >
              <Avatar
                variant='circular'
                alt={author?.username || comment.username}
                src={
                  author?.profile_picture ||
                  'https://www.redditstatic.com/avatars/avatar_default_07_24A0ED.png'
                }
                className='h-8 w-8'
              />
              <Typography className='text-sm font-bold text-black hover:underline'>
                {comment.username}
              </Typography>
            </Link>
            <div className='flex flex-row items-center justify-between gap-1 m-0'>
              <span className='relative -top-0.5'>•</span>
              <Typography variant='small' className='text-xs'>
                {dateDuration(new Date(comment.created_at))}
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className='grid grid-cols-[24px_1fr] sm:grid-cols-[32px_1fr] relative p-0'>
          <div className='flex justify-center group'>
            {/* {comment.replies_comments_ids.length > 0 && (
              <div className='w-[1px] h-full group-hover:bg-black bg-neutral-muted'></div>
            )} */}
          </div>
          <div>
            {!showEditComment ? (
              <EditorContent editor={editor} />
            ) : (
              <EditPostComment
                post={comment}
                isPost={false}
                handleEdit={handleEditComment}
              />
            )}
            <div className='flex items-center px-0'>
              <div
                className='flex flex-row items-center  text-black z-10'
                onClick={(e) => {
                  // Wahed fehom yeshel el event (mesh 3ayez yed5ol lel post details)
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <ButtonContainer
                  className={cn(
                    !false && 'bg-inherit',
                    comment.vote == 1
                      ? 'bg-orange'
                      : comment.vote == -1
                        ? 'bg-violet-muted'
                        : ''
                  )}
                >
                  <IconButton
                    variant='text'
                    className={cn(
                      comment.vote == 1 ? 'bg-orange' : '',
                      comment.vote != 0 ? 'text-white' : ''
                    )}
                    onClick={() => {
                      const lastVote = comment.vote;
                      let newVote = comment.vote;
                      if (comment.vote === 1) {
                        // setVote(0);
                        newVote = 0;
                      } else {
                        // setVote(1);
                        newVote = 1;
                      }

                      mutate.mutate(
                        {
                          comment,
                          rank: newVote,
                        },
                        {
                          onSuccess: () => {
                            comment.upvotes_count =
                              comment.upvotes_count + newVote - lastVote;
                            comment.vote = newVote;
                          },
                          onError: () => {
                            comment.vote = lastVote;
                          },
                        }
                      );
                    }}
                  >
                    <VoteArrow className='h-5 w-5 hover:fill-orange-muted' />
                  </IconButton>
                  <Typography
                    variant='lead'
                    className={cn(
                      'text-sm',
                      comment.vote != 0 ? 'text-white' : ''
                    )}
                  >
                    {comment.upvotes_count - comment.downvotes_count}
                  </Typography>
                  <IconButton
                    variant='text'
                    className={cn(
                      comment.vote == -1 ? 'bg-violet-muted' : '',
                      comment.vote != 0 ? 'text-white' : ''
                    )}
                    onClick={() => {
                      const lastVote = comment.vote;
                      let newVote = comment.vote;

                      if (comment.vote === -1) {
                        comment.vote = 0;
                        newVote = 0;
                      } else {
                        comment.vote = -1;
                        newVote = -1;
                      }
                      // const { id, isPost, rank } = req.body;
                      console.log(newVote);

                      mutate.mutate(
                        {
                          comment,
                          rank: newVote,
                        },
                        {
                          onSuccess: () => {
                            // setDownVotes(totalVotes + (newVote == 0 ? 1 : -1));
                            comment.downvotes_count =
                              comment.downvotes_count - newVote + lastVote;
                            comment.vote = newVote;
                          },
                          onError: () => {
                            comment.vote = lastVote;
                          },
                        }
                      );
                    }}
                  >
                    <VoteArrow className='h-5 w-5 hover:fill-violet rotate-180' />
                  </IconButton>
                </ButtonContainer>
                {showButton && (
                  <ButtonContainer className='bg-inherit'>
                    <Button
                      variant='text'
                      className='flex flex-row items-center justify-center gap-1 rounded-full'
                      onClick={handleButtonClick}
                    >
                      <ChatBubbleLeftIcon className='h-5 w-5' />
                      <div className='hidden sm:block'>
                        <>
                          <Typography variant='lead' className='text-sm'>
                            Reply
                          </Typography>
                        </>
                      </div>
                    </Button>
                  </ButtonContainer>
                )}

                <Menu placement='bottom-end'>
                  <MenuHandler>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.nativeEvent.stopImmediatePropagation();
                        e.stopPropagation();
                      }}
                      variant='text'
                      className={`flex flex-row items-center justify-center gap-1 rounded-full `}
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
                          `${window.location.href}`
                        );
                      }}
                    >
                      <LinkIcon strokeWidth={1.5} className='h-4 w-4' />
                      <span>Copy Link</span>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
              <CommentOptions
                saved={comment.saved}
                handleSaveComment={handleSaveUnsaveComment}
                handleEditComment={handleEditComment}
                handleDeleteComment={handleDeleteComment}
                isMyComment={isMyComment}
              />
            </div>
            {comment.replies_comments_ids.length > 0 && (
              <div className='flex flex-col gap-2 w-full col-span-2'>
                {comment.replies_comments_ids.map((reply) => (
                  <Reply key={reply._id} reply={reply} />
                ))}
              </div>
            )}
            <div className='flex flex-row'>
              {showAddReply && <AddReply commentId={comment._id} />}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Comment;
