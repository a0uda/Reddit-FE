import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../../Components/LoadingProvider';
import Comment from '../../Components/Posts/Comment';
import PostPreview from '../../Components/Posts/PostPreview';
import React from 'react';
import { CommentType, PostType } from '../../types/types';
import useSession from '../../hooks/auth/useSession';

function Saved() {
  const { data, isError, isLoading } = useQuery(
    ['userComments', 'comments', 'posts', 'listings'],
    () => fetchRequest('users/saved-posts-and-comments')
  );
  console.log(data);
  const { user } = useSession();
  return (
    <>
      <LoadingProvider error={isError} isLoading={isLoading}>
        {data && (
          <>
            {data.data.posts
              .concat(data.data.comments)
              .sort(
                (a: PostType, b: PostType) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
              .map((content: PostType | CommentType) => {
                if (content.is_post) {
                  const post = content as PostType;
                  return (
                    <React.Fragment key={post._id}>
                      <PostPreview
                        page='profile'
                        post={post}
                        isMyPost={content.username == user?.username}
                      />
                    </React.Fragment>
                  );
                } else {
                  const comment = content as CommentType;
                  return (
                    <React.Fragment key={comment._id}>
                      <Comment comment={comment} showButton={true} />
                    </React.Fragment>
                  );
                }
              })}
          </>
        )}
      </LoadingProvider>
    </>
  );
}

export default Saved;
