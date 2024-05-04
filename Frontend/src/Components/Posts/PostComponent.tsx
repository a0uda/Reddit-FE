import React from 'react';
import PostPreview from './PostPreview';
import { PostType } from '../../types/types';
import { User } from '../../hooks/auth/useSession';

interface PostComponentProps {
  posts: PostType[];
  lastPostElementRef: (node: HTMLDivElement | null) => void;
  user: User | null;
  moderatedCommunityNames: string[];
}

const PostComponent = ({
  posts,
  lastPostElementRef,
  user,
  moderatedCommunityNames,
}: PostComponentProps) => (
  <>
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
  </>
);

export default React.memo(PostComponent);
