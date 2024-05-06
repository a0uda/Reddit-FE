import LoadingProvider from '../../Components/LoadingProvider';
import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import { CommunityOverviewType, PostType } from '../../types/types';

import PostPreview from '../../Components/Posts/PostPreview';
import useSession from '../../hooks/auth/useSession';

function UserContent(props: { endpoint: string; queryName: string }) {
  const { user } = useSession();
  const url = window.location.href;
  const { data, isError, isLoading } = useQuery(
    [props.queryName, 'listings'],
    () => fetchRequest(props.endpoint)
  );
  let moderatedCommunityNames: string[] = [];
  useQuery({
    queryKey: ['getModeratedCommunities', url],
    queryFn: async () => await fetchRequest('users/moderated-communities'),
    onSuccess: (data) => {
      moderatedCommunityNames = data?.data.map(
        (com: CommunityOverviewType) => com.name
      );
    },
  });
  console.log(user?.username, 'test');
  return (
    <>
      <LoadingProvider error={isError} isLoading={isLoading}>
        {data && (
          <>
            {data.data.map((post: PostType) => (
              <PostPreview
                page='profile'
                key={post._id}
                post={post}
                isMyPost={
                  post.username == user?.username ||
                  moderatedCommunityNames?.includes(post.community_name!)
                }
              />
            ))}
          </>
        )}
      </LoadingProvider>
    </>
  );
}

export default UserContent;
