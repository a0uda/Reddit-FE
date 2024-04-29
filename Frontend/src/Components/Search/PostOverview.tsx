import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import CommunityBadge from '../CommunityBadge';
import { dateDuration, formatNumber } from '../../utils/helper_functions';
import { PostType } from '../../types/types';

const PostOverview = ({ post }: { post: PostType }) => {
  return (
    <>
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
              name={post.community_name ?? ''}
              username={post.username}
            />
            <span className='relative -top-0.5'>•</span>
            <Typography variant='small' className=''>
              {dateDuration(new Date(post.created_at))}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className='flex items-center justify-between gap-2 m-0 p-0'>
          <div className='flex flex-col justify-between space-y-2 overflow-hidden'>
            <Typography variant='h5' className='mb-2 font-normal text-black'>
              {post.title}
            </Typography>
            <Typography variant='small' className='text-gray-600'>
              {formatNumber(post.vote)} votes •{' '}
              {formatNumber(post.comments_count)} comments
            </Typography>
          </div>
          {post.images?.[0] && (
            <img
              src={post.images?.[0].link}
              alt='post'
              className='object-cover rounded-md w-32 h-24'
            />
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default PostOverview;
