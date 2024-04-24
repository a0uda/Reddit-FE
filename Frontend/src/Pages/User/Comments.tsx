import { fetchRequest } from '../../API/User';
import { useQuery } from 'react-query';
import LoadingProvider from '../UserSettings/Containers/LoadingProvider';
import { CommentType } from '../../types/types';
import Comment from '../../Components/Posts/Comment';
import useSession from '../../hooks/auth/useSession';

function Comments() {
  const { user } = useSession();
  const { data, error, isLoading } = useQuery(
    ['userComments', 'comments'],
    () => fetchRequest(`users/comments/${user?.username}`)
  );

  return (
    <>
      <LoadingProvider error={error} isLoading={isLoading}>
        {data && (
          <>
            {data.data.map((comment: CommentType) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </>
        )}
      </LoadingProvider>
    </>
  );
}

export default Comments;
