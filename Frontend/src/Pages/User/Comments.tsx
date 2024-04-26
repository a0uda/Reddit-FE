import { fetchRequest } from '../../API/User';
import { useMutation } from 'react-query';
import LoadingProvider from '../../Components/LoadingProvider';
import { CommentType } from '../../types/types';
import Comment from '../../Components/Posts/Comment';
import useSession from '../../hooks/auth/useSession';
import { useEffect, useState } from 'react';

function Comments() {
  const { user } = useSession();
  // const { data, error, isLoading } = useQuery(
  //   ['userComments', 'comments'],
  //   () => fetchRequest(`users/comments/${user?.username}`)
  // );

  const [response, setResponse] = useState<[CommentType]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchReq = useMutation(fetchRequest);
  useEffect(() => {
    if (user?.username) {
      setIsLoading(true);
      fetchReq.mutate(`users/comments/${user?.username}`, {
        onSuccess: (data) => {
          setIsLoading(false);
          console.log('reem', data.data);
          setResponse(data.data);
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
      <LoadingProvider error={error} isLoading={isLoading}>
        {response && (
          <>
            {response.map((comment: CommentType) => (
              <Comment key={comment._id} comment={comment} showButton={true} />
            ))}
          </>
        )}
      </LoadingProvider>
    </>
  );
}

export default Comments;
