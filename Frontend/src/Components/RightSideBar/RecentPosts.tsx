import { useState } from 'react';
import { Card, Typography } from '@material-tailwind/react';
import PostItem from './PostItem';
// import postList from './PostList.ts';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../LoadingProvider';
import { PostType } from '../../types/types';

export function RecentPosts() {
  const [isContentVisible, setContentVisible] = useState(true);

  const { data, isError, isLoading } = useQuery('recent posts data', () =>
    fetchRequest('communities/get-history-posts')
  );
  console.log(data);

  const postList: PostType[] = data?.data ?? [];

  return (
    <>
      {isContentVisible && (
        <div
          style={{
            maxHeight: '88vh',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
          }}
        >
          <Card className='w-72 bg-gray-100 rounded-2xl shadow-none p-0 pt-3 pb-3 min-w-0 mb-3'>
            <div className='flex flex-row justify-between p-4 py-3'>
              <Typography
                variant='small'
                className='p-0 font-body font-semibold uppercase -tracking-tight text-xs text-gray-600'
              >
                RECENT POSTS
              </Typography>
              <button
                // style={{ width: '75px', height: '35px' }}
                className='rounded-full font-body font-thin -tracking-tight text-sm text-blue-900 mx-2'
                onClick={() => setContentVisible(false)}
              >
                Clear
              </button>
            </div>
            <LoadingProvider error={isError} isLoading={isLoading}>
              {postList.map((post, index) => (
                <div key={index}>
                  <PostItem
                    communityCoverImage={post.communityCoverSrc}
                    communityIcon={post.communityAvatarSrc}
                    communityName={post['community-name']}
                    joined={post.joined}
                    communityDescription={post.communityDescription}
                    communityMembers={post.communityMembers}
                    communityOnline={post.communityOnline}
                    postId={post.id}
                    postTitle={post.title}
                    postDescription={post.description}
                    postMediaSrc={post.images[0].link} // show the first image only
                    upvotes={post.upvotes_count}
                    comments={post.comments_count}
                  />
                  {index !== postList.length - 1 && (
                    <div className='w-100 min-h-px mb-4 mt-1 bg-gray-300'></div>
                  )}
                </div>
              ))}
            </LoadingProvider>
          </Card>
        </div>
      )}
    </>
  );
}
