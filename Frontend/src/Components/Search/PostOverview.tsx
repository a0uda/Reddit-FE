import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import CommunityBadge from '../CommunityBadge';
import { cn, dateDuration, formatNumber } from '../../utils/helper_functions';
import { PostType } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UserBadge from '../UserBadge';

const PostOverview = ({ post }: { post: PostType }) => {
  const navigate = useNavigate();
  const [showNsfw, setShowNsfw] = useState(!post.nsfw_flag);
  const [showSpoiler, setShowSpoiler] = useState(!post.spoiler_flag);
  return (
    <>
      <button
        className='w-full'
        onClick={() =>
          navigate(
            post.community_name
              ? `/r/${post.community_name}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`
              : `/u/${post.username}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`
          )
        }
      >
        <Card
          className='relative w-full px-4 hover:bg-neutral-200 flex flex-row justify-between gap-2 m-0 p-0 py-2'
          shadow={false}
        >
          <div>
            <CardHeader
              shadow={false}
              floated={false}
              className='flex flex-row items-center justify-between gap-2 m-0 bg-inherit'
            >
              <div className='flex flex-row items-center justify-between gap-1 m-0'>
                {post.community_name ? (
                  <CommunityBadge
                    name={post.community_name ?? ''}
                    username={post.username}
                  />
                ) : (
                  <UserBadge username={post.username} />
                )}
                <span className='relative -top-0.5'>•</span>
                <Typography variant='small' className='text-xs'>
                  {dateDuration(new Date(post.created_at))}
                </Typography>
              </div>
            </CardHeader>
            <CardBody className='flex flex-col text-left space-y-2 overflow-hidden p-0 py-2'>
              <Typography variant='h5' className='font-normal text-black'>
                {post.title}
              </Typography>
              <Typography
                variant='small'
                className='text-xs text-gray-600 space-x-2'
              >
                <span>
                  {formatNumber(post.upvotes_count - post.downvotes_count)}{' '}
                  votes
                </span>
                <span>•</span>
                <span>{formatNumber(post.comments_count)} comments</span>
              </Typography>
            </CardBody>
          </div>
          {post.images?.[0] && (
            <div
              className='relative'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <img
                src={post.images?.[0].path}
                alt={post.images?.[0].caption}
                className={cn(
                  'object-cover rounded-md w-32 h-24',
                  !showNsfw || !showSpoiler ? 'blur-sm' : ''
                )}
              />
              <div
                className={cn(
                  'absolute w-full h-full top-0',
                  !showNsfw || !showSpoiler ? 'blur-sm bg-black/50' : ''
                )}
              ></div>
              {!showNsfw && (
                <button
                  className='absolute top-8 left-4 bg-neutral-black text-neutral-white rounded-full px-2 py-1'
                  onClick={() => setShowNsfw(true)}
                >
                  View NSFW
                </button>
              )}
              {!showSpoiler && (
                <button
                  className='absolute top-8 left-4 bg-neutral-black text-neutral-white rounded-full px-2 py-1'
                  onClick={() => setShowSpoiler(true)}
                >
                  View Spolier
                </button>
              )}
            </div>
          )}
        </Card>
      </button>
    </>
  );
};

export default PostOverview;
