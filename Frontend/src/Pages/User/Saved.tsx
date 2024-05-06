import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';
import Comment from '../../Components/Posts/Comment';
import PostPreview from '../../Components/Posts/PostPreview';
import React from 'react';
import useSession from '../../hooks/auth/useSession';

function Saved() {
  const { data, isError, isLoading } = useQuery(
    ['userComments', 'comments', 'posts', 'listings'],
    () => fetchRequest('users/saved-posts-and-comments')
  );
  const { user } = useSession();
  console.log(data);
  return (
    <>
      <LoadingProvider error={isError} isLoading={isLoading}>
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
                </React.Fragment>
              ))}
          </>
        )}
      </LoadingProvider>
    </>
  );
}

export default Saved;
