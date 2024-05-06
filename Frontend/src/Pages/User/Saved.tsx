import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';
import Comment from '../../Components/Posts/Comment';
import PostPreview from '../../Components/Posts/PostPreview';
import { useState } from 'react';
import useSession from '../../hooks/auth/useSession';
import { CommentType, PostType } from '../../types/types';

function Saved() {
  const [response, setResponse] = useState<(PostType | CommentType)[]>([]);

  // // Pagination
  // const [page, setPage] = useState(1);
  // const [noMoreData, setNoMoreData] = useState(false);
  // const { ref: lastElementRef, inView } = useInView();

  // useEffect(() => {
  //   if (inView && !noMoreData) {
  //     setPage((prevPageNumber) => prevPageNumber + 1);
  //   }
  // }, [inView, noMoreData]);

  const { isError, isLoading } = useQuery(
    ['userComments', 'comments', 'posts', 'listings'], // , page
    async () => {
      const res = await fetchRequest(`users/saved-posts-and-comments`);
      const tmp = [...res.data.posts, ...res.data.comments];
      // if (tmp.length === 0) {
      //   setNoMoreData(true);
      //   return;
      // }
      setResponse((prev) => [...prev, ...tmp]);
    }
  );
  const { user } = useSession();
  return (
    <>
      {response.length > 0 && (
        <>
          {response
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((content) => (
              // ref={lastElementRef}
              <div key={content._id}>
                {!('post_id' in content) ? (
                  <PostPreview
                    page='profile'
                    post={content}
                    isMyPost={content.username == user?.username}
                  />
                ) : (
                  //uncomment when deployed reem
                  <Comment
                    key={content._id}
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
        {response.length === 0 ? (
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
