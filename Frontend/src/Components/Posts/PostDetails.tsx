import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import CommunityBadge from '../CommunityBadge';
import UserBadge from '../UserBadge';
import { dateDuration } from '../../utils/helper_functions';
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
import NonEditableProvider from '../../Providers/NonEditableProvider';
import PollPostContainer from './PollPostContainer';
import LinkPostContainer from './LinkPostContainer';
import Images from './Images';
import SharedPostContainer from './SharedPostContainer';

const PostDetails = ({ post }: { post?: PostType }) => {
  const [community, setCommunity] = useState<CommunityType | undefined>();

  const url = window.location.href;
  useQuery({
    queryKey: ['communityPostDetails', post?.community_name, url],
    queryFn: () =>
      fetchRequest(`communities/get-community-view/${post?.community_name}`),
    onSuccess: (data) => {
      const community: CommunityType = data?.data;
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
      const comments: CommentType[] = data?.data;
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
            </CardHeader>
            <CardBody className='flex flex-col justify-between gap-2 m-0 p-0'>
              <div className='flex flex-col justify-between space-y-2 overflow-hidden'>
                <Typography variant='h5' className='mb-2 text-black'>
                  {post.title}
                </Typography>
              </div>
              {!(
                post.moderator_details.removed_flag ||
                post.moderator_details.reported_flag ||
                post.moderator_details.spammed_flag
              ) && <NonEditableProvider content={post.description} />}

              <div className='w-full'>
                {post.moderator_details.removed_flag ||
                post.moderator_details.reported_flag ||
                post.moderator_details.spammed_flag ? (
                  '[removed]'
                ) : post.type == 'text' ? (
                  <div className='flex justify-between gap-7'>
                    <div className='flex items-center'>
                      <NonEditableProvider content={post.description} />
                    </div>
                  </div>
                ) : post.type == 'polls' ? (
                  <PollPostContainer post={post} />
                ) : post.type == 'url' ? (
                  <LinkPostContainer post={post} />
                ) : post.is_reposted_flag && post.reposted ? (
                  <SharedPostContainer
                    sharedPostId={post.reposted.original_post_id}
                    post={post}
                  />
                ) : (
                  <Images post={post} />
                )}
              </div>
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
