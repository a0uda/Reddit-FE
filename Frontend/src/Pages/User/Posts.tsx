import { fetchRequest } from '../../API/User';
import LoadingProvider from '../UserSettings/Containers/LoadingProvider';
import { PostType } from '../../types/types';
import { useMutation } from 'react-query';
import {
  EyeIcon,
  ArrowUpIcon,
  ArrowUturnRightIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/outline';
import PostPreview from '../../Components/Posts/PostPreview';
import useSession from '../../hooks/auth/useSession';
import { useEffect, useState } from 'react';

function Posts() {
  const { user } = useSession();
  // const { data, error, isLoading } = useQuery(['posts', 'listings'], () =>
  //   fetchRequest(`users/posts/${user?.username}`)
  // );

  const [response, setResponse] = useState<[PostType]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchReq = useMutation(fetchRequest);
  useEffect(() => {
    if (user?.username) {
      setIsLoading(true);
      fetchReq.mutate(`users/posts/${user?.username}`, {
        onSuccess: (data) => {
          setIsLoading(false);
          console.log('reem', data.data);
          setResponse(data.data);
        },
        onError: (err) => {
          setIsLoading(false); // Set loading state to false on error
          setError(err); // Set error state
        },
      });
    }
  }, [user?.username]);

  return (
    <>
      <LoadingProvider error={error} isLoading={isLoading}>
        {response && (
          <>
            {response.map((post: PostType) => (
              <div key={post._id}>
                <PostPreview page='profile' post={post} />
                <div className='text-black m-2 text-sm'>
                  Lifetime Performance
                </div>
                <div className='flex flex-row border-b-[1px]'>
                  <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                    <div className='text-black text-xl font-bold '>
                      {post.user_details.total_views === 0
                        ? 'N/A'
                        : post.user_details.total_views}
                    </div>
                    <div className='text-xs  gap-2 flex '>
                      <EyeIcon strokeWidth={2.5} className='h-4 w-4' />
                      Total Views
                    </div>
                  </div>

                  <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                    <div className='text-black text-xl font-bold '>
                      {post.user_details.upvote_rate}%
                    </div>
                    <div className='text-xs  gap-2 flex '>
                      <ArrowUpIcon strokeWidth={2.5} className='h-4 w-4' />
                      Upvote Rate
                    </div>
                  </div>

                  <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                    <div className='text-black text-xl font-bold '>
                      {post.user_details.upvote_rate}
                    </div>
                    <div className='text-xs  gap-2 flex '>
                      <ChatBubbleBottomCenterIcon
                        strokeWidth={2.5}
                        className='h-4 w-4'
                      />
                      Comments
                    </div>
                  </div>

                  <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                    <div className='text-black text-xl font-bold '>
                      {post.user_details.total_views}
                    </div>
                    <div className='text-xs  gap-2 flex '>
                      <ArrowUturnRightIcon
                        strokeWidth={2.5}
                        className='h-4 w-4'
                      />
                      Total Shares
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </LoadingProvider>
    </>
  );
}

export default Posts;
