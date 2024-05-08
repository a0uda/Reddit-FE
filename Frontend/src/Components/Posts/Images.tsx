import { Carousel, IconButton, Typography } from '@material-tailwind/react';
import { PostType } from '../../types/types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '../../utils/helper_functions';
import { useState } from 'react';

const Images = ({ post }: { post: PostType }) => {
  const [showNsfw, setShowNsfw] = useState(!post?.nsfw_flag);
  const [showSpoiler, setShowSpoiler] = useState(!post?.spoiler_flag);
  console.log('post.nsfw_flag', post?.nsfw_flag);
  console.log('post.spoiler_flag', post?.spoiler_flag);

  return (
    <>
      {post.images && post.images.length > 1 && (
        <>
          <Carousel
            className='rounded-xl'
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant='text'
                color='white'
                size='lg'
                onClick={handlePrev}
                className='!absolute top-2/4 left-4 -translate-y-2/4 bg-black/50'
              >
                <ChevronLeftIcon className='h-6 w-6' strokeWidth={2.5} />
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant='text'
                color='white'
                size='lg'
                onClick={handleNext}
                className='!absolute top-2/4 !right-4 -translate-y-2/4 bg-black/50'
              >
                <ChevronRightIcon className='h-6 w-6' strokeWidth={2.5} />
              </IconButton>
            )}
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className='absolute bottom-0 left-2/4 z-50 flex -translate-x-2/4 gap-2 bg-black/50 p-1 rounded-full'>
                {new Array(length).fill('').map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-full transition-all content-[''] ${
                      activeIndex === i ? 'w-6 bg-white' : 'w-4 bg-white/50'
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            {post.images.map((image, index) => (
              <div
                key={index}
                className='relative'
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className='relative h-[50vh] flex justify-center rounded-sm bg-blue-gray-900'>
                  <img
                    src={image.path}
                    alt={image.caption ?? 'Post Image'}
                    className='object-contain'
                  />
                  {image.caption && (
                    <div className='absolute w-11/12 bottom-4 bg-neutral-black/50 p-1 px-2 mx-4 rounded-md'>
                      <Typography variant='small' className='text-white'>
                        {image.caption}
                      </Typography>
                    </div>
                  )}
                  <div
                    className={cn(
                      'absolute w-full h-full top-0',
                      !showNsfw || !showSpoiler ? 'blur-sm bg-black/50' : ''
                    )}
                  ></div>
                </div>
                {!showNsfw && (
                  <button
                    className='absolute top-1/2 left-1/2 bg-neutral-black text-neutral-white rounded-full px-2 py-1'
                    onClick={() => setShowNsfw(true)}
                  >
                    View NSFW
                  </button>
                )}
                {!showSpoiler && (
                  <button
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-black text-neutral-white rounded-full px-2 py-1'
                    onClick={() => setShowSpoiler(true)}
                  >
                    View Spolier
                  </button>
                )}
              </div>
            ))}
          </Carousel>
        </>
      )}
      {post.images && post.images.length === 1 && (
        <>
          <div
            className='relative'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className='relative h-[50vh] flex justify-center rounded-sm bg-blue-gray-900'>
              <img
                src={post.images?.[0].path}
                alt={post.images?.[0].caption ?? 'Post Image'}
                className={cn(
                  'object-contain rounded-md',
                  !showNsfw || !showSpoiler ? 'blur-sm' : ''
                )}
              />
              {post.images?.[0].caption && (
                <div className='absolute w-11/12 bottom-4 bg-neutral-black/50 p-1 px-2 mx-4 rounded-md'>
                  <Typography variant='small' className='text-white'>
                    {post.images?.[0].caption}
                  </Typography>
                </div>
              )}
            </div>
            <div
              className={cn(
                'absolute w-full h-full top-0',
                !showNsfw || !showSpoiler ? 'blur-sm bg-black/50' : ''
              )}
            ></div>
            {!showNsfw && (
              <button
                className='absolute top-1/2 left-1/2 bg-neutral-black text-neutral-white rounded-full px-2 py-1'
                onClick={() => setShowNsfw(true)}
              >
                View NSFW
              </button>
            )}
            {!showSpoiler && (
              <button
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-black text-neutral-white rounded-full px-2 py-1'
                onClick={() => setShowSpoiler(true)}
              >
                View Spolier
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Images;
