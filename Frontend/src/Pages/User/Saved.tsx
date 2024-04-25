import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../UserSettings/Containers/LoadingProvider';
import Comment from '../../Components/Posts/Comment';
import PostPreview from '../../Components/Posts/PostPreview';
import React from 'react';

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
            {data.data.posts
              .concat(data.data.comments)
              .sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
              .map((content) => (
                <React.Fragment key={content._id}>
                  {content.is_post ? (
                    <PostPreview page='profile' post={content} />
                  ) : (
                    //uncomment when deployed reem
                    <Comment key={content.id} comment={content} />

                    //<PostPreview key={content.id} post={content} />
                  )}
                </React.Fragment>
              ))}
          </>
        )}
      </LoadingProvider>
    </>
  );
}

export default Saved;
