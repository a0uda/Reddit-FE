import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Radio,
} from '@material-tailwind/react';
import {
  addPrefixToUsername,
  dateDuration,
  getTimeDifferenceAsString,
} from '../../utils/helper_functions';
import CommunityBadge from '../CommunityBadge';
import UserBadge from '../UserBadge';
import shieldPic from '../../assets/shieldPic.svg';
import InteractionButtons from './InteractionButtons';
import { CommunityType, PostType } from '../../types/types';
import PostOptions from './PostOptions';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRequest, patchRequest, postRequest } from '../../API/User';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import {
  CheckIcon,
  XMarkIcon,
  LockClosedIcon,
  LockOpenIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import eighteenPic from '../../assets/18Pic.svg';
import useSession from '../../hooks/auth/useSession';
import RoundedButton from '../RoundedButton';
import { useAlert } from '../../Providers/AlertProvider';
import EditPostComment from './EditPostComment';

const LinkPostContainer = (props: { post: PostType }) => {
  return (
    <div className='flex flex-col justify-center gap-1'>
      {props.post.description && (
        <Typography
          variant='paragraph'
          className='mb-2 font-normal text-[#2A3C42]'
          // dangerouslySetInnerHTML={{ __html: props.post.description }}
        >
          {props.post.description}
        </Typography>
      )}
      <Link
        to={props.post.link_url || '/'}
        className='text-purple-600 hover:underline'
      >
        {props.post.link_url}
      </Link>
    </div>
  );
};

export const PollPostContainer = (props: { post: PostType }) => {
  const [chosenOptionId, setChosenOptionId] = useState<string>(
    props.post.poll_vote
  );
  const [alreadyVoted, setAlreadyVoted] = useState<boolean>(
    !!props.post.poll_vote
  );
  const postReq = useMutation(postRequest);
  const { trigger, setTrigger, setAlertMessage, setIsError } = useAlert();

  return (
    <div>
      {props.post.description && (
        <Typography
          variant='paragraph'
          className='mb-2 font-normal text-[#2A3C42]'
          dangerouslySetInnerHTML={{ __html: props.post.description }}
        >
          {/* <></> */}
          {/* {props.post.description} */}
        </Typography>
      )}
      <div className='bg-white rounded-lg flex flex-col gap-2 p-2 border-2 border-lines-color mb-1 w-full'>
        <div className='flex flex-col gap-1'>
          {props.post.polls &&
            props.post.polls.map((poll, i) => (
              <Radio
                name={props.post._id}
                label={
                  poll.options + ' ' + '(Number of votes: ' + poll.votes + ')'
                }
                value={poll._id}
                checked={poll._id == chosenOptionId}
                key={poll._id}
                crossOrigin={undefined}
                onChange={(e) => {
                  console.log(e.target.value);
                  setChosenOptionId(e.target.value);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                disabled={alreadyVoted}
              />
            ))}
        </div>
        <div className='flex gap-2 items-center'>
          <RoundedButton
            buttonBorderColor='border-lines-color'
            buttonColor='bg-lines-color'
            buttonText='Vote'
            buttonTextColor='text-black'
            disabled={!chosenOptionId || alreadyVoted}
            onClick={(e) => {
              e.stopPropagation();
              postReq.mutate(
                {
                  endPoint: 'posts/poll-vote',
                  data: { id: props.post._id, option_id: chosenOptionId },
                },
                {
                  onSuccess: () => {
                    setAlreadyVoted(true);
                  },
                  onError: () => {
                    setIsError(true);
                    setAlreadyVoted(false);
                    setTrigger(!trigger);
                    setAlertMessage('Unable to vote!');
                  },
                }
              );
            }}
          />
          <span>
            {props.post.polls_voting_is_expired_flag
              ? 'Expired!'
              : "Didn't expire yet!"}
          </span>
        </div>
      </div>
    </div>
  );
};

const SpoilerContainer = (props: {
  handleViewSpoiler: () => void;
  spoilerPost: PostType;
  sharedPost: boolean;
  text: string;
  title: string;
}) => {
  console.log('spoilerPost', props.title);

  return (
    <>
      <div>
        {!props.sharedPost && (
          <Typography variant='h5' className='mb-2 font-normal text-black'>
            {props.title}
          </Typography>
        )}
        {props.spoilerPost.spoiler_flag ||
          (props.spoilerPost.nsfw_flag && (
            <div className='flex gap-2 mb-2'>
              {props.spoilerPost.spoiler_flag && (
                <div className='flex gap-1 items-center'>
                  <ExclamationTriangleIcon
                    strokeWidth={3}
                    className='w-4 h-4 font-bold text-black'
                  />
                  <Typography
                    variant='small'
                    className='font-bold text-black text-xs'
                  >
                    SPOILER
                  </Typography>
                </div>
              )}
              {props.spoilerPost.nsfw_flag && (
                <div className='flex gap-1 items-center'>
                  <img
                    src={eighteenPic}
                    // strokeWidth={3}
                    className='w-4 h-4 font-bold text-black'
                  />
                  <Typography
                    variant='small'
                    className='font-bold text-black text-xs'
                  >
                    NSFW
                  </Typography>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className='bg-gray-800 h-20 rounded-lg flex items-center justify-center mb-1'>
        {' '}
        <RoundedButton
          buttonBorderColor='border-black'
          buttonColor='bg-black'
          buttonText={props.text}
          buttonTextColor='text-white'
          onClick={(e) => {
            props.handleViewSpoiler();
            e.stopPropagation();
          }}
        />
      </div>
    </>
  );
};

const SharedPostContainer = (props: {
  sharedPostId: string;
  post: PostType;
}) => {
  const [sharedPost, setSharedPost] = useState<PostType>();
  const [sharedPostSpoiler, setSharedPostSpoiler] = useState<boolean>();
  const [sharedViewNSFW, setSharedViewNSFW] = useState<boolean>();

  const [name, setName] = useState<string>();
  useQuery({
    queryKey: ['post', 'listings', props.sharedPostId],
    queryFn: () => fetchRequest(`posts/get-post?id=${props.sharedPostId}`),
    onSuccess: (data) => {
      console.log(data.data, 'sharedPost');
      setSharedPost(data.data);
      setName(
        addPrefixToUsername(data.data.community_name || '', 'moderator') ||
          addPrefixToUsername(data.data.username, 'user') ||
          ''
      );
      setSharedPostSpoiler(data.data.spoiler_flag);
    },
    retry(failureCount, error) {
      console.log(failureCount, 'failureCount');

      return !sharedPost;
    },
    // onError: (error) => {
    //   console.error(error, 'Error fetching shared post');
    // },

    // refetchOnMount: false,
  });
  // console.log(props.sharedPostId, 'sharedPostId');
  useEffect(() => {
    if (sharedPost) {
      console.log(sharedPost, props.sharedPostId, 'Updated SharedPost'); // Check if `sharedPost` is updated
    }
  }, [sharedPost]);
  console.log(sharedPost, props.sharedPostId, 'Updated SharedPost barra'); // Check if `sharedPost` is updated

  return (
    <>
      <div>
        <Typography variant='h5' className='mb-2 font-normal text-black'>
          {props.post.title}
        </Typography>
        {props.post?.spoiler_flag ||
          (props.post?.nsfw_flag && (
            <div className='flex gap-2 mb-2'>
              {props.post?.spoiler_flag && (
                <div className='flex gap-1 items-center'>
                  <ExclamationTriangleIcon
                    strokeWidth={3}
                    className='w-4 h-4 font-bold text-black'
                  />
                  <Typography
                    variant='small'
                    className='font-bold text-black text-xs'
                  >
                    SPOILER
                  </Typography>
                </div>
              )}
              {props.post?.nsfw_flag && (
                <div className='flex gap-1 items-center'>
                  <img
                    src={eighteenPic}
                    // strokeWidth={3}
                    className='w-4 h-4 font-bold text-black'
                  />
                  <Typography
                    variant='small'
                    className='font-bold text-black text-xs'
                  >
                    NSFW
                  </Typography>
                </div>
              )}
            </div>
          ))}
      </div>
      {sharedPost && (
        <div className='bg-white rounded-lg flex flex-col p-2 border-2 border-lines-color mb-1'>
          {sharedPost?.spoiler_flag && sharedPostSpoiler && (
            <div className='flex flex-col justify-start pt-0'>
              <div className='flex gap-2'>
                <Typography
                  variant='small'
                  className='font-body -tracking-tight text-gray-600'
                >
                  <Link to={`/r/${name}`} className='hover:underline'>
                    {name}
                  </Link>
                </Typography>
                <span className='relative -top-0.5'>•</span>
                <Typography variant='small' className=''>
                  {dateDuration(new Date(sharedPost?.created_at))}
                </Typography>
              </div>
              <Typography variant='h5' className='text-blue'>
                {sharedPost?.title}
              </Typography>
            </div>
          )}
          <div>
            {sharedPost?.spoiler_flag &&
            sharedPostSpoiler &&
            (sharedPost?.description ||
              sharedPost?.images?.length != 0 ||
              sharedPost.polls?.length != 0 ||
              sharedPost.link_url) ? (
              <SpoilerContainer
                handleViewSpoiler={() => {
                  // console.log(viewSpoiler, 'spoilerrrr');

                  setSharedPostSpoiler(false);
                }}
                spoilerPost={sharedPost}
                sharedPost={true}
                text='View Spoiler'
                title={props.post.title}
              />
            ) : sharedPost?.nsfw_flag &&
              sharedViewNSFW &&
              (sharedPost?.description ||
                sharedPost?.images?.length != 0 ||
                sharedPost.polls?.length != 0 ||
                sharedPost.link_url) ? (
              <SpoilerContainer
                handleViewSpoiler={() => {
                  // console.log(viewSpoiler, 'spoilerrrr');

                  setSharedViewNSFW(false);
                }}
                spoilerPost={props.post}
                sharedPost={true}
                text='View NSFW Content'
                title={props.post.title}
              />
            ) : (
              <div className='flex gap-7 justify-between pb-2'>
                <div className='flex flex-col justify-start space-y-2 overflow-hidden w-full'>
                  <div>
                    <div className='flex flex-col justify-start pt-0'>
                      <div className='flex gap-2'>
                        <Typography
                          variant='small'
                          className='font-body -tracking-tight text-gray-600'
                        >
                          <Link to={`/r/${name}`} className='hover:underline'>
                            {name}
                          </Link>
                        </Typography>
                        <span className='relative -top-0.5'>•</span>
                        <Typography variant='small' className=''>
                          {dateDuration(new Date(sharedPost?.created_at || ''))}
                        </Typography>
                      </div>
                    </div>
                    <Typography variant='h5' className='mb-2 text-blue'>
                      {sharedPost?.title}
                    </Typography>
                    {(sharedPost?.spoiler_flag || sharedPost?.nsfw_flag) && (
                      <div className='flex gap-2 mb-2'>
                        {sharedPost?.spoiler_flag && (
                          <div className='flex gap-1 items-center'>
                            <ExclamationTriangleIcon
                              strokeWidth={3}
                              className='w-4 h-4 font-bold text-black'
                            />
                            <Typography
                              variant='small'
                              className='font-bold text-black text-xs'
                            >
                              SPOILER
                            </Typography>
                          </div>
                        )}
                        {sharedPost?.nsfw_flag && (
                          <div className='flex gap-1 items-center'>
                            <img
                              src={eighteenPic}
                              // strokeWidth={3}
                              className='w-4 h-4 font-bold text-black'
                            />
                            <Typography
                              variant='small'
                              className='font-bold text-black text-xs'
                            >
                              NSFW
                            </Typography>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className='w-full'>
                    {sharedPost?.moderator_details.removed_flag ||
                    sharedPost?.moderator_details.spammed_flag ? (
                      '[removed]'
                    ) : sharedPost?.type == 'text' ? (
                      <div className='flex justify-between gap-7'>
                        <div className='flex items-center'>
                          <Typography
                            variant='paragraph'
                            className='mb-2 font-normal text-[#2A3C42]'
                            dangerouslySetInnerHTML={{
                              __html: sharedPost.description || '',
                            }}
                          >
                            {/* <></> */}
                            {/* {sharedPost?.description} */}
                          </Typography>
                        </div>
                      </div>
                    ) : sharedPost?.type == 'polls' ? (
                      <PollPostContainer post={sharedPost} />
                    ) : sharedPost?.type == 'url' ? (
                      <LinkPostContainer post={sharedPost} />
                    ) : null}
                  </div>
                </div>
                {!(
                  sharedPost?.moderator_details.removed_flag ||
                  sharedPost?.moderator_details.spammed_flag
                ) &&
                  sharedPost?.images?.[0] && (
                    <Tooltip
                      content={
                        sharedPost?.images?.length > 1
                          ? `Click to show ${sharedPost?.images?.length} images`
                          : 'Click to show image'
                      }
                    >
                      <div className='flex w-32 justify-end items-center gap-1'>
                        <img
                          src={sharedPost?.images?.[0].path}
                          alt='post'
                          className='object-cover rounded-md w-32 h-24'
                        />
                      </div>
                    </Tooltip>
                  )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const PostPreview = ({
  post,
  page,
  isMyPost,
}: {
  post: PostType;
  page: 'profile' | 'home' | 'community';
  isMyPost?: boolean;
}) => {
  // TODO Fetch Community
  const [community, setCommunity] = useState<CommunityType | undefined>();
  const [link, setLink] = useState<string>(
    `/u/${post.username}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`
  );
  const [viewSpoiler, setViewSpoiler] = useState<boolean>(
    post.spoiler_flag ||
      ((post.description?.length || 0) > 0 &&
        post.images?.length != 0 &&
        post.polls?.length != 0 &&
        (post.link_url?.length || 0) > 0)
  );
  const [viewNSFW, setViewNSFW] = useState<boolean>(
    post.nsfw_flag ||
      ((post.description?.length || 0) > 0 &&
        post.images?.length != 0 &&
        post.polls?.length != 0 &&
        (post.link_url?.length || 0) > 0)
  );
  const { user } = useSession();
  const navigate = useNavigate();
  const [canEdit, setCanEdit] = useState(false);

  const handleCanEditPost = () => {
    if (isMyPost == true) {
      if (post.description != '') {
        setCanEdit(true);
      }
    }
  };
  useEffect(() => {
    handleCanEditPost();
  }, []);
  useQuery({
    queryKey: ['communityPostPreview', post.community_name],
    queryFn: () =>
      fetchRequest(`communities/get-community-view/${post.community_name}`),
    onSuccess: (data) => {
      console.log(data);

      const community: CommunityType = data.data;
      console.log(community);
      setCommunity(community);
      setLink(
        `/r/${post.community_name}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`
      );
    },
  });

  const postReq = useMutation(postRequest);
  const patchReq = useMutation(patchRequest);

  const handleDeletePost = () => {
    postRequest({
      endPoint: 'posts/delete',
      data: { id: post._id },
    });
  };
  const handleApproveDisapprovePost = (approve: boolean) => {
    if (approve) {
      postReq.mutate(
        {
          endPoint: 'posts/approve',
          data: {
            id: post._id,
          },
        },
        {
          onSuccess: () => {
            post.moderator_details.approved_flag = true;
            post.moderator_details.approved_by = user?.username;
            post.moderator_details.approved_date = new Date();
            post.moderator_details.removed_flag = false;
          },
        }
      );
    } else {
      postReq.mutate(
        {
          endPoint: 'posts/remove',
          data: {
            id: post._id,
          },
        },
        {
          onSuccess: () => {
            post.moderator_details.removed_flag = true;
            post.moderator_details.removed_by = user?.username;
            post.moderator_details.removed_date = new Date();
            post.moderator_details.approved_flag = false;
          },
        }
      );
    }
  };
  const handleSharePost = (caption: string) => {
    postReq.mutate({
      endPoint: 'posts/share-post',
      data: {
        id: post._id,
        post_in_community_flag: post.post_in_community_flag,
        community_name: post.community_name,
        caption: caption,
      },
    });
  };
  const handleReportPost = () => {
    postReq.mutate(
      {
        endPoint: 'posts/report',
        data: {
          id: post._id,
        },
      }
      // {
      //   onSuccess: () => {
      //     // post.moderator_details.approved_flag = true;
      //     // post.moderator_details.approved_by = user?.username;
      //     // post.moderator_details.approved_date = new Date();
      //   },
      // }
    );
  };
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
  const handleSpoilPost = () => {
    patchReq.mutate(
      {
        endPoint: 'posts-or-comments/spoiler',
        newSettings: {
          is_post: true,
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
  const handleLockUnlockPost = () => {
    patchReq.mutate(
      {
        endPoint: 'posts-or-comments/lock-unlock',
        newSettings: {
          is_post: true,
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
  const [showEditPost, setShowEditPost] = useState(false);
  const handleEditPost = () => {
    setShowEditPost(!showEditPost);
  };
  const handleSaveUnsavePost = () => {
    patchReq.mutate(
      {
        endPoint: 'posts-or-comments/save',
        newSettings: {
          is_post: true,
          id: post._id,
        },
      },
      {
        onSuccess: () => {
          post.saved = !post.saved;
        },
      }
    );
  };
  const handleAllowDisallowReplies = () => {
    patchReq.mutate(
      {
        endPoint: 'posts/allow-replies',
        newSettings: {
          id: post._id,
        },
      },
      {
        onSuccess: () => {
          post.allowreplies_flag = !post.allowreplies_flag;
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

  // const link = community
  //   ? `/r/${post.community_name}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`
  //   : `/user/${post.username}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`;

  return (
    <>
      {!showEditPost ? (
        <div
          className='relative'
          onClick={() => {
            navigate(link);
          }}
        >
          <Card
            className='relative w-full px-4 py-2 hover:bg-neutral-200'
            shadow={false}
          >
            <CardHeader
              shadow={false}
              floated={false}
              className='flex flex-row items-center justify-between gap-2 m-0 bg-inherit'
            >
              <div className='flex flex-row items-center justify-between gap-1 m-0'>
                {/* <CommunityBadge
              name={
                addPrefixToUsername(post.community_name || '', 'moderator') ||
                addPrefixToUsername(post.username, 'user') ||
                ''
              }
              // joined={community?.joined_flag}
              avatar={post.avatar} //3dlt
              // coverImage={community?.banner_picture}
              // members={community?.members_count}
              // description={community?.description}
            /> */}
                {community && (
                  <CommunityBadge
                    name={post.community_name ?? ''}
                    joined={community?.joined_flag}
                    avatar={community?.profile_picture}
                    coverImage={community?.banner_picture}
                    description={community?.description}
                    members={community?.members_count}
                    // online={Community.communityOnline}
                    username={post.username}
                    page={page}
                    // page='home'
                  />
                )}
                {!community && <UserBadge username={post.username} />}
                <span className='relative -top-0.5'>•</span>
                <Typography variant='small' className=''>
                  {dateDuration(new Date(post.created_at))}
                </Typography>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <PostOptions
                  saved={post.saved}
                  NSFW={post.nsfw_flag}
                  spoiler={post.spoiler_flag}
                  myPost={isMyPost || false}
                  canEdit={canEdit}
                  page={page}
                  handleEditPost={handleEditPost}
                  handleSavePost={handleSaveUnsavePost}
                  handleHidePost={handleHideUnhidePost}
                  handleReportPost={handleReportPost}
                  handleDeletePost={handleDeletePost}
                  handleSpoiler={handleSpoilPost}
                  handleNSFW={handleNSFWFlag}
                />
              </div>
            </CardHeader>
            <CardBody className='m-0 p-0'>
              <div>
                {post.spoiler_flag &&
                viewSpoiler &&
                (post.description ||
                  post.images?.length != 0 ||
                  post.link_url ||
                  post.polls?.length != 0 ||
                  post.is_reposted_flag) ? (
                  <SpoilerContainer
                    handleViewSpoiler={() => {
                      console.log(viewSpoiler, 'spoilerrrr');

                      setViewSpoiler(false);
                    }}
                    spoilerPost={post}
                    sharedPost={false}
                    text='View Spoiler'
                    title={post.title}
                  />
                ) : post.nsfw_flag &&
                  viewNSFW &&
                  (post.description ||
                    post.images?.length != 0 ||
                    post.link_url ||
                    post.polls?.length != 0 ||
                    post.is_reposted_flag) ? (
                  <SpoilerContainer
                    handleViewSpoiler={() => {
                      console.log(viewSpoiler, 'spoilerrrr');

                      setViewNSFW(false);
                    }}
                    spoilerPost={post}
                    sharedPost={false}
                    text='View NSFW Content'
                    title={post.title}
                  />
                ) : post.is_reposted_flag && post.reposted ? (
                  <SharedPostContainer
                    sharedPostId={post.reposted.original_post_id}
                    post={post}
                  />
                ) : (
                  <div className='flex gap-7 justify-between pb-2'>
                    <div className='flex flex-col justify-start space-y-2 overflow-hidden w-full'>
                      <div>
                        <Typography
                          variant='h5'
                          className='mb-2 font-normal text-black'
                        >
                          {post.title}
                        </Typography>
                        {(post.spoiler_flag || post.nsfw_flag) && (
                          <div className='flex gap-2 mb-2'>
                            {post.spoiler_flag && (
                              <div className='flex gap-1 items-center'>
                                <ExclamationTriangleIcon
                                  strokeWidth={3}
                                  className='w-4 h-4 font-bold text-black'
                                />
                                <Typography
                                  variant='small'
                                  className='font-bold text-black text-xs'
                                >
                                  SPOILER
                                </Typography>
                              </div>
                            )}
                            {post.nsfw_flag && (
                              <div className='flex gap-1 items-center'>
                                <img
                                  src={eighteenPic}
                                  // strokeWidth={3}
                                  className='w-4 h-4 font-bold text-black'
                                />
                                <Typography
                                  variant='small'
                                  className='font-bold text-black text-xs'
                                >
                                  NSFW
                                </Typography>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className='w-full'>
                        {post.moderator_details.removed_flag ||
                        post.moderator_details.spammed_flag ? (
                          '[removed]'
                        ) : post.type == 'text' ? (
                          <div className='flex justify-between gap-7'>
                            <div className='flex items-center'>
                              <Typography
                                variant='paragraph'
                                className='mb-2 font-normal text-[#2A3C42]'
                                dangerouslySetInnerHTML={{
                                  __html: post.description || '',
                                }}
                              >
                                {/* <></> */}
                                {/* {post.description} */}
                              </Typography>
                            </div>
                          </div>
                        ) : post.type == 'polls' ? (
                          <PollPostContainer post={post} />
                        ) : (
                          <LinkPostContainer post={post} />
                        )}
                      </div>
                    </div>
                    {!(
                      post.moderator_details.removed_flag ||
                      post.moderator_details.spammed_flag
                    ) &&
                      post.images?.[0] && (
                        <Tooltip
                          content={
                            post.images?.length > 1
                              ? `Click to show ${post.images?.length} images`
                              : 'Click to show image'
                          }
                        >
                          <div className='flex items-center gap-1'>
                            <img
                              src={post.images?.[0].path}
                              alt='post'
                              className='object-cover rounded-md w-32 h-24'
                            />
                          </div>
                        </Tooltip>
                      )}
                  </div>
                )}

                <div className='flex justify-between'>
                  <InteractionButtons
                    id={post._id}
                    upvotes={post.upvotes_count}
                    downvotes={post.downvotes_count}
                    comments_replies={post.comments_count}
                    refLink={`/r/${post.community_name}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`}
                    myVote={post.vote}
                  />
                  {isMyPost && (
                    <div className=' flex justify-end gap-4'>
                      {post.moderator_details.approved_flag == false &&
                        post.moderator_details.removed_flag == false && (
                          <div
                            className='flex gap-2 items-center'
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Tooltip content='Approve'>
                              <IconButton
                                className='bg-[#EAEDEF] text-black'
                                onClick={() => {
                                  handleApproveDisapprovePost(true);
                                }}
                              >
                                <CheckIcon className='w-5' />
                              </IconButton>
                            </Tooltip>

                            <Tooltip content='Remove'>
                              <IconButton
                                className='bg-[#EAEDEF] text-black'
                                onClick={() => {
                                  handleApproveDisapprovePost(false);
                                }}
                              >
                                <XMarkIcon className='w-5' />
                              </IconButton>
                            </Tooltip>
                          </div>
                        )}
                      {post.moderator_details.approved_flag === true && (
                        <div className='flex gap-2 items-center'>
                          <Tooltip
                            content={`At ${post.moderator_details.approved_date}`}
                          >
                            <div className='flex items-center gap-2'>
                              <div className='text-sm'>
                                Approved{' '}
                                {getTimeDifferenceAsString(
                                  new Date(
                                    post.moderator_details.approved_date || ''
                                  )
                                )}
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                      )}
                      {post.moderator_details.removed_flag === true && (
                        <div className='flex gap-2 items-center'>
                          <Tooltip
                            content={`At ${post.moderator_details.removed_date}`}
                          >
                            <div className='text-sm'>
                              Removed{' '}
                              {getTimeDifferenceAsString(
                                new Date(
                                  post.moderator_details.removed_date || ''
                                )
                              )}
                            </div>
                          </Tooltip>
                        </div>
                      )}
                      {post.moderator_details.spammed_flag === true && (
                        <div className='flex gap-2 items-center'>
                          <Tooltip
                            content={`${addPrefixToUsername(post.moderator_details.spammed_by || '', 'user')}`}
                          >
                            <div className='text-sm'>Removed</div>
                          </Tooltip>
                        </div>
                      )}

                      <Menu placement='bottom-end'>
                        <MenuHandler
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <IconButton className='bg-[#EAEDEF] text-black'>
                            <img src={shieldPic} />
                          </IconButton>
                        </MenuHandler>
                        <MenuList
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className='p-0 text-foreground min-w-min w-max shadow-lg shadow-black/25'
                        >
                          <MenuItem
                            onClick={() => {
                              handleApproveDisapprovePost(
                                !post.moderator_details.approved_flag
                              );
                            }}
                            className='p-3 flex gap-2 items-center'
                          >
                            {post.moderator_details.approved_flag === true ? (
                              <>
                                <XMarkIcon className='w-5 h-5' />
                                <span>Remove</span>
                              </>
                            ) : (
                              <>
                                <CheckIcon className='w-5 h-5' />
                                <span>Approve</span>
                              </>
                            )}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleLockUnlockPost();
                            }}
                            className='p-3 flex gap-2 items-center'
                          >
                            {post.locked_flag ? (
                              <>
                                <LockClosedIcon className='w-5 h-5' />
                                <span>Unlock comments</span>
                              </>
                            ) : (
                              <>
                                <LockOpenIcon className='w-5 h-5' />
                                <span>Lock comments</span>
                              </>
                            )}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleNSFWFlag();
                            }}
                            className='p-3 flex gap-2 items-center'
                          >
                            <img src={eighteenPic} className='w-5 h-5' />
                            {post.nsfw_flag ? 'Unmark as NSFW' : 'Mark as NSFW'}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleSpoilPost();
                            }}
                            className='p-3 flex gap-2 items-center'
                          >
                            <ExclamationTriangleIcon className='w-5 h-5' />
                            {post.spoiler_flag
                              ? 'Unmark as spoiler'
                              : 'Mark as spoiler'}
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      ) : (
        <>
          <div className='flex flex-row items-center justify-between gap-2 m-0 bg-inherit'>
            <div className='flex flex-row items-center justify-between gap-1 m-0'>
              {/* <CommunityBadge
        name={
          addPrefixToUsername(post.community_name || '', 'moderator') ||
          addPrefixToUsername(post.username, 'user') ||
          ''
        }
        // joined={community?.joined_flag}
        avatar={post.avatar} //3dlt
        // coverImage={community?.banner_picture}
        // members={community?.members_count}
        // description={community?.description}
      /> */}
              {community && (
                <CommunityBadge
                  name={post.community_name ?? ''}
                  joined={community?.joined_flag}
                  avatar={community?.profile_picture}
                  coverImage={community?.banner_picture}
                  description={community?.description}
                  members={community?.members_count}
                  // online={Community.communityOnline}
                  username={post.username}
                  page={page}
                  // page='home'
                />
              )}
              {!community && <UserBadge username={post.username} />}
              <span className='relative -top-0.5'>•</span>
              <Typography variant='small' className=''>
                {dateDuration(new Date(post.created_at))}
              </Typography>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <PostOptions
                saved={post.saved}
                NSFW={post.nsfw_flag}
                spoiler={post.spoiler_flag}
                myPost={isMyPost || false}
                canEdit={canEdit}
                page={page}
                handleEditPost={handleEditPost}
                handleSavePost={handleSaveUnsavePost}
                handleHidePost={handleHideUnhidePost}
                handleReportPost={handleReportPost}
                handleDeletePost={handleDeletePost}
                handleSpoiler={handleSpoilPost}
                handleNSFW={handleNSFWFlag}
              />
            </div>
          </div>
          <Typography variant='h5' className='mb-2 font-normal text-black'>
            {post.title}
          </Typography>
          <EditPostComment
            Id={post._id}
            currentText={post.description}
            isPost={true}
            handleEdit={handleEditPost}
          />
          <InteractionButtons
            id={post._id}
            upvotes={post.upvotes_count}
            downvotes={post.downvotes_count}
            comments_replies={post.comments_count}
            refLink={`/r/${post.community_name}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`}
            myVote={post.vote}
          />
        </>
      )}
    </>
  );
};

export default PostPreview;
