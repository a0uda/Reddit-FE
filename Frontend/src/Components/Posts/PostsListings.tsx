import { useQuery } from 'react-query';
import SortOptions from '../SortOptions';
import { fetchRequest } from '../../API/User';
import { useEffect, useRef, useState } from 'react';
import { CommunityOverviewType, PostType } from '../../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeString } from '../../utils/helper_functions';
import LoadingProvider from '../LoadingProvider';
import useSession from '../../hooks/auth/useSession';
import { useInView } from 'react-intersection-observer';
import PostPreview from './PostPreview';

const PostsListings = () => {
  const { sortOption: initialSortOption } = useParams();
  const { user } = useSession();
  const sortOptions = ['Best', 'Hot', 'New', 'Top'];
  const [sortOption, setSortOption] = useState(
    capitalizeString(initialSortOption || '') || sortOptions[0]
  );

  if (!sortOptions.includes(sortOption)) {
    setSortOption(sortOptions[0]);
  }

  // Refetch data when sort option changes
  // Batanesh awel mara ye load el page alshan kan by3ml refresh mareten
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

  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [posts, setPosts] = useState<PostType[]>([]);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const response = useQuery({
    queryKey: ['listings', sortOption, page, pageSize],
    queryFn: async () => {
      console.log('sortOption', sortOption);
      const res = await fetchRequest(
        `listing/posts/${sortOption.toLowerCase()}?page=${page}&pageSize=${pageSize}`
      );
      console.log('res.data', res.data);
      if (res.data.length === 0) {
        setNoMorePosts(true);
        return;
      }
      setPosts((prevPosts) => [...prevPosts, ...res.data]);
    },
  });

  const { ref: lastPostElementRef, inView } = useInView();

  useEffect(() => {
    if (inView && !noMorePosts) {
      setPage((prevPageNumber) => prevPageNumber + 1);
    }
  }, [inView, noMorePosts]);

  let moderatedCommunityNames: string[] = [];
  useQuery({
    queryKey: ['getModeratedCommunities'],
    queryFn: async () => await fetchRequest('users/moderated-communities'),
    onSuccess: (data) => {
      moderatedCommunityNames = data?.data.map(
        (com: CommunityOverviewType) => com.name
      );
    },
  });

  return (
    <>
      {/* Sort by dropdown */}
      <SortOptions
        sortOptions={sortOptions}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <hr className='border-neutral-muted' />
      {posts &&
        posts.map((post: PostType, index: number) => (
          <div ref={lastPostElementRef} key={post._id}>
            {posts.length === index + 1 ? (
              <>
                <hr className='border-neutral-muted' />
                <PostPreview
                  post={post}
                  page='home'
                  isMyPost={
                    post.username == user?.username ||
                    moderatedCommunityNames?.includes(post.community_name!)
                  }
                />
              </>
            ) : (
              <>
                <hr className='border-neutral-muted' />
                <PostPreview
                  post={post}
                  page='home'
                  isMyPost={
                    post.username == user?.username ||
                    moderatedCommunityNames?.includes(post.community_name!)
                  }
                />
              </>
            )}
          </div>
        ))}
      <LoadingProvider error={response.isError} isLoading={response.isLoading}>
        {response.isError ? (
          <div className='text-center text-red-500'>Error fetching data</div>
        ) : null}
        {response.isLoading ? (
          <div className='text-center'>Loading...</div>
        ) : null}
        {noMorePosts ? (
          <>
            <hr className='border-neutral-muted' />
            <div className='text-center my-5'>No more posts to show</div>
          </>
        ) : null}
      </LoadingProvider>
    </>
  );
};

export default PostsListings;
