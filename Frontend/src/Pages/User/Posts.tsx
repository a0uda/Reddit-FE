import { fetchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';
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
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

function Posts() {
  const { user } = useSession();
  // const { data, error, isLoading } = useQuery(['posts', 'listings'], () =>
  //   fetchRequest(`users/posts/${user?.username}`)
  // );
  const { username } = useParams();
  const [response, setResponse] = useState<[PostType]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchReq = useMutation(fetchRequest);
  const [myData, setMyData] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false);
  const { ref: lastPostElementRef, inView } = useInView();

  useEffect(() => {
    if (inView && !noMoreData) {
      setPage((prevPageNumber) => prevPageNumber + 1);
    }
  }, [inView, noMoreData]);

  useEffect(() => {
    console.log('posts page: ', page);
    if (user?.username) {
      setIsLoading(true);
      fetchReq.mutate(`users/posts/${username}?page=${page}`, {
        onSuccess: (data) => {
          setIsLoading(false);
          if (data.data.length === 0) {
            setNoMoreData(true);
            return;
          }
          console.log('reem', data.data);
          setResponse(data.data);
          if (username == user?.username) {
            setMyData(true);
          }
        },
        onError: (err) => {
          setIsLoading(false); // Set loading state to false on error
          setError(true); // Set error state
        },
      });
    }
  }, [user?.username, page]);

  return (
    <>
      <LoadingProvider error={false} isLoading={isLoading}>
        {isLoading ? <div className='text-center'>Loading...</div> : null}
        {noMoreData ? (
          <>
            <hr className='border-neutral-muted' />
            <div className='text-center my-5'>No more posts to show</div>
          </>
        ) : null}
      </LoadingProvider>
      {response && (
        <>
          {response.map((post: PostType) => (
            <div ref={lastPostElementRef} key={post._id}>
              <PostPreview page='profile' post={post} isMyPost />
              {myData ? (
                <>
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
                        {post.user_details.upvote_rate.toFixed(1)}%
                      </div>
                      <div className='text-xs  gap-2 flex '>
                        <ArrowUpIcon strokeWidth={2.5} className='h-4 w-4' />
                        Upvote Rate
                      </div>
                    </div>

                    <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                      <div className='text-black text-xl font-bold '>
                        {post.comments_count}
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
                        {post.user_details.total_shares}
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
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Posts;
