import { useState } from 'react';
import { Card, Typography } from '@material-tailwind/react';

import PostItem from './PostItem';
import postList from './PostList.ts';

export function RecentPosts() {
  const [isContentVisible, setContentVisible] = useState(true);

  return (
    <>
      {isContentVisible && (
        <div
          style={{
            maxHeight: '88vh',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
          }}
        >
          <Card className='w-full bg-gray-100 rounded-lg shadow-none p-0 pt-3 pb-3 min-w-0'>
            <div className='flex flex-row justify-between p-4 py-3'>
              <Typography
                variant='small'
                className='p-0 font-body font-semibold uppercase -tracking-tight text-xs text-gray-600'
              >
                RECENT POSTS
              </Typography>
              <button
                // style={{ width: '75px', height: '35px' }}
                className='rounded-full font-body font-thin -tracking-tight text-sm text-blue-900 mx-2'
                onClick={() => setContentVisible(false)}
              >
                Clear
              </button>
            </div>
            {postList.map((post, index) => (
              <div key={index}>
                <PostItem
                  communityAvatarSrc={post.communityAvatarSrc}
                  communityName={post.communityName}
                  joined={post.joined}
                  communityDescription={post.communityDescription}
                  communityMembers={post.communityMembers}
                  communityOnline={post.communityOnline}
                  postDescription={post.postDescription}
                  postMediaSrc={post.postMediaSrc}
                  upvotes={post.upvotes}
                  comments={post.comments}
                />
                {index !== postList.length - 1 && (
                  <div className='w-100 min-h-px mb-4 mt-1 bg-gray-300'></div>
                )}
              </div>
            ))}
          </Card>
        </div>
      )}
    </>
  );
}
