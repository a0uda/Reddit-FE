import { useEffect, useState } from 'react';
import { Card, Typography } from '@material-tailwind/react';
import PostItem from './PostItem';
// import postList from './PostList.ts';
import { useMutation, useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import { PostType } from '../../types/types';
import useSession from '../../hooks/auth/useSession';

export function RecentPosts() {
  const [isContentVisible, setContentVisible] = useState(true);
  const [response, setResponse] = useState<PostType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchReq = useMutation(fetchRequest);
  const { user } = useSession();
  useEffect(() => {
    if (user?.username) {
      setIsLoading(true);
      fetchReq.mutate(`users/history-posts`, {
        onSuccess: (data) => {
          setIsLoading(false);
          console.log('reem', data.data);
          setResponse(data.data.slice(0, 5) ?? []);
        },
        onError: (err) => {
          setIsLoading(false); // Set loading state to false on error
          setError(true); // Set error state
        },
      });
    }
  }, [user?.username]);

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
            {/* <LoadingProvider error={isError} isLoading={isLoading}> */}
            {response?.map((post, index) => (
              <div key={index}>
                <PostItem
                  communityName={post.community_name ?? ''}
                  postId={post._id}
                  postTitle={post.title}
                  postDescription={post.description ?? ''}
                  postMediaSrc={post.images?.[0]?.link ?? ''} // show the first image only
                  upvotes={post.upvotes_count}
                  comments={post.comments_count}
                  username={post.username ?? ''}
                />
                {index !== response.length - 1 && (
                  <div className='w-100 min-h-px mb-4 mt-1 bg-gray-300'></div>
                )}
              </div>
            ))}
            {/* </LoadingProvider> */}
          </Card>
        </div>
      )}
    </>
  );
}
