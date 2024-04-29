import { PopularCommunities } from '../Components/RightSideBar/PopularCommunities';
import { RecentPosts } from '../Components/RightSideBar/RecentPosts';
import PostsListings from '../Components/Posts/PostsListings';
import ContentLayout from '../Components/ContentLayout';
import useSession from '../hooks/auth/useSession';

const Mainfeed = () => {
  const { status } = useSession();
  return (
    <>
      <ContentLayout>
        <ContentLayout.Main>
          <PostsListings />
        </ContentLayout.Main>
        <ContentLayout.RightSideBar>
          {status === 'authenticated' ? (
            <RecentPosts />
          ) : (
            <PopularCommunities />
          )}
        </ContentLayout.RightSideBar>
      </ContentLayout>
    </>
  );
};

export default Mainfeed;
