import { useQuery } from 'react-query';
import { fetchRequest } from '../../API/User';
import LoadingProvider from '../UserSettings/Containers/LoadingProvider';
import Comment from '../../Components/Posts/Comment';
import PostPreview from '../../Components/Posts/PostPreview';
import { Link } from 'react-router-dom';
import {
  ArrowUpIcon,
  ArrowUturnRightIcon,
  ChatBubbleBottomCenterIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import useSession from '../../hooks/auth/useSession';

function Overview() {
  const { user } = useSession();
  const { data, error, isLoading } = useQuery(
    ['userComments', 'comments', 'posts', 'listings'],
    () => fetchRequest(`users/${user?.username}/overview`)
  );
  console.log(data);
  return (
    <>
      <LoadingProvider error={error} isLoading={isLoading}>
        <Link
          to={`/submit`}
          className='flex rounded-full border justify-center items-center text-sm border-neutral-black w-32'
        >
          <div className='gap-2 flex py-2 justify-center items-center text-black font-semibold'>
            <PlusIcon strokeWidth={2.5} className='h-3.5 w-3.5' />
            Create Post
          </div>
        </Link>
        {data && (
          <>
            {data.data.map((content) =>
              content.is_post ? (
                <div key={content.id}>
                  <PostPreview post={content} />
                  <div className='text-black m-2 text-sm'>
                    Lifetime Performance
                  </div>
                  <div className='flex flex-row border-b-[1px]'>
                    <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                      <div className='text-black text-xl font-bold '>
                        {content.user_details.total_views === 0
                          ? 'N/A'
                          : content.user_details.total_views}
                      </div>
                      <div className='text-xs  gap-2 flex '>
                        <EyeIcon strokeWidth={2.5} className='h-4 w-4' />
                        Total Views
                      </div>
                    </div>

                    <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                      <div className='text-black text-xl font-bold '>
                        {content.user_details.upvote_rate}%
                      </div>
                      <div className='text-xs  gap-2 flex '>
                        <ArrowUpIcon strokeWidth={2.5} className='h-4 w-4' />
                        Upvote Rate
                      </div>
                    </div>

                    <div className='w-80 h-16 max-w-[8rem] border-neutral-400 border-[1px] m-2 rounded justify-center items-center flex flex-col'>
                      <div className='text-black text-xl font-bold '>
                        {content.user_details.upvote_rate}
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
                        {content.user_details.total_views}
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
              ) : (
                //uncomment when deployed reem
                <Comment key={content.id} comment={content} showButton={true} />
                //<PostPreview key={content.id} post={content} />
              )
            )}
          </>
        )}
      </LoadingProvider>
    </>
  );
}
export default Overview;
