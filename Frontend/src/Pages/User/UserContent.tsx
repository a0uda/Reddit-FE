import LoadingProvider from '../../Components/LoadingProvider';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import { PostType } from '../../types/types';

import PostPreview from '../../Components/Posts/PostPreview';
import useSession from '../../hooks/auth/useSession';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function UserContent(props: { endpoint: string; queryName: string }) {
  const { user } = useSession();

  // Pagination
  const [data, setData] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false);
  const { ref: lastElementRef, inView } = useInView();

  useEffect(() => {
    if (inView && !noMoreData) {
      setPage((prevPageNumber) => prevPageNumber + 1);
    }
  }, [inView, noMoreData]);

  const { isError, isLoading } = useQuery(
    [props.queryName, 'listings', page],
    async () => {
      const res = await fetchRequest(`${props.endpoint}?page=${page}`);
      if (res.data.length === 0) {
        setNoMoreData(true);
        return;
      }
      setData((prev) => [...prev, ...res.data]);
    }
  );
  // let moderatedCommunityNames: string[] = [];
  // useQuery({
  //   queryKey: ['getModeratedCommunities', url],
  //   queryFn: async () => await fetchRequest('users/moderated-communities'),
  //   onSuccess: (data) => {
  //     moderatedCommunityNames = data?.data.map(
  //       (com: CommunityOverviewType) => com.name
  //     );
  //   },
  // });
  return (
    <>
      {data && (
        <>
          {data.map((post: PostType) => (
            <div ref={lastElementRef} key={post._id}>
              <PostPreview
                page='profile'
                key={post._id}
                post={post}
                isMyPost={post.username == user?.username}
              />
            </div>
          ))}
        </>
      )}
      <LoadingProvider error={false} isLoading={false}>
        {isError ? <div className='text-center'>Error...</div> : null}
        {isLoading ? <div className='text-center'>Loading...</div> : null}
        {noMoreData ? (
          <>
            <hr className='border-neutral-muted' />
            <div className='text-center my-5'>Nothing to show</div>
          </>
        ) : null}
      </LoadingProvider>
    </>
  );
}

export default UserContent;
