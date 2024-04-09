import ContentLayout from '../Components/ContentLayout';
import PostDetails from '../Components/Posts/PostDetails';
import { PopularCommunities } from '../Components/RightSideBar/PopularCommunities';

const Post = () => {
  return (
    <>
      <ContentLayout>
        <ContentLayout.Main>
          <PostDetails />
        </ContentLayout.Main>
        <ContentLayout.RightSideBar>
          <PopularCommunities />
        </ContentLayout.RightSideBar>
      </ContentLayout>
    </>
  );
};

export default Post;
