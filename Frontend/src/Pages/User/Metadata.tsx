import { PostType } from '../../types/types';
import {
  ArrowUpIcon,
  ArrowUturnRightIcon,
  ChatBubbleBottomCenterIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

const Metadata = ({ content }: { content: PostType }) => {
  return (
    <>
      <div className='text-black m-2 text-sm'>Lifetime Performance</div>
      <div className='flex flex-row border-b-[1px] justify-between'>
        <div className='w-full h-16 max-w-[8rem] border-neutral-400 border-[1px] my-2 mx-[2px] rounded justify-center items-center flex flex-col'>
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

        <div className='w-full h-16 max-w-[8rem] border-neutral-400 border-[1px] my-2 mx-[2px] rounded justify-center items-center flex flex-col'>
          <div className='text-black text-xl font-bold '>
            {content.user_details.upvote_rate.toFixed(1)}%
          </div>
          <div className='text-xs  gap-2 flex '>
            <ArrowUpIcon strokeWidth={2.5} className='h-4 w-4' />
            Upvote Rate
          </div>
        </div>

        <div className='w-full h-16 max-w-[8rem] border-neutral-400 border-[1px] my-2 mx-[2px] rounded justify-center items-center flex flex-col'>
          <div className='text-black text-xl font-bold '>
            {content.comments_count}
          </div>
          <div className='text-xs  gap-2 flex '>
            <ChatBubbleBottomCenterIcon strokeWidth={2.5} className='h-4 w-4' />
            Comments
          </div>
        </div>

        <div className='w-full h-16 max-w-[8rem] border-neutral-400 border-[1px] my-2 mx-[2px] rounded justify-center items-center flex flex-col'>
          <div className='text-black text-xl font-bold '>
            {content.user_details.total_shares}
          </div>
          <div className='text-xs  gap-2 flex '>
            <ArrowUturnRightIcon strokeWidth={2.5} className='h-4 w-4' />
            Total Shares
          </div>
        </div>
      </div>
    </>
  );
};

export default Metadata;
