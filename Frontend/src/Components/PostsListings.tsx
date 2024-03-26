import { useQuery } from 'react-query';
import SortOptions from './SortOptions';
import Post from './Post';
import { fetchRequest } from '../API/User';
import { useState } from 'react';
import { PostType } from '../types/types';

const PostsListings = () => {
  const sortOptions = ['Best', 'Hot', 'New', 'Top'];
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  const data = useQuery({
    queryKey: ['listings', 'all'],
    queryFn: () => fetchRequest(`listings/posts/random`),
  });

  console.log(data);

  return (
    <>
      {/* Sort by dropdown */}
      <SortOptions
        sortOptions={sortOptions}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <hr className='border-neutral-muted' />
      {data.isLoading && <p>Loading...</p>}
      {data.isError && <p>{data.isLoadingError}</p>}
      {data.isSuccess && (
        <>
          {data.data.data.map((post: PostType) => (
            <Post key={post.id} post={post} />
          ))}
        </>
      )}
    </>
  );
};

export default PostsListings;
