import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';
import Comment from '../../Components/Posts/Comment';
import PostPreview from '../../Components/Posts/PostPreview';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useSession from '../../hooks/auth/useSession';

function Saved() {
  // Pagination
  const [page, setPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false);
  const { ref: lastElementRef, inView } = useInView();

  useEffect(() => {
    if (inView && !noMoreData) {
      setPage((prevPageNumber) => prevPageNumber + 1);
    }
  }, [inView, noMoreData]);

  const { data, isError, isLoading } = useQuery(
    ['userComments', 'comments', 'posts', 'listings'],
    async () => {
      const res = await fetchRequest(
        `users/saved-posts-and-comments?page=${page}`
      );
      if (res.data.length === 0) {
        setNoMoreData(true);
        return [];
      }
      return res.data;
    }
  );
  const { user } = useSession();
  console.log(data);
  return (
    <>
      {data && (
        <>
          {data.posts
            .concat(data.comments)
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((content) => (
              <div ref={lastElementRef} key={content._id}>
                {content.is_post ? (
                  <PostPreview
                    page='profile'
                    post={content}
                    isMyPost={content.username == user?.username}
                  />
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
        {isError ? <div className='text-center'>Error...</div> : null}
        {isLoading ? <div className='text-center'>Loading...</div> : null}
        {noMoreData ? (
          <>
            <hr className='border-neutral-muted' />
            <div className='text-center my-5'>Nothing to show</div>
          </>
        ) : null}
      </LoadingProvider>
    </>
  );
}

export default Saved;
