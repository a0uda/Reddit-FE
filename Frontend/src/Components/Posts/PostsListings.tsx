import { useQuery } from 'react-query';
import SortOptions from '../SortOptions';
import { fetchRequest } from '../../API/User';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PostType } from '../../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeString } from '../../utils/helper_functions';
import LoadingProvider from '../LoadingProvider';
import PostPreview from './PostPreview';
import useSession from '../../hooks/auth/useSession';

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

  console.log('posts', posts);
  // console.log('response', response);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (response.isLoading || noMorePosts) return;
      // Disconnect the previous observer after each
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [response.isLoading, noMorePosts]
  );

  const PostComponent = React.memo(
    ({
      post,
      index,
      lastPostElementRef,
    }: {
      post: PostType;
      index: number;
      lastPostElementRef: HTMLDivElement | null;
    }) => (
      <>
        <div ref={lastPostElementRef} key={post._id}>
          {posts.length === index + 1 ? (
            <div>
              <hr className='border-neutral-muted' />
              <PostPreview
                post={post}
                page='home'
                // isMyPost={
                //   post.username == user?.username ||
                //   moderatedCommunityNames?.includes(
                //     post.community_name || ''
                //   )
                // }
              />
            </div>
          ) : (
            <div>
              <hr className='border-neutral-muted' />
              <PostPreview
                post={post}
                page='home'
                // isMyPost={
                //   post.username == user?.username ||
                //   moderatedCommunityNames?.includes(
                //     post.community_name || ''
                //   )
                // }
              />
            </div>
          )}
        </div>
      </>
    )
  );
  PostComponent.displayName = 'PostComponent';

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
            {posts.map((post: PostType, index: number) => (
              <PostComponent
                post={post}
                index={index}
                lastPostElementRef={lastPostElementRef}
                key={post._id}
              />
            ))}
          </>
        )}
      </LoadingProvider>
    </>
  );
};

export default PostsListings;
