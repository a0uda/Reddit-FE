import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import {
  addPrefixToUsername,
  dateDuration,
  getTimeDifferenceAsString,
} from '../../utils/helper_functions';
import CommunityBadge from '../CommunityBadge';
import shieldPic from '../../assets/shieldPic.svg';
import InteractionButtons from './InteractionButtons';
import { CommunityType, PostType } from '../../types/types';
import PostOptions from './PostOptions';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fetchRequest, patchRequest, postRequest } from '../../API/User';
import { useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import {
  CheckIcon,
  XMarkIcon,
  LockClosedIcon,
  LockOpenIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import eighteenPic from '../../assets/18Pic.svg';
import useSession from '../../hooks/auth/useSession';
import { CommunityIcon } from '../../assets/icons/Icons';
import RoundedButton from '../RoundedButton';

const PostPreview = ({ post }: { post: PostType }) => {
  // TODO Fetch Community
  const [community, setCommunity] = useState<CommunityType | undefined>();
  const [moderatedCommunities, setModeratedCommunities] = useState<[string]>();
  const [viewSpoiler, setViewSpoiler] = useState<boolean>(post.spoiler_flag);
  const [isMyPost, setIsMyPost] = useState<boolean>();
  const { user } = useSession();
  const navigate = useNavigate();

  useQuery({
    queryKey: ['community'],
    queryFn: () =>
      fetchRequest(`communities/get-community-view/${post.community_name}`),
    onSuccess: (data) => {
      console.log(data);

      const community: CommunityType = data.data;
      console.log(community);
      setCommunity(community);
    },
  });
  useQuery({
    queryKey: ['getModeratedCommunities'],
    queryFn: () => fetchRequest('users/moderated-communities'),
    onSuccess: (data) => {
      console.log(data);
      const moderatedCommunityNames = data?.data.map((com) => com.name);
      // const modCommunity: CommunityType = data.data;
      console.log(moderatedCommunityNames);
      setModeratedCommunities(moderatedCommunityNames);
      setIsMyPost(
        post.username == user?.username ||
          moderatedCommunities?.includes(post.community_name || '')
      );
    },
  });

  const postReq = useMutation(postRequest);
  const patchReq = useMutation(patchRequest);

  const SpoilerContainer = (props: { handleViewSpoiler: () => void }) => {
    return (
      <>
        <div>
          <Typography variant='h5' className='mb-2 font-normal text-black'>
            {post.title}
          </Typography>
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
        </div>
        <div className='bg-gray-800 h-20 rounded-lg flex items-center justify-center mb-1'>
          {' '}
          <RoundedButton
            buttonBorderColor='border-black'
            buttonColor='bg-black'
            buttonText='View Spoiler'
            buttonTextColor='text-white'
            onClick={props.handleViewSpoiler}
          />
        </div>
      </>
    );
  };

  const handleDeletePost = () => {};
  const handleApproveDisapprovePost = (approve: boolean) => {
    if (approve) {
      postReq.mutate({
        endPoint: 'posts/approve',
        data: {
          id: post._id,
        },
      });
    } else {
      postReq.mutate({
        endPoint: 'posts/remove',
        data: {
          id: post._id,
        },
      });
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
    postReq.mutate({
      endPoint: 'posts/report',
      data: {
        id: post._id,
      },
    });
  };
  const handleNSFWFlag = () => {
    patchReq.mutate({
      endPoint: 'posts/marknsfw',
      newSettings: {
        id: post._id,
      },
    });
  };
  const handleSpoilPost = () => {
    patchReq.mutate({
      endPoint: 'posts-or-comments/spoiler',
      newSettings: {
        is_post: true,
        id: post._id,
      },
    });
  };
  const handleLockUnlockPost = () => {
    patchReq.mutate({
      endPoint: 'posts-or-comments/lock-unlock',
      newSettings: {
        is_post: true,
        id: post._id,
      },
    });
  };
  const handleEditPost = (editedText: string) => {
    patchReq.mutate({
      endPoint: 'posts-or-comments/edit-text',
      newSettings: {
        is_post: true,
        id: post._id,
        edited_text: editedText,
      },
    });
  };
  const handleSaveUnsavePost = () => {
    patchReq.mutate({
      endPoint: 'posts-or-comments/save',
      newSettings: {
        is_post: true,
        id: post._id,
      },
    });
  };
  const handleAllowDisallowReplies = () => {
    patchReq.mutate({
      endPoint: 'posts/allow-replies',
      newSettings: {
        id: post._id,
      },
    });
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
    <div
      className='relative'
      onClick={() => {
        // navigate(
        //   `/r/${post.community_name}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`
        // );
      }}
    >
      {/* <Link
        to={`/r/${post.community_name}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`}
        reloadDocument
        // className='absolute inset-0'
      > */}
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
            <CommunityBadge
              name={
                addPrefixToUsername(post.community_name || '', 'moderator') ||
                addPrefixToUsername(post.username, 'user') ||
                ''
              }
              joined={community?.joined_flag}
              avatar={post.avatar} //3dlt
              coverImage={community?.banner_picture}
              members={community?.members_count}
              description={community?.description}
            />
            <span className='relative -top-0.5'>•</span>
            <Typography variant='small' className=''>
              {dateDuration(new Date(post.created_at))}
            </Typography>
          </div>
          <div>
            <PostOptions
              saved={post.saved}
              NSFW={post.nsfw_flag}
              spoiler={post.spoiler_flag}
              myPost={isMyPost}
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
            {!post.spoiler_flag || !viewSpoiler ? (
              <div className='flex gap-7 justify-between pb-2'>
                <div className='flex flex-col justify-between space-y-2 overflow-hidden'>
                  <div>
                    <Typography
                      variant='h5'
                      className='mb-2 font-normal text-black'
                    >
                      {post.title}
                    </Typography>
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
                  </div>

                  <div className='w-full'>
                    {post.moderator_details.removed_flag ||
                    post.moderator_details.spammed_flag
                      ? '[removed]'
                      : post.description && (
                          <div className='flex justify-between gap-7'>
                            <div className='flex items-center'>
                              <Typography
                                variant='paragraph'
                                className='mb-2 font-normal text-[#2A3C42]'
                              >
                                {post.description}
                              </Typography>
                            </div>
                          </div>
                        )}
                  </div>
                </div>
                <div className='flex items-center gap-1'>
                  {post.images?.[0] &&
                    post.images.map((img) => (
                      <img
                        src={img.link}
                        alt='post'
                        className='object-cover rounded-md w-32 h-24'
                        key={img.link}
                      />
                    ))}
                </div>
              </div>
            ) : (
              <SpoilerContainer
                handleViewSpoiler={() => {
                  setViewSpoiler(false);
                }}
              />
            )}
            <div className='flex justify-between'>
              <InteractionButtons
                id={post._id}
                upvotes={post.upvotes_count}
                downvotes={post.downvotes_count}
                comments_replies={post.comments_count}
                refLink={`/r/${post.community_name}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`}
              />
              {isMyPost && (
                <div className=' flex justify-end gap-4'>
                  {post.moderator_details.approved_flag == false &&
                    post.moderator_details.removed_flag == false && (
                      <div className='flex gap-2 items-center'>
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
                        content={`${addPrefixToUsername(post.moderator_details.approved_by || '', 'user')} at ${post.moderator_details.approved_date}`}
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
                        content={`${addPrefixToUsername(post.moderator_details.removed_by || '', 'user')} at ${post.moderator_details.removed_date}`}
                      >
                        <div className='text-sm'>
                          Removed{' '}
                          {getTimeDifferenceAsString(
                            new Date(post.moderator_details.removed_date || '')
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
                    <MenuHandler>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className='bg-[#EAEDEF] text-black'
                      >
                        <img src={shieldPic} />
                      </IconButton>
                    </MenuHandler>
                    <MenuList className='p-0 text-foreground min-w-min w-max shadow-lg shadow-black/25'>
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
      {/* </Link> */}
    </div>
  );
};

export default PostPreview;
