import { useParams } from 'react-router-dom';
import ContentLayout from '../Components/ContentLayout';
import PostDetails from '../Components/Posts/PostDetails';
import { CommunityRSB } from '../Components/RightSideBar/CommunityRSB';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchRequest } from '../API/User';
import LoadingProvider from '../Components/LoadingProvider';
import { PostType } from '../types/types';

const Post = () => {
  const { id: postId } = useParams();
  const { prefix } = useParams();

  console.log(postId);
  // const [community, setCommunity] = useState<PostType | undefined>();
  const [post, setPost] = useState<PostType | undefined>();
  const { isLoading, isError } = useQuery({
    queryKey: ['post', 'listings', postId],
    queryFn: () => fetchRequest(`posts/get-post/${postId}`),
    onSuccess: (data) => {
      setPost(data.data);
    },
  });

  return (
    <>
      <ContentLayout>
        <LoadingProvider error={isError} isLoading={isLoading}>
          {post && (
            <>
              <ContentLayout.Main>
                <PostDetails post={post} />
              </ContentLayout.Main>
              <ContentLayout.RightSideBar>
                {prefix == 'r' && <CommunityRSB name={post.community_name} />}
              </ContentLayout.RightSideBar>
            </>
          )}
        </LoadingProvider>
      </ContentLayout>
    </>
  );
};

export default Post;
