import React, { MouseEventHandler, ReactNode, useState } from 'react';
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
import { useMutation, useQuery } from 'react-query';
import { fetchRequest, patchRequest, postRequest } from '../../../API/User';
import {
  Avatar,
  Typography,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button,
  Dialog,
  DialogHeader,
  IconButton,
  DialogBody,
  Input,
  DialogFooter,
  Select,
  Option,
} from '@material-tailwind/react';
import { CommunityIcon } from '../../../assets/icons/Icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { ReportModal, ThankYouModal } from '../../Messaging/Containers/Message';
import RoundedButton from '../../../Components/RoundedButton';

function RoundedButt(props: {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        props.onClick();
      }}
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

const AddRemovalModal = (props: {
  handleOpen: () => void;
  open: boolean;
  post: PostType;
}) => {
  const [reason, setReason] = useState('');
  const [reasonMessage, setReasonMessage] = useState<string>('');
  const [modNote, setModNote] = useState<string>('');

  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();
  const { community_name } = useParams();
  const removalReasonsRes = useQuery('getremovalreasons', () =>
    fetchRequest(`communities/get-removal-reasons/${community_name}`)
  );
  console.log(reason, 'remmm');

  const postReq = useMutation(postRequest, {
    onSuccess: () => {
      // setTrigger(!trigger);
      // setIsError(false);
      // setAlertMessage('User Settings Updated Successfully');
    },
    onError: (error) => {
      const errorObj = JSON.parse(error.message);

      setTrigger(!trigger);
      setIsError(true);
      setAlertMessage(errorObj.data);
    },
  });

  return (
    <>
      <Dialog size='md' open={props.open} handler={props.handleOpen}>
        <DialogHeader className='!block text-center border-b border-lines-color p-5'>
          <h2 className='flex items-center'>Add a removal reason</h2>
          <IconButton
            color='blue-gray'
            size='sm'
            variant='text'
            onClick={(e) => {
              props.handleOpen();
              e.stopPropagation();
            }}
            className='!absolute right-[10px] top-[10px]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className='flex gap-6 p-5 flex-col'>
          {removalReasonsRes.isSuccess && (
            <div className='w-full'>
              <Select
                value={reason}
                name='remReasons'
                label='REASON FOR REMOVAL'
                className='font-semibold'
              >
                {removalReasonsRes.data?.data.map((reason, i) => (
                  <Option
                    className='font-semibold'
                    value={reason.removal_reason_title}
                    key={reason._id}
                    onClick={(e) => {
                      e.stopPropagation();

                      setReason(reason.removal_reason_title);
                      setReasonMessage(reason.reason_message);
                    }}
                  >
                    {i + 1 + '. ' + reason.removal_reason_title}
                  </Option>
                ))}
                {/* <Option>hi</Option> */}
              </Select>
            </div>
          )}
          {reason && (
            <textarea
              className='w-full h-36 border-2 rounded-md px-3 py-2'
              value={reasonMessage}
            />
          )}
        </DialogBody>
        <DialogFooter className='flex flex-col bg-gray-200'>
          <div className='w-full'>
            <Typography color='black' className='mb-2' variant='small'>
              {'Mod note (Only mods will see this note)'}
            </Typography>
            <input
              value={modNote}
              onChange={(e) => {
                setModNote(e.target.value);
              }}
              className='w-full border-2 rounded-md px-3 py-2'
              placeholder='This is a short note for your mod team on why the content was removed.'
            />
          </div>
          <div className=' flex justify-end p-5 gap-2 w-full'>
            <RoundedButton
              buttonBorderColor='border-blue-light'
              buttonColor='bg-inherit'
              buttonText='Cancel'
              buttonTextColor='text-blue-light'
              onClick={(e) => {
                e.stopPropagation();

                setModNote('');
                setReason('');
                setReasonMessage('');
                props.handleOpen();
              }}
            />
            <RoundedButton
              buttonBorderColor='border-blue-light'
              buttonColor='bg-blue-light'
              buttonText='Submit'
              buttonTextColor='text-white'
              disabled={!reason}
              onClick={(e) => {
                postReq.mutate({
                  endPoint: `object-item/${community_name}`,
                  data: {
                    item_id: props.post.post_id || props.post._id,
                    item_type:
                      props.post.post_in_community_flag != undefined
                        ? 'post'
                        : 'comment',
                    objection_type: 'reported',
                    objection_type_value: reason,
                  },
                }); //not implemented
                e.stopPropagation();

                setModNote('');
                setReason('');
                setReasonMessage('');
                props.handleOpen();
              }}
            />
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

const PostOptions = ({
  post,
  isPost,
  handleModOps,
  setRepModal,
}: {
  post: PostType;
  isPost: boolean;
  handleModOps: (
    option: 'approve' | 'remove' | 'spammed' | 'reported',
    type: 'post' | 'comment'
  ) => void;
  setRepModal: (rep: boolean) => void;
}) => {
  const postReq = useMutation(postRequest);
  const patchReq = useMutation(patchRequest);
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  // const { user } = useSession();

  const handleSharePost = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/r/${post.community_name}/comments/${post.post_in_community_flag ? post._id : post.post_id}/${post.title || post.post_title}/`
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
    postReq.mutate({
      endPoint: 'users/hide-unhide-post',
      data: {
        id: post._id,
      },
    });
  };

  return (
    <>
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
          {!post.moderator_details.removed_flag &&
            // !post.moderator_details.reported_flag &&
            !post.moderator_details.spammed_flag && (
              <MenuItem
                className='py-3 flex gap-2 items-center'
                onClick={(e) => {
                  e.stopPropagation();

                  handleModOps(
                    'spammed',
                    post.post_in_community_flag == undefined
                      ? 'comment'
                      : 'post'
                  );
                }}
              >
                <XMarkIcon className='w-5 h-5' />
                <span>Remove as Spam</span>
              </MenuItem>
            )}
          <MenuItem
            className='py-3 flex gap-2 items-center'
            onClick={(e) => {
              e.stopPropagation();

              handleLockUnlockPost(post.post_in_community_flag != undefined);
            }}
          >
            <LockClosedIcon className='w-5 h-5' />
            <span>
              {!post.locked_flag ? 'Lock' : 'Unlock'}{' '}
              {post.post_in_community_flag == undefined ? 'Thread' : 'Comments'}
            </span>
          </MenuItem>
          {isPost && (
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                console.log('nsfw');

                handleNSFWFlag();
              }}
              className='py-3 flex gap-2 items-center'
            >
              <img src={eighteenPic} className='w-5 h-5' />
              <span>{!post.nsfw_flag ? 'Mark' : 'Unmark'} as NSFW</span>
            </MenuItem>
          )}

          <MenuItem
            onClick={(e) => {
              e.stopPropagation();

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
            onClick={(e) => {
              e.stopPropagation();
              handleSharePost();
            }}
          >
            <ShareIcon className='w-5 h-5' />
            <span>Share</span>
          </MenuItem>
          <MenuItem
            className='py-3 flex gap-2 items-center'
            onClick={(e) => {
              e.stopPropagation();

              setRepModal(true);
            }}
          >
            <FlagIcon className='w-5 h-5' />
            <span>Report</span>
          </MenuItem>
          {isPost && (
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleHideUnhidePost();
              }}
              className='py-3 flex gap-2 items-center'
            >
              <EyeSlashIcon className='w-5 h-5' />
              <span>Hide</span>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

const Vote = (props: {
  post: PostType;
  postId: string;
  // voteCount: number;
  isPost: boolean;
}) => {
  // const [vote, setVote] = React.useState(props.post.vote);
  //   const [lastVote, setLastVote] = React.useState(0);
  // const [voteCount, setVoteCount] = React.useState(props.voteCount);
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();
  const postReq = useMutation(postRequest);
  //   console.log(props.vote, 'aaaa');

  return (
    <div className=' flex flex-col items-center'>
      <ArrowUpIcon
        strokeWidth={6.5}
        className={`w-[25px] cursor-pointer ${props.post.vote === 1 ? 'text-orange' : 'text-[#888]'}`}
        onClick={(e) => {
          e.stopPropagation();

          const lastVote = props.post.vote;
          let newVote = props.post.vote;
          if (props.post.vote === 1) {
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
                props.post.upvotes_count =
                  props.post.upvotes_count + newVote - props.post.vote;
                props.post.vote = newVote;
              },
              onError: () => {
                props.post.vote = lastVote;
              },
            }
          );
        }}
      />
      <Typography
        variant='paragraph'
        className={`${props.post.vote === -1 ? 'text-violet' : props.post.vote === 1 ? 'text-orange' : 'text-black'}`}
      >
        {props.post.upvotes_count - props.post.downvotes_count}
      </Typography>
      <ArrowDownIcon
        color={props.post.vote === -1 ? 'violet' : '#888'}
        strokeWidth={6.5}
        className={`w-[25px] cursor-pointer ${props.post.vote === -1 ? 'text-violet' : 'text-[#888]'}`}
        onClick={(e) => {
          e.stopPropagation();

          let newVote = props.post.vote;
          const lastVote = props.post.vote;

          if (props.post.vote === -1) {
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
                // console.log(voteCount, newVote, props.post.vote, 'midooo');
                props.post.upvotes_count =
                  props.post.upvotes_count + newVote - props.post.vote;
                props.post.vote = newVote;
              },
              onError: () => {
                props.post.vote = lastVote;
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
              src={
                avatar ||
                'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
              }
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
          {post.title || post.post_title}
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
        {post.post_in_community_flag == undefined && post.description && (
          <Typography className='text-black'>{post.description}</Typography>
        )}
        {post.type == 'url' && post.link_url && (
          <Typography className='text-purple-600 hover:underline'>
            <Link to={post.link_url}>{post.link_url}</Link>
          </Typography>
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
// const CommentBody = ({ comment }: { comment: CommentType }) => {
//   return (
//     <div>
//       <div>
//         <Typography variant='h5' className='text-gray-500 my-2'>
//           {comment.post_id}
//         </Typography>
//       </div>
//     </div>
//   );
// };
const PostFooter = ({
  post,
  isPost,
  setRemModal,
  setRepModal,
  page,
}: {
  post: PostType;
  isPost: boolean;
  setRemModal: (rem: boolean) => void;
  setRepModal: (rep: boolean) => void;
  page: string;
}) => {
  const postReq = useMutation(postRequest);
  const { user } = useSession();

  const handleModOps = (
    option: 'approve' | 'remove' | 'spammed' | 'reported',
    type: 'post' | 'comment'
    // page: 'edited' | 'removed' | 'unmoderated'
  ) => {
    if (option == 'approve' || option == 'remove') {
      postReq.mutate(
        {
          endPoint: `communities/handle-unmoderated-item/${post.community_name}`,
          data: {
            item_id: post._id,
            item_type: type,
            action: option,
          },
        },
        {
          onSuccess: () => {
            if (option == 'approve') {
              post.moderator_details.approved_flag = true;
              post.moderator_details.approved_by = user?.username;
              post.moderator_details.approved_date = new Date().toISOString();
              post.moderator_details.removed_flag = false;
              post.moderator_details.spammed_flag = false;
              post.moderator_details.reported_flag = false;
            } else if (option == 'remove') {
              post.moderator_details.removed_flag = true;
              post.moderator_details.removed_by = user?.username;
              post.moderator_details.removed_date = new Date().toISOString();
              post.moderator_details.approved_flag = false;
              // post.moderator_details.spammed_flag = false;
              // post.moderator_details.reported_flag = false;
            }
          },
        }
      );
    } else {
      postReq.mutate(
        {
          endPoint: `communities/object-item/${post.community_name}`,
          data: {
            item_id: post._id,
            item_type: type,
            objection_type: option,
          },
        },
        {
          onSuccess: () => {
            if (option == 'reported') {
              post.moderator_details.reported_flag = true;
              post.moderator_details.reported_by = user?.username;
              // post.moderator_details.r = new Date();
              post.moderator_details.removed_flag = false;
              post.moderator_details.spammed_flag = false;
              post.moderator_details.approved_flag = false;
            } else {
              post.moderator_details.spammed_flag = true;
              post.moderator_details.spammed_by = user?.username;
              post.moderator_details.spammed_date = new Date().toISOString();
              post.moderator_details.removed_flag = false;
              post.moderator_details.reported_flag = false;
              post.moderator_details.approved_flag = false;
            }
          },
        }
      );
    }
  };
  console.log(post.moderator_details.removed_removal_reason, 'remreason');

  return (
    <div className='flex flex-col gap-2 mt-2'>
      {isPost && (
        <Typography variant='small' className='text-gray-600 text-xs'>
          {post.comments_count}
          {' comments'}
        </Typography>
      )}
      {(post.moderator_details.removed_flag ||
        post.moderator_details.spammed_flag ||
        post.moderator_details.approved_flag) && (
        <div
          className={`${post.moderator_details.approved_flag ? 'bg-green-100' : 'bg-deep-orange-100'} py-2 px-3 rounded-md`}
        >
          <Typography variant='small' className='font-bold'>
            {post.moderator_details.approved_flag ? 'Approved' : 'Removed'}
            {post.moderator_details.spammed_flag && ' as spam'}
            {post.moderator_details.removed_removal_reason &&
              ': ' + post.moderator_details.removed_removal_reason}
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
            </Link>{' '}
            {post.moderator_details.approved_flag &&
              getTimeDifferenceAsString(
                new Date(post.moderator_details.approved_date || '')
              )}
            {post.moderator_details.removed_flag &&
              getTimeDifferenceAsString(
                new Date(post.moderator_details.removed_date || '')
              )}
            {post.moderator_details.spammed_flag &&
              getTimeDifferenceAsString(
                new Date(post.moderator_details.spammed_date || '')
              )}
            {/* {post.moderator_details.spammed_flag && ' as spam'}
            {' ' +
              getTimeDifferenceAsString(
                post.moderator_details.spammed_date ||
                  post.moderator_details.removed_date
              )} */}
          </Typography>
        </div>
      )}
      <div className='flex gap-3'>
        {post.moderator_details.removed_flag === true &&
          !post.moderator_details.removed_removal_reason && (
            <RoundedButt
              onClick={(e) => {
                setRemModal(true);
                e.stopPropagation();
              }}
            >
              Add Removal Reason
            </RoundedButt>
          )}
        {!post.moderator_details.approved_flag && (
          <RoundedButt
            onClick={() => {
              handleModOps('approve', isPost ? 'post' : 'comment');
            }}
          >
            <CheckIcon className='w-4' />
            Approve
          </RoundedButt>
        )}
        {!post.moderator_details.removed_flag &&
          // !post.moderator_details.reported_flag &&
          !post.moderator_details.spammed_flag && (
            <RoundedButt
              onClick={() => {
                handleModOps('remove', isPost ? 'post' : 'comment');
              }}
            >
              <XMarkIcon className='w-4' />
              Remove
            </RoundedButt>
          )}
        <PostOptions
          post={post}
          isPost={post.post_in_community_flag != undefined}
          handleModOps={handleModOps}
          setRepModal={setRepModal}
        />
      </div>
    </div>
  );
};
const PostCard = ({ post, page }: { post: PostType; page: string }) => {
  const [remModal, setRemModal] = useState(false);
  const [repModal, setRepModal] = useState(false);
  const [thankModal, setThankModal] = useState(false);
  console.log(post.post_in_community_flag != undefined, 'isPost');
  const navigate = useNavigate();
  return (
    <>
      <AddRemovalModal
        open={remModal}
        handleOpen={() => {
          setRemModal(!remModal);
        }}
      />
      <ReportModal
        handleOpen={() => {
          setRepModal(!repModal);
        }}
        handleThankyouModal={() => {
          setThankModal(!thankModal);
        }}
        id={post._id}
        open={repModal}
        senderType='user'
        type='post'
        username={post.username}
        isPost={post.post_in_community_flag != undefined}
      />
      <ThankYouModal
        handleOpen={() => {
          setThankModal(!thankModal);
        }}
        open={thankModal}
        senderUsername={post.username}
      />

      <div
        className='border-[1px] border-gray-500 rounded-md py-2 px-3 flex cursor-pointer hover:border-black'
        onClick={() => {
          navigate(
            `/r/${post.community_name}/comments/${post.post_id || post._id}/${post.title || post.post_title}`
          );
        }}
      >
        <div className='flex gap-4 w-full'>
          <Vote
            postId={post._id}
            post={post}
            // voteCount={post.upvotes_count - post.downvotes_count}
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
            <PostFooter
              post={post}
              isPost={post.post_in_community_flag != undefined}
              setRemModal={setRemModal}
              setRepModal={setRepModal}
              page={page}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
