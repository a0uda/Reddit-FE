import { useMutation } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';
import Comment from '../../Components/Posts/Comment';
import PostPreview from '../../Components/Posts/PostPreview';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowUpIcon,
  ArrowUturnRightIcon,
  ChatBubbleBottomCenterIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import useSession from '../../hooks/auth/useSession';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CommentType, PostType } from '../../types/types';

function Overview() {
  const { user } = useSession();
  const { username } = useParams();

  const [response, setResponse] = useState<{
    posts: PostType[];
    comments: CommentType[];
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [myData, setMyData] = useState(false);
  const fetchReq = useMutation({
    mutationKey: 'getOverview',
    mutationFn: fetchRequest,
  });

  // Pagination
  const [page, setPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false);
  const { ref: lastElementRef, inView } = useInView();

  useEffect(() => {
    if (inView && !noMoreData) {
      setPage((prevPageNumber) => prevPageNumber + 1);
    }
  }, [inView, noMoreData]);

  useEffect(() => {
    if (user?.username && !response) {
      console.log('gowa eluseeffect', user?.username, response);
      setIsLoading(true);
      fetchReq.mutate(`users/overview/${username}?page=${page}&pageSize=10`, {
        onSuccess: (data) => {
          setIsLoading(false);
          if (data.data.length === 0) {
            setNoMoreData(true);
            return;
          }
          //console.log('upvote', data.data.posts.upvote_rate,data.data.posts.up);
          setResponse((prev) => [...prev?.posts, ...data.data]);
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
      {myData ? (
        <Link
          to={`/submit`}
          className='flex rounded-full border justify-center items-center text-sm border-neutral-black w-32'
        >
          <div className='gap-2 flex py-2 justify-center items-center text-black font-semibold'>
            <PlusIcon strokeWidth={2.5} className='h-3.5 w-3.5' />
            Create Post
          </div>
        </Link>
      ) : (
        <></>
      )}
      {response && (
        <>
          {response.posts
            .concat(response.comments)
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((content) => (
              <div ref={lastElementRef} key={content._id}>
                {content.is_post ? (
                  <div>
                    <PostPreview
                      page='profile'
                      post={content}
                      isMyPost={content.username == user?.username}
                    />
                    {myData ? (
                      <>
                        <div className='text-black m-2 text-sm'>
                          Lifetime Performance
                        </div>
                        <div className='flex flex-row border-b-[1px]'>
                          <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                            <div className='text-black text-xl font-bold '>
                              {content.user_details.total_views === 0
                                ? 'N/A'
                                : content.user_details.total_views}
                            </div>
                            <div className='text-xs  gap-2 flex '>
                              <EyeIcon strokeWidth={2.5} className='h-4 w-4' />
                              Total Views
                            </div>
                          </div>

                          <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                            <div className='text-black text-xl font-bold '>
                              {content.user_details.upvote_rate.toFixed(1)}%
                            </div>
                            <div className='text-xs  gap-2 flex '>
                              <ArrowUpIcon
                                strokeWidth={2.5}
                                className='h-4 w-4'
                              />
                              Upvote Rate
                            </div>
                          </div>

                          <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                            <div className='text-black text-xl font-bold '>
                              {content.comments_count}
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
                              {content.user_details.total_shares}
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
                ) : (
                  //uncomment when deployed reem
                  <Comment
                    key={content.id}
                    comment={content}
                    showButton={true}
                  />

                  //<PostPreview key={content.id} post={content} />
                )}
              </div>
            ))}
        </>
      )}
      <LoadingProvider error={false} isLoading={false}>
        {error ? <div className='text-center'>Error...</div> : null}
        {isLoading ? <div className='text-center'>Loading...</div> : null}
        {noMoreData ? (
          <>
            <hr className='border-neutral-muted' />
            <div className='text-center my-5'>No more posts to show</div>
          </>
        ) : null}
      </LoadingProvider>
    </>
  );
}
export default Overview;
