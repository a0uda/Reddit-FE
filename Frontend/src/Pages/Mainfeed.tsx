import { PopularCommunities } from '../Components/RightSideBar/PopularCommunities';
import { RecentPosts } from '../Components/RightSideBar/RecentPosts';
import PostsListings from '../Components/Posts/PostsListings';
import ContentLayout from '../Components/ContentLayout';

const Mainfeed = () => {
  return (
    <>
      <ContentLayout>
        <ContentLayout.Main>
          <PostsListings />
        </ContentLayout.Main>
        <ContentLayout.RightSideBar>
          <RecentPosts />
          <PopularCommunities />
        </ContentLayout.RightSideBar>
      </ContentLayout>
    </>
  );
};

export default Mainfeed;
