import React from 'react';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../UserSettings/Containers/LoadingProvider';
import { PostType } from '../../types/types';
import Post from '../../Components/Post';
import { useQuery } from 'react-query';
import { Card, CardBody } from '@material-tailwind/react';
import {
  EyeIcon,
  ArrowUpIcon,
  ArrowUturnRightIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/outline';

function Posts() {
  const { data, error, isLoading, refetch } = useQuery(
    ['posts', 'listings'],
    () => fetchRequest('users/posts')
  );
  console.log(data);
  return (
    <>
      <LoadingProvider error={error} isLoading={isLoading}>
        {data && (
          <>
            {data.data.map((post: PostType) => (
              <div key={post.id}>
                <Post post={post} />
                <div className='text-black m-2 text-sm'>
                  Lifetime Performance
                </div>
                <div className='flex flex-row border-b-[1px]'>
                  <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                    <div className='text-black text-xl font-bold '>
                      {post.user_details.total_views === 0
                        ? 'N/A'
                        : post.user_details.total_views}
                    </div>
                    <div className='text-xs  gap-2 flex '>
                      <EyeIcon strokeWidth={2.5} className='h-4 w-4' />
                      Total Views
                    </div>
                  </div>

                  <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                    <div className='text-black text-xl font-bold '>
                      {post.user_details.upvote_rate}%
                    </div>
                    <div className='text-xs  gap-2 flex '>
                      <ArrowUpIcon strokeWidth={2.5} className='h-4 w-4' />
                      Upvote Rate
                    </div>
                  </div>

                  <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                    <div className='text-black text-xl font-bold '>
                      {post.user_details.upvote_rate}
                    </div>
                    <div className='text-xs  gap-2 flex '>
                      <ChatBubbleBottomCenterIcon
                        strokeWidth={2.5}
                        className='h-4 w-4'
                      />
                      Comments
                    </div>
                  </div>

                  <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                    <div className='text-black text-xl font-bold '>
                      {post.user_details.total_views}
                    </div>
                    <div className='text-xs  gap-2 flex '>
                      <ArrowUturnRightIcon
                        strokeWidth={2.5}
                        className='h-4 w-4'
                      />
                      Total Shares
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </LoadingProvider>
    </>
  );
}

export default Posts;
