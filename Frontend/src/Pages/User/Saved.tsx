import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../UserSettings/Containers/LoadingProvider';
import Comment from '../../Components/Posts/Comment';
import PostPreview from '../../Components/Posts/PostPreview';

function Saved() {
  const { data, error, isLoading } = useQuery(
    ['userComments', 'comments', 'posts', 'listings'],
    () => fetchRequest('users/saved-posts-and-comments')
  );
  console.log(data);
  return (
    <>
      <LoadingProvider error={error} isLoading={isLoading}>
        {data && (
          <>
            {data.data.map((content) =>
              content.is_post ? (
                <PostPreview post={content} key={content.id} />
              ) : (
                <Comment key={content.id} comment={content} />
              )
            )}
          </>
        )}
      </LoadingProvider>
    </>
  );
}

export default Saved;
