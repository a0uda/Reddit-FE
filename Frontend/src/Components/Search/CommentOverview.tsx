import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import CommunityBadge from '../CommunityBadge';
import { dateDuration, formatNumber } from '../../utils/helper_functions';
import { CommentType, PostType } from '../../types/types';
import { Link } from 'react-router-dom';

const CommentOverview = ({
  post,
  comment,
}: {
  post: PostType;
  comment: CommentType;
}) => {
  return (
    <>
      <Link
        to={`/user/${post.username}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`}
      >
        <Card
          className='relative w-full px-4 hover:bg-neutral-200 flex justify-between gap-2 m-0 p-0 py-2'
          shadow={false}
        >
          <div>
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
                <Typography variant='small' className='text-xs'>
                  {dateDuration(new Date(post.created_at))}
                </Typography>
              </div>
            </CardHeader>
            <CardBody className='flex flex-col space-y-2 overflow-hidden p-0 py-2'>
              <Typography variant='h5' className='font-normal text-black'>
                {post.title}
              </Typography>
              {/* TODO: Add Comment Here */}
              <Comment comment={comment} />
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
        </Card>
      </Link>
    </>
  );
};

const Comment = ({ comment }: { comment: CommentType }) => {
  return (
    <Card
      className='relative w-full px-4 hover:bg-neutral-200 flex justify-between gap-2 m-0 p-0 py-2'
      shadow={false}
    >
      <div>
        <CardHeader
          shadow={false}
          floated={false}
          className='flex flex-row items-center justify-between gap-2 m-0 bg-inherit'
        >
          <div className='flex flex-row items-center justify-between gap-1 m-0'>
            <CommunityBadge
              name={comment.community_name ?? ''}
              username={comment.username}
            />
            <span className='relative -top-0.5'>•</span>
            <Typography variant='small' className='text-xs'>
              {dateDuration(new Date(comment.created_at))}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className='flex flex-col space-y-2 overflow-hidden p-0 py-2'>
          <Typography variant='h5' className='font-normal text-black'>
            {comment.description}
          </Typography>
          <Typography
            variant='small'
            className='text-xs text-gray-600 space-x-2'
          >
            <span>
              {formatNumber(comment.upvotes_count - comment.downvotes_count)}{' '}
              votes
            </span>
          </Typography>
        </CardBody>
      </div>
    </Card>
  );
};

export default CommentOverview;
