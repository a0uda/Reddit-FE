import { useQuery } from 'react-query';
import SortOptions from '../SortOptions';
import { fetchRequest } from '../../API/User';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { CommunityType, PostType } from '../../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeString } from '../../utils/helper_functions';
import LoadingProvider from '../LoadingProvider';
import PostPreview from './PostPreview';

const PostsListings = () => {
  const { sortOption: initialSortOption } = useParams();

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

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const response = useQuery({
    queryKey: ['listings', sortOption, page, pageSize],
    queryFn: () => {
      console.log('sortOption', sortOption);
      return fetchRequest(
        `listing/posts/${sortOption.toLowerCase()}?page=${page}&pageSize=${pageSize}`
      );
    },
  });
  console.log('response', response);

  let moderatedCommunityNames: [];
  useQuery({
    queryKey: ['getModeratedCommunities'],
    queryFn: () => fetchRequest('users/moderated-communities'),
    onSuccess: (data) => {
      moderatedCommunityNames = data?.data.map((com) => com.name);
      console.log(moderatedCommunityNames);
    },
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (response.isLoading) return;
      // Disconnect the previous observer after each
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPageNumber) => prevPageNumber + 1);
          response.refetch();
        }
      });
      if (node) observer.current.observe(node);
    },
    [response.isLoading]
  );

  return (
    <>
      {/* Sort by dropdown */}
      <SortOptions
        sortOptions={sortOptions}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <LoadingProvider error={response.isError} isLoading={response.isLoading}>
        {response.isSuccess && (
          <>
            {response.data.data.map((post: PostType, index: number) => {
              if (response.data.data.length === index + 1) {
                <div ref={lastPostElementRef} key={post._id}>
                  <hr className='border-neutral-muted' />
                  <PostPreview
                    post={post}
                    page='home'
                    isMyPost={
                      post.username == user?.username ||
                      moderatedCommunityNames?.includes(
                        post.community_name || ''
                      )
                    }
                  />
                </div>;
              } else {
                <div key={post._id}>
                  <hr className='border-neutral-muted' />
                  <PostPreview
                    post={post}
                    page='home'
                    isMyPost={
                      post.username == user?.username ||
                      moderatedCommunityNames?.includes(
                        post.community_name || ''
                      )
                    }
                  />
                </div>;
              }
            })}
          </>
        )}
      </LoadingProvider>
    </>
  );
};

export default PostsListings;
