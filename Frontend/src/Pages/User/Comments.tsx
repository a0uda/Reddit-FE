import { fetchRequest } from '../../API/User';
import { useMutation } from 'react-query';
import LoadingProvider from '../../Components/LoadingProvider';
import { CommentType } from '../../types/types';
import Comment from '../../Components/Posts/Comment';
import useSession from '../../hooks/auth/useSession';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

function Comments() {
  const { user } = useSession();
  // const { data, error, isLoading } = useQuery(
  //   ['userComments', 'comments'],
  //   () => fetchRequest(`users/comments/${user?.username}`)
  // );
  const { username } = useParams();

  const [response, setResponse] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchReq = useMutation(fetchRequest);

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
      fetchReq.mutate(`users/comments/${username}?page=${page}`, {
        onSuccess: (data) => {
          setIsLoading(false);
          if (data?.data.length === 0) {
            setNoMoreData(true);
            return;
          }
          console.log('reem', data?.data);
          if (data?.data) {
            setResponse((prev) => [...prev, ...data.data]);
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
      {response && (
        <>
          {response.map((comment: CommentType) => (
            <div ref={lastElementRef} key={comment._id}>
              <Comment comment={comment} showButton={true} />
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
            <div className='text-center my-5'>Nothing to show</div>
          </>
        ) : null}
      </LoadingProvider>
    </>
  );
}

export default Comments;
