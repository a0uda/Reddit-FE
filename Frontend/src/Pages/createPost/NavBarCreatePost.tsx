import { useEffect } from 'react';

type PropsType = {
  activeIndex: number | null;
  handleDivClick: (index: number) => void;
  setFieldValue: (field: string, value: unknown) => void;
};
export default function NavBarCreatePost({
  activeIndex,
  handleDivClick,
  setFieldValue,
}: PropsType) {
  useEffect(() => {
    setFieldValue('type', 'createPost');
  }, [setFieldValue]);
  return (
    <div className='border-collapse'>
      <div className='flex'>
        <div
          className={`p-2 cursor-pointer w-1/3 border-b-2 flex items-center justify-center${
            activeIndex === 0 ? ' border-blue-light text-blue-light' : ''
          }`}
          onClick={() => {
            handleDivClick(0);
            setFieldValue('type', 'createPost');
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
            />
          </svg>
          Post
        </div>
        <div className='border-r'></div>
        <div
          className={`p-2 cursor-pointer w-1/3 border-b-2 flex items-center justify-center ${
            activeIndex === 1 ? 'border-blue-light text-blue-light' : ''
          }`}
          onClick={() => {
            handleDivClick(1);
            setFieldValue('type', 'createPostImageAndVideo');
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
            />
          </svg>
          Image & Video
        </div>
        <div className='border-r'></div>
        <div
          className={`p-2 cursor-pointer w-1/3 border-b-2 flex items-center justify-center ${
            activeIndex === 2 ? ' border-blue-light text-blue-light' : ''
          }`}
          onClick={() => {
            handleDivClick(2);
            setFieldValue('type', 'createPostLink');
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 mr-2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244'
            />
          </svg>
          link
        </div>
        <div className='border-r'></div>
        <div
          className={`p-2 cursor-pointer w-1/3 border-b-2 flex items-center justify-center ${
            activeIndex === 3 ? 'border-blue-light text-blue-light' : ''
          }`}
          onClick={() => {
            handleDivClick(3);
            setFieldValue('type', 'createPostPoll');
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
            />
          </svg>
          Poll
        </div>
      </div>
    </div>
  );
}
