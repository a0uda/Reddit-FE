import { useQuery } from 'react-query';
import SortOptions from './SortOptions';
import Post from './Post';
import { fetchRequest } from '../API/User';
import { useEffect, useRef, useState } from 'react';
import { PostType } from '../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeString } from '../utils/helper_functions';
import LoadingProvider from './LoadingProvider';

const PostsListings = () => {
  const { sortOption: initialSortOption } = useParams();

  const sortOptions = ['Best', 'Hot', 'New', 'Top'];
  const [sortOption, setSortOption] = useState(
    capitalizeString(initialSortOption || '') || sortOptions[0]
  );

  const response = useQuery({
    queryKey: ['listings', 'all'],
    queryFn: () => fetchRequest(`listing/posts/${sortOption.toLowerCase()}`),
  });

  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    navigate(`/${sortOption.toLowerCase()}`);
    response.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  console.log('response', response.isError);

  return (
    <>
      {/* Sort by dropdown */}
      <SortOptions
        sortOptions={sortOptions}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <hr className='border-neutral-muted' />
      <LoadingProvider error={response.isError} isLoading={response.isLoading}>
        {response.isSuccess && (
          <>
            {response.data.data &&
              response.data.data.map((post: PostType) => (
                <Post key={post.id} post={post} />
              ))}
          </>
        )}
      </LoadingProvider>
    </>
  );
};

export default PostsListings;
