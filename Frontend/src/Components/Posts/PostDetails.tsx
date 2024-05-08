import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Carousel,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import CommunityBadge from '../CommunityBadge';
import UserBadge from '../UserBadge';
import { cn, dateDuration } from '../../utils/helper_functions';
import PostOptions from './PostOptions';
import InteractionButtons from './InteractionButtons';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import { CommentType, CommunityType, PostType } from '../../types/types';
import { useEffect, useState } from 'react';
import LoadingProvider from '../LoadingProvider';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Comment from './Comment';
import AddComment from './AddComment';
import { useParams } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const PostDetails = ({ post }: { post?: PostType }) => {
  const [showNsfw, setShowNsfw] = useState(!post?.nsfw_flag);
  const [showSpoiler, setShowSpoiler] = useState(!post?.spoiler_flag);
  console.log('post.nsfw_flag', post?.nsfw_flag);
  console.log('post.spoiler_flag', post?.spoiler_flag);

  const [community, setCommunity] = useState<CommunityType | undefined>();

  const url = window.location.href;
  useQuery({
    queryKey: ['communityPostDetails', post?.community_name, url],
    queryFn: () =>
      fetchRequest(`communities/get-community-view/${post?.community_name}`),
    onSuccess: (data) => {
      const community: CommunityType = data.data;
      console.log(community);
      setCommunity(community);
    },
    onError: () => {
      // Handle error here
      console.error('Error occurred while fetching community data');
      return;
    },
  });
  const { id: postId } = useParams();

  const [comments, setComments] = useState<CommentType[] | undefined>();
  const commentsResponse = useQuery({
    queryKey: ['comments', comments, url],
    queryFn: () => fetchRequest(`posts/get-comments?id=${postId}`),
    onSuccess: (data) => {
      const comments: CommentType[] = data.data;
      setComments(
        comments.sort((a, b) => b.created_at.localeCompare(a.created_at))
      );
    },
    enabled: !!post,
  });

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
                <div className='flex flex-col justify-between m-0'>
                  <div className='flex flex-row items-center justify-between gap-1 m-0'>
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
                        // page={page}
                        page='post'
                      />
                    )}
                    {!community && <UserBadge username={post.username} />}
                    <span className='relative -top-0.5'>•</span>
                    <Typography variant='small' className='text-xs'>
                      {dateDuration(new Date(post.created_at))}
                    </Typography>
                  </div>
                </div>
              </div>
              <div>
                <PostOptions saved={post.saved} />
              </div>
            </CardHeader>
            <CardBody className='flex flex-col justify-between gap-2 m-0 p-0'>
              <div className='flex flex-col justify-between space-y-2 overflow-hidden'>
                <Typography variant='h5' className='mb-2 text-black'>
                  {post.title}
                </Typography>
              </div>
              <Typography
                variant='paragraph'
                className='text-black'
                // dangerouslySetInnerHTML={{
                //   __html: post.description || '',
                // }}
              >
                {post.description}
              </Typography>
              {post.images && post.images.length > 1 && (
                <>
                  <Carousel
                    className='rounded-xl'
                    prevArrow={({ handlePrev }) => (
                      <IconButton
                        variant='text'
                        color='white'
                        size='lg'
                        onClick={handlePrev}
                        className='!absolute top-2/4 left-4 -translate-y-2/4 bg-black/50'
                      >
                        <ChevronLeftIcon
                          className='h-6 w-6'
                          strokeWidth={2.5}
                        />
                      </IconButton>
                    )}
                    nextArrow={({ handleNext }) => (
                      <IconButton
                        variant='text'
                        color='white'
                        size='lg'
                        onClick={handleNext}
                        className='!absolute top-2/4 !right-4 -translate-y-2/4 bg-black/50'
                      >
                        <ChevronRightIcon
                          className='h-6 w-6'
                          strokeWidth={2.5}
                        />
                      </IconButton>
                    )}
                    navigation={({ setActiveIndex, activeIndex, length }) => (
                      <div className='absolute bottom-0 left-2/4 z-50 flex -translate-x-2/4 gap-2 bg-black/50 p-1 rounded-full'>
                        {new Array(length).fill('').map((_, i) => (
                          <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-full transition-all content-[''] ${
                              activeIndex === i
                                ? 'w-6 bg-white'
                                : 'w-4 bg-white/50'
                            }`}
                            onClick={() => setActiveIndex(i)}
                          />
                        ))}
                      </div>
                    )}
                  >
                    {post.images.map((image, index) => (
                      <div
                        key={index}
                        className='relative'
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <div className='relative h-[50vh] flex justify-center rounded-sm bg-blue-gray-900'>
                          <img
                            src={image.path}
                            alt={image.caption ?? 'Post Image'}
                            className='object-contain'
                          />
                          {image.caption && (
                            <div className='absolute w-11/12 bottom-4 bg-neutral-black/50 p-1 px-2 mx-4 rounded-md'>
                              <Typography
                                variant='small'
                                className='text-white'
                              >
                                {image.caption}
                              </Typography>
                            </div>
                          )}
                          <div
                            className={cn(
                              'absolute w-full h-full top-0',
                              !showNsfw || !showSpoiler
                                ? 'blur-sm bg-black/50'
                                : ''
                            )}
                          ></div>
                        </div>
                        {!showNsfw && (
                          <button
                            className='absolute top-1/2 left-1/2 bg-neutral-black text-neutral-white rounded-full px-2 py-1'
                            onClick={() => setShowNsfw(true)}
                          >
                            View NSFW
                          </button>
                        )}
                        {!showSpoiler && (
                          <button
                            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-black text-neutral-white rounded-full px-2 py-1'
                            onClick={() => setShowSpoiler(true)}
                          >
                            View Spolier
                          </button>
                        )}
                      </div>
                    ))}
                  </Carousel>
                </>
              )}
              {post.images && post.images.length === 1 && (
                <>
                  <div
                    className='relative'
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className='relative h-[50vh] flex justify-center rounded-sm bg-blue-gray-900'>
                      <img
                        src={post.images?.[0].path}
                        alt={post.images?.[0].caption ?? 'Post Image'}
                        className={cn(
                          'object-contain rounded-md',
                          !showNsfw || !showSpoiler ? 'blur-sm' : ''
                        )}
                      />
                      {post.images?.[0].caption && (
                        <div className='absolute w-11/12 bottom-4 bg-neutral-black/50 p-1 px-2 mx-4 rounded-md'>
                          <Typography variant='small' className='text-white'>
                            {post.images?.[0].caption}
                          </Typography>
                        </div>
                      )}
                    </div>
                    <div
                      className={cn(
                        'absolute w-full h-full top-0',
                        !showNsfw || !showSpoiler ? 'blur-sm bg-black/50' : ''
                      )}
                    ></div>
                    {!showNsfw && (
                      <button
                        className='absolute top-1/2 left-1/2 bg-neutral-black text-neutral-white rounded-full px-2 py-1'
                        onClick={() => setShowNsfw(true)}
                      >
                        View NSFW
                      </button>
                    )}
                    {!showSpoiler && (
                      <button
                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-black text-neutral-white rounded-full px-2 py-1'
                        onClick={() => setShowSpoiler(true)}
                      >
                        View Spolier
                      </button>
                    )}
                  </div>
                </>
              )}
            </CardBody>
            <CardFooter className='px-0'>
              <InteractionButtons
                id={post._id}
                upvotes={post.upvotes_count}
                downvotes={post.downvotes_count}
                comments_replies={post.comments_count}
                refLink={`/r/${post.community_name}/comments/${post._id}/${post.title
                  .split(' ')
                  .splice(0, 10)
                  .join('_')}/`}
                myVote={post.vote}
                isReposted={post.is_reposted_flag}
              />
            </CardFooter>
          </Card>
        </>
      )}
      {/* Add Comment */}
      <div className='my-2'>
        <AddComment postId={postId!} />
      </div>
      <LoadingProvider
        error={commentsResponse.isError}
        isLoading={commentsResponse.isLoading}
      >
        <>
          {comments &&
            comments.map((comment) => {
              return (
                !comment.is_reply && (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    showButton={true}
                  />
                )
              );
            })}
        </>
      </LoadingProvider>
    </>
  );
};

export default PostDetails;
