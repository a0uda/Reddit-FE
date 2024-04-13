import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import CommunityBadge from '../CommunityBadge';
import { dateDuration } from '../../utils/helper_functions';
import PostOptions from './PostOptions';
import InteractionButtons from './InteractionButtons';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import { CommentType, PostType } from '../../types/types';
import { useEffect, useState } from 'react';
import LoadingProvider from '../LoadingProvider';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { CommunityIcon } from '../../assets/icons/Icons';
import Comment from './Comment';

const PostDetails = () => {
  const { id: postId } = useParams();

  // const [community, setCommunity] = useState<PostType | undefined>();
  const [post, setPost] = useState<PostType | undefined>();
  const { isLoading, isError } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchRequest(`posts/get-post/${postId}/`),
    onSuccess: (data) => {
      setPost(data.data);
    },
  });

  const [comments, setComments] = useState<CommentType[] | undefined>();
  const commentsResponse = useQuery({
    queryKey: ['comments', comments],
    queryFn: () => fetchRequest(`posts/get-comments/${postId}/`),
    onSuccess: (data) => {
      setComments(data.data);
    },
    enabled: !!post,
  });

  console.log('comments', comments);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        window.history.back();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <>
      <LoadingProvider error={isError} isLoading={isLoading}>
        {post && (
          <>
            <Card className='w-full px-4 py-2' shadow={false}>
              <CardHeader
                shadow={false}
                floated={false}
                className='flex flex-row items-center justify-between gap-2 m-0 mb-2 bg-inherit'
              >
                <div className='flex items-center justify-between gap-2 m-0'>
                  <IconButton
                    variant='filled'
                    size='md'
                    className='h-10 w-10 hover:shadow-none shadow-none bg-neutral-muted'
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeftIcon className='h-6 w-6 fill-black' />
                  </IconButton>
                  {post.communityAvatarSrc ? (
                    <Avatar
                      variant='circular'
                      alt={post['community-name']}
                      src={post.communityAvatarSrc}
                      className='w-10 h-10'
                    />
                  ) : (
                    <CommunityIcon className='h-5 w-5' />
                  )}
                  <div className='flex flex-col justify-between m-0'>
                    <div className='flex flex-row items-center justify-between gap-1 m-0'>
                      <CommunityBadge
                        name={post['community-name']}
                        joined={post.joined}
                        avatar={post.communityAvatarSrc}
                        displayAvatar={false}
                        coverImage={post.communityCoverSrc}
                        members={post.communityMembers}
                        online={post.communityOnline}
                        description={post.description}
                      />
                      <span className='relative -top-0.5'>•</span>
                      <Typography variant='small' className='text-xs'>
                        {dateDuration(new Date(post.created_at))}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='small' className='text-xs'>
                        {post.username}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div>
                  <PostOptions saved={post.saved} hidden={post.hidden} />
                </div>
              </CardHeader>
              <CardBody className='flex flex-col justify-between gap-2 m-0 p-0'>
                <div className='flex flex-col justify-between space-y-2 overflow-hidden'>
                  <Typography variant='h5' className='mb-2 text-black'>
                    {post.title}
                  </Typography>
                </div>
                <Typography variant='paragraph' className='text-black'>
                  {post.description}
                </Typography>
                {post.images?.[0] && (
                  <img
                    src={post.images?.[0].link}
                    alt='post'
                    className='object-contain rounded-md w-full max-h-[100vw]'
                  />
                )}
              </CardBody>
              <CardFooter className='px-0'>
                <InteractionButtons
                  id={post.id}
                  upvotes={post.upvotes_count}
                  downvotes={post.downvotes_count}
                  comments_replies={post.comments_count}
                  refLink={`/${post['community-name']}/comments/${post.id}/${post.title
                    .split(' ')
                    .splice(0, 10)
                    .join('_')}/`}
                />
              </CardFooter>
            </Card>
          </>
        )}
      </LoadingProvider>
      <LoadingProvider
        error={commentsResponse.isError}
        isLoading={commentsResponse.isLoading}
      >
        <>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
        </>
      </LoadingProvider>
    </>
  );
};

export default PostDetails;
