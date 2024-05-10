import { useMutation } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';
import Comment from '../../Components/Posts/Comment';
import PostPreview from '../../Components/Posts/PostPreview';
import { Link, useParams } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import useSession from '../../hooks/auth/useSession';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CommentType, PostType } from '../../types/types';
import Metadata from './Metadata';

function Overview() {
  const { user } = useSession();
  const { username } = useParams();

  const [response, setResponse] = useState<(PostType | CommentType)[]>([]);
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
    if (user?.username) {
      setIsLoading(true);
      fetchReq.mutate(`users/overview/${username}?page=${page}&pageSize=5`, {
        onSuccess: (data) => {
          setIsLoading(false);
          if (data?.data) {
            const tmp = [...data.data.posts, ...data.data.comments];
            if (tmp.length === 0) {
              setNoMoreData(true);
              return;
            } else {
              setNoMoreData(false);
            }
            //console.log('upvote', data.data.posts.upvote_rate,data.data.posts.up);
            setResponse((prev) => [...prev, ...tmp]);
            // setResponse(data.data);
            if (username == user?.username) {
              setMyData(true);
            }
          }
        },
        onError: () => {
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
      {response.length > 0 && (
        <>
          {response
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((content) => (
              <div ref={lastElementRef} key={content._id}>
                {!('post_id' in content) ? (
                  <div>
                    <PostPreview
                      page='profile'
                      post={content}
                      isMyPost={content.username == user?.username}
                    />
                    {myData ? (
                      <>
                        <Metadata content={content} />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  //uncomment when deployed reem
                  <Comment
                    key={content._id}
                    comment={content as CommentType}
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
