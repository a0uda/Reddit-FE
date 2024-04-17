import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { dateDuration } from '../../utils/helper_functions';
import CommunityBadge from '../CommunityBadge';

import InteractionButtons from './InteractionButtons';
import { PostType } from '../../types/types';
import PostOptions from './PostOptions';
import { Link } from 'react-router-dom';

const PostPreview = ({ post }: { post: PostType }) => {
  // TODO Fetch Community
  // const data = useQuery({
  //   queryKey: ['community', post.community_id],
  //   queryFn: () => fetchRequest('community', post.community_id),
  // });

  return (
    <div className='relative'>
      <Link
        to={`/r/${post.community_name}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`}
        reloadDocument
        // className='absolute inset-0'
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
                name={post.community_name}
                joined={post.joined}
                avatar={post.communityAvatarSrc}
                coverImage={post.communityCoverSrc}
                members={post.communityMembers}
                online={post.communityOnline}
                description={post.description}
              /> */}
              <span className='relative -top-0.5'>•</span>
              <Typography variant='small' className=''>
                {dateDuration(new Date(post.created_at))}
              </Typography>
            </div>
            <div>
              <PostOptions saved={post.saved} hidden={post.hidden} />
            </div>
          </CardHeader>
          <CardBody className='flex items-center justify-between gap-2 m-0 p-0'>
            <div className='flex flex-col justify-between space-y-2 overflow-hidden'>
              <Typography variant='h5' className='mb-2 font-normal text-black'>
                {post.title}
              </Typography>
              <InteractionButtons
                id={post._id}
                upvotes={post.upvotes_count}
                downvotes={post.downvotes_count}
                comments_replies={post.comments_count}
                refLink={`/r/${post.community_name}/comments/${post._id}/${post.title.split(' ').splice(0, 10).join('_')}/`}
              />
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
      </Link>
    </div>
  );
};

export default PostPreview;
