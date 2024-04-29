import React, { MouseEventHandler, ReactNode } from 'react';
import { CommentType, PostType } from '../../../types/types';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckBadgeIcon,
  CheckIcon,
  EyeSlashIcon,
  LockClosedIcon,
  ShareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAlert } from '../../../Providers/AlertProvider';
import { useMutation } from 'react-query';
import { patchRequest, postRequest } from '../../../API/User';
import {
  Avatar,
  Typography,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button,
} from '@material-tailwind/react';
import { CommunityIcon } from '../../../assets/icons/Icons';
import { Link } from 'react-router-dom';
import {
  addPrefixToUsername,
  getTimeDifferenceAsString,
} from '../../../utils/helper_functions';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  EyeIcon,
  // EyeSlashIcon,
  FlagIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { PollPostContainer } from '../../../Components/Posts/PostPreview';
import useSession from '../../../hooks/auth/useSession';
import eighteenPic from '../../../assets/18Pic.svg';

function RoundedButton(props: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <Button
      onClick={props.onClick}
      style={{
        //backgroundColor: props.buttonColor,
        // color: props.buttonTextColor,
        width: 'max-content',
      }}
      type={props.type || 'button'}
      // color='black'
      className={`rounded-full !border-[1px] font-semibold border-gray-500 bg-inherit text-black  !normal-case  hover:border-black active:brightness-150  hover:shadow-none focus:shadow-none shadow-none `}
      size='sm'
      ripple={false}
      disabled={props.disabled || false}
    >
      <div className='flex justify-between items-center gap-1'>
        {props.children}
      </div>
    </Button>
  );
}

const PostOptions = ({ post }: { post: PostType }) => {
  const postReq = useMutation(postRequest);
  const patchReq = useMutation(patchRequest);
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  // const { user } = useSession();
  const handleModOps = (
    option: 'approve' | 'remove' | 'spam' | 'report',
    type: 'post' | 'comment'
  ) => {
    postReq.mutate(
      {
        endPoint: `communities/${option}-item/${post.community_name}`,
        data: {
          item_id: post._id,
          item_type: type,
        },
      },
      {
        // onSuccess: () => {
        //   post.moderator_details.approved_flag = true;
        //   post.moderator_details.approved_by = user?.username;
        //   post.moderator_details.approved_date = new Date();
        //   post.moderator_details.removed_flag = false;
        // },
      }
    );
  };
  const handleSharePost = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/r/${post.community_name}/comments/${post._id}/${post.title}/`
    );
    setAlertMessage('Link is copied successfuly!');
    setIsError(false);
    setTrigger(!trigger);
  };
  // const handleReportPost = () => {
  //   postReq.mutate({
  //     endPoint: 'posts/report',
  //     data: {
  //       id: post._id,
  //     },
  //   });
  // };
  const handleNSFWFlag = () => {
    patchReq.mutate(
      {
        endPoint: 'posts/marknsfw',
        newSettings: {
          id: post._id,
        },
      },
      {
        onSuccess: () => {
          post.nsfw_flag = !post.nsfw_flag;
        },
      }
    );
  };
  const handleSpoil = (isPost: boolean) => {
    patchReq.mutate(
      {
        endPoint: 'posts-or-comments/spoiler',
        newSettings: {
          is_post: isPost,
          id: post._id,
        },
      },
      {
        onSuccess: () => {
          post.spoiler_flag = !post.spoiler_flag;
        },
      }
    );
  };
  const handleLockUnlockPost = (isPost: boolean) => {
    patchReq.mutate(
      {
        endPoint: 'posts-or-comments/lock-unlock',
        newSettings: {
          is_post: isPost,
          id: post._id,
        },
      },
      {
        onSuccess: () => {
          post.locked_flag = !post.locked_flag;
        },
      }
    );
  };
  const handleHideUnhidePost = () => {
    patchReq.mutate({
      endPoint: 'posts/hide-unhide',
      newSettings: {
        id: post._id,
      },
    });
  };

  return (
    <Menu placement='bottom-end'>
      <MenuHandler>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.nativeEvent.stopImmediatePropagation();
            e.stopPropagation();
          }}
          variant='text'
          className='p-2 z-10'
        >
          <HiEllipsisHorizontal size={20} />
        </Button>
      </MenuHandler>
      <MenuList className='p-0 text-foreground min-w-min w-max shadow-lg shadow-black/25'>
        <Typography className='px-4 pt-2 flex gap-2 items-center focus-visible:outline-none'>
          Moderation
        </Typography>
        {!post.moderator_details.reported_flag && (
          <MenuItem
            className='py-3 flex gap-2 items-center'
            onClick={() => {
              handleModOps(
                'spam',
                post.post_in_community_flag == undefined ? 'comment' : 'post'
              );
            }}
          >
            <XMarkIcon className='w-5 h-5' />
            <span>Remove as Spam</span>
          </MenuItem>
        )}
        <MenuItem
          className='py-3 flex gap-2 items-center'
          onClick={() => {
            handleLockUnlockPost(post.post_in_community_flag != undefined);
          }}
        >
          <LockClosedIcon className='w-5 h-5' />
          <span>
            {!post.locked_flag ? 'Lock' : 'Unlock'}{' '}
            {post.post_in_community_flag == undefined ? 'Replies' : 'Comments'}
          </span>
        </MenuItem>
        {post.post_in_community_flag != undefined && (
          <MenuItem
            onClick={handleNSFWFlag}
            className='py-3 flex gap-2 items-center'
          >
            <img src={eighteenPic} className='w-5 h-5' />
            <span>{!post.nsfw_flag ? 'Mark' : 'Unmark'} as NSFW</span>
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            handleSpoil(post.post_in_community_flag != undefined);
          }}
          className='py-3 flex gap-2 items-center border-b-[1px]'
        >
          <ExclamationTriangleIcon className='w-5 h-5' />
          <span>{!post.nsfw_flag ? 'Mark' : 'Unmark'} as Spoiler</span>
        </MenuItem>
        <Typography className='px-4 pt-2 flex gap-2 items-center focus-visible:outline-none'>
          Other
        </Typography>
        <MenuItem
          className='py-3 flex gap-2 items-center'
          onClick={handleSharePost}
        >
          <ShareIcon className='w-5 h-5' />
          <span>Share</span>
        </MenuItem>
        <MenuItem
          className='py-3 flex gap-2 items-center'
          onClick={() => {
            handleModOps(
              'report',
              post.post_in_community_flag == undefined ? 'comment' : 'post'
            );
          }}
        >
          <FlagIcon className='w-5 h-5' />
          <span>Report</span>
        </MenuItem>
        <MenuItem
          onClick={handleHideUnhidePost}
          className='py-3 flex gap-2 items-center'
        >
          <EyeSlashIcon className='w-5 h-5' />
          <span>Hide</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const Vote = (props: {
  vote: number;
  postId: string;
  voteCount: number;
  isPost: boolean;
}) => {
  const [vote, setVote] = React.useState(props.vote);
  //   const [lastVote, setLastVote] = React.useState(0);
  const [voteCount, setVoteCount] = React.useState(props.voteCount);
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();
  const postReq = useMutation(postRequest);
  //   console.log(props.vote, 'aaaa');

  return (
    <div className=' flex flex-col items-center'>
      <ArrowUpIcon
        strokeWidth={6.5}
        className={`w-[25px] cursor-pointer ${vote === 1 ? 'text-orange' : 'text-[#888]'}`}
        onClick={() => {
          //   setLastVote(vote);
          let newVote = vote;
          if (vote === 1) {
            // setVote(0);
            newVote = 0;
          } else {
            // setVote(1);
            newVote = 1;
          }

          postReq.mutate(
            {
              endPoint: 'posts-or-comments/vote',
              data: { id: props.postId, is_post: props.isPost, vote: newVote },
            },
            {
              onSuccess: () => {
                setVote(newVote);
                setVoteCount(voteCount + newVote - props.vote);
              },
              onError: () => {
                setVote(props.vote);
              },
            }
          );
        }}
      />
      <Typography
        variant='paragraph'
        className={`${vote === -1 ? 'text-violet' : vote === 1 ? 'text-orange' : 'text-black'}`}
      >
        {voteCount}
      </Typography>
      <ArrowDownIcon
        color={vote === -1 ? 'violet' : '#888'}
        strokeWidth={6.5}
        className={`w-[25px] cursor-pointer ${vote === -1 ? 'text-violet' : 'text-[#888]'}`}
        onClick={() => {
          let newVote = vote;

          if (vote === -1) {
            // setVote(0);
            newVote = 0;
          } else {
            // setVote(-1);
            newVote = -1;
          }
          // const { id, isPost, rank } = req.body;
          console.log(newVote);

          postReq.mutate(
            {
              endPoint: 'posts-or-comments/vote',
              data: { id: props.postId, is_post: props.isPost, vote: newVote },
            },
            {
              onSuccess: () => {
                console.log(voteCount, newVote, props.vote, 'midooo');
                setVote(newVote);
                setVoteCount(voteCount + newVote - props.vote);
              },
              onError: () => {
                setVote(props.vote);
              },
            }
          );
        }}
      />
    </div>
  );
};
const PostHeader = ({
  avatar,
  communityNameWithPrefix,
  usernameWithPrefix,
  createdAt,
  isPost,
}: {
  avatar: string;
  communityNameWithPrefix: string;
  usernameWithPrefix: string;
  createdAt: Date;
  isPost: boolean;
}) => {
  return (
    <div className='flex justify-start items-center gap-2 pt-0'>
      {avatar && (
        <>
          {avatar ? (
            <Avatar
              variant='circular'
              alt={name}
              src={avatar}
              //   style={{ width: '30px', height: '30px' }}
              className='h-7 w-7'
            />
          ) : (
            <CommunityIcon className='h-5 w-5' />
          )}
        </>
      )}
      <div>
        <div className='flex items-center gap-1'>
          <Typography
            variant='small'
            className='font-body -tracking-tight text-xs font-bold text-black'
          >
            <Link
              to={`/${communityNameWithPrefix}`}
              className='hover:underline'
            >
              {communityNameWithPrefix}
            </Link>
          </Typography>
          <span className='relative -top-0.5 text-gray-600'>{'•'}</span>
          <Typography
            variant='small'
            className='font-body -tracking-tight text-xs text-gray-600'
          >
            {isPost ? 'Posted' : 'Commented'} by{' '}
            {usernameWithPrefix + ' ' + getTimeDifferenceAsString(createdAt)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const PostBody = ({ post }: { post: PostType }) => {
  return (
    <div className='flex justify-between'>
      <div className='w-full'>
        <Typography
          variant='h5'
          className='text-gray-500 my-2 flex items-center gap-2'
        >
          {post.title}
          {post.spoiler_flag && (
            <span className='border-[1px] border-gray-600 rounded-sm py-[1px] px-[2px] text-sm  '>
              spoiler
            </span>
          )}
          {post.nsfw_flag && (
            <span className='border-[1px] border-orange text-orange rounded-sm py-[1px] px-[2px] text-sm  '>
              nsfw
            </span>
          )}
        </Typography>
        {post.type == 'text' && post.description && (
          <Typography className='text-black'>{post.description}</Typography>
        )}
        {post.type == 'url' && post.link_url && (
          <Link to={post.link_url}>
            <Typography className='text-purple-600 hover:underline'>
              {post.link_url}
            </Typography>
          </Link>
        )}
        {post.type == 'polls' && <PollPostContainer post={post} />}
      </div>
      {post.type == 'image_and_videos' && post?.images?.[0] && (
        <div className='flex w-32 justify-end items-center gap-1'>
          <img
            src={post?.images?.[0].link}
            alt='post'
            className='object-cover rounded-md w-32 h-24'
          />
        </div>
      )}
    </div>
  );
};
const CommentBody = ({ comment }: { comment: CommentType }) => {
  return (
    <div>
      <div>
        <Typography variant='h5' className='text-gray-500 my-2'>
          {comment.post_id}
        </Typography>
      </div>
    </div>
  );
};
const PostFooter = ({ post }: { post: PostType }) => {
  return (
    <div className='flex flex-col gap-2 mt-2'>
      <Typography variant='small' className='text-gray-600 text-xs'>
        {post.comments_count}
        {' comments'}
      </Typography>
      {(post.moderator_details.removed_flag ||
        post.moderator_details.spammed_flag) && (
        <div className='bg-deep-orange-100 py-2 px-3 rounded-md'>
          <Typography variant='small' className='font-bold'>
            Removed{post.moderator_details.spammed_flag && ' as spam'}
          </Typography>
          <Typography variant='small'>
            <Link
              to={
                '/' +
                addPrefixToUsername(
                  post.moderator_details.spammed_by ||
                    post.moderator_details.removed_by ||
                    '',
                  'user'
                )
              }
              className='hover:underline cursor-pointer'
            >
              {addPrefixToUsername(
                post.moderator_details.spammed_by ||
                  post.moderator_details.removed_by ||
                  '',
                'user'
              )}
            </Link>

            {' ' +
              getTimeDifferenceAsString(post.moderator_details.removed_date)}
          </Typography>
        </div>
      )}
      <div className='flex gap-3'>
        {post.moderator_details.removed_flag === true &&
          !post.moderator_details.removed_removal_reason && (
            <RoundedButton>Add Removal Reason</RoundedButton>
          )}
        {!post.moderator_details.approved_flag && (
          <RoundedButton>
            <CheckIcon className='w-4' />
            Approve
          </RoundedButton>
        )}
        {!post.moderator_details.removed_flag && (
          <RoundedButton>
            <XMarkIcon className='w-4' />
            Remove
          </RoundedButton>
        )}
        <PostOptions post={post} />
      </div>
    </div>
  );
};
const PostCard = ({ post }: { post: PostType }) => {
  console.log(post.post_in_community_flag != undefined, 'isPost');

  return (
    <div className='border-[1px] border-gray-500 rounded-md py-2 px-3 flex'>
      <div className='flex gap-4 w-full'>
        <Vote
          postId={post._id}
          vote={post.vote}
          voteCount={post.upvotes_count - post.downvotes_count}
          isPost={post.post_in_community_flag != undefined}
        />
        <div className='flex-1'>
          <PostHeader
            isPost={post.post_in_community_flag != undefined}
            avatar={post.avatar}
            communityNameWithPrefix={addPrefixToUsername(
              post.community_name || '',
              'community'
            )}
            createdAt={post.created_at}
            usernameWithPrefix={addPrefixToUsername(
              post.username || '',
              'user'
            )}
          />
          <PostBody post={post} />
          <PostFooter post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
