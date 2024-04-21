import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { dateDuration } from '../../utils/helper_functions';
import CommunityBadge from '../CommunityBadge';

import InteractionButtons from './InteractionButtons';
import { CommunityType, PostType } from '../../types/types';
import PostOptions from './PostOptions';
import { Link } from 'react-router-dom';
import { fetchRequest } from '../../API/User';
import { useQuery } from 'react-query';
import { useState } from 'react';

const PostPreview = ({ post }: { post: PostType }) => {
  // TODO Fetch Community
  const [community, setCommunity] = useState<CommunityType | undefined>();

  useQuery({
    queryKey: ['community'],
    queryFn: () =>
      fetchRequest(`communities/get-community-view/${post.community_name}`),
    onSuccess: (data) => {
      const community: CommunityType = data.data;
      console.log(community);
      setCommunity(community);
    },
  });
  console.log('post', post._id);
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
              <CommunityBadge
                name={post.community_name}
                joined={community?.joined_flag}
                avatar={community?.profile_picture}
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
