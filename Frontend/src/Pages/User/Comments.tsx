import React from 'react';
import { fetchRequest } from '../../API/User';
import { useQuery } from 'react-query';
import LoadingProvider from '../UserSettings/Containers/LoadingProvider';
import { CommentType } from '../../types/types';
import Comment from '../../Components/Posts/Comment';

function Comments() {
  const { data, error, isLoading, refetch } = useQuery(
    ['userComments', 'comments'],
    () => fetchRequest('users/comments')
  );
  console.log(data);
  return (
    <>
      <LoadingProvider error={error} isLoading={isLoading}>
        {data && (
          <>
            {data.data.map((comment: CommentType) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </>
        )}
      </LoadingProvider>
    </>
  );
}

export default Comments;
