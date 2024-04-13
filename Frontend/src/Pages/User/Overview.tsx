import React from 'react';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../UserSettings/Containers/LoadingProvider';

import Comment from '../../Components/Posts/Comment';
import PostPreview from '../../Components/Posts/PostPreview';
import RoundedButton from '../../Components/RoundedButton';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';

function Overview() {
  const { data, error, isLoading, refetch } = useQuery(
    ['userComments', 'comments', 'posts', 'listings'],
    () => fetchRequest('users/overview')
  );
  console.log(data);
  return (
    <>
      <LoadingProvider error={error} isLoading={isLoading}>
        <Link
          to={`/submit`}
          className='flex rounded-full border justify-center items-center text-sm border-neutral-black w-32'
        >
          <div className='gap-2 flex py-2 justify-center items-center text-black font-semibold'>
            <PlusIcon strokeWidth={2.5} className='h-3.5 w-3.5' />
            Create Post
          </div>
        </Link>
        {data && (
          <>
            {data.data.map((content) =>
              content.is_post ? (
                <PostPreview key={content.id} post={content} />
              ) : (
                //uncomment when deployed reem
                //<Comment key={content.id} comment={content} />
                <PostPreview key={content.id} post={content} />
              )
            )}
          </>
        )}
      </LoadingProvider>
    </>
  );
}
export default Overview;
