import { Tooltip, Typography } from '@material-tailwind/react';
import NonEditableProvider from '../../Providers/NonEditableProvider';
import PollPostContainer from './PollPostContainer';
import LinkPostContainer from './LinkPostContainer';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import {
  addPrefixToUsername,
  dateDuration,
} from '../../utils/helper_functions';
import { Link, useNavigate } from 'react-router-dom';
import { SpoilerContainer } from './PostPreview';
import { useEffect, useState } from 'react';
import { fetchRequest } from '../../API/User';
import { useQuery } from 'react-query';
import { PostType } from '../../types/types';
import eighteenPic from '../../assets/18Pic.svg';

const SharedPostContainer = (props: {
  sharedPostId: string;
  post: PostType;
}) => {
  const [sharedPost, setSharedPost] = useState<PostType>();
  const [sharedPostSpoiler, setSharedPostSpoiler] = useState<boolean>();
  const [sharedViewNSFW, setSharedViewNSFW] = useState<boolean>();

  const [name, setName] = useState<string>();
  const url = window.location.href;
  const { data, refetch } = useQuery({
    queryKey: ['post', props.sharedPostId, url],
    queryFn: () => fetchRequest(`posts/get-post?id=${props.sharedPostId}`),
    onSuccess: (data) => {
      console.log(data?.data, 'sharedPost');
      setSharedPost(data?.data);
      setName(
        addPrefixToUsername(data?.data.community_name || '', 'moderator') ||
          addPrefixToUsername(data?.data.username, 'user') ||
          ''
      );
      setSharedPostSpoiler(data?.data.spoiler_flag);
    },
  });
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (sharedPost) {
      console.log(sharedPost, props.sharedPostId, 'Updated SharedPost'); // Check if `sharedPost` is updated
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sharedPost]);
  console.log(sharedPost, props.sharedPostId, 'Updated SharedPost barra'); // Check if `sharedPost` is updated
  const navigate = useNavigate();
  return (
    <>
      <div>
        {props.post?.spoiler_flag ||
          (props.post?.nsfw_flag && (
            <div className='flex gap-2 mb-2'>
              {props.post?.spoiler_flag && (
                <div className='flex gap-1 items-center'>
                  <ExclamationTriangleIcon
                    strokeWidth={3}
                    className='w-4 h-4 font-bold text-black'
                  />
                  <Typography
                    variant='small'
                    className='font-bold text-black text-xs'
                  >
                    SPOILER
                  </Typography>
                </div>
              )}
              {props.post?.nsfw_flag && (
                <div className='flex gap-1 items-center'>
                  <img
                    src={eighteenPic}
                    // strokeWidth={3}
                    className='w-4 h-4 font-bold text-black'
                  />
                  <Typography
                    variant='small'
                    className='font-bold text-black text-xs'
                  >
                    NSFW
                  </Typography>
                </div>
              )}
            </div>
          ))}
      </div>
      {data?.data && (
        <div
          onClick={() => {
            console.log('dost sah');
            navigate(
              `/${addPrefixToUsername(data?.data?.community_name || data?.data?.username, data?.data?.community_name ? 'community' : 'user')}/comments/${data?.data?._id}/${data?.data?.title}/`
            );
          }}
          className='bg-white rounded-lg flex flex-col p-2 border-2 border-lines-color mb-1'
        >
          {data?.data?.spoiler_flag && sharedPostSpoiler && (
            <div className='flex flex-col justify-start pt-0'>
              <div className='flex gap-2'>
                <Typography
                  variant='small'
                  className='font-body -tracking-tight text-gray-600'
                >
                  <Link to={`/${name}/overview`} className='hover:underline'>
                    {name}
                  </Link>
                </Typography>
                <span className='relative -top-0.5'>•</span>
                <Typography variant='small' className=''>
                  {dateDuration(new Date(data?.data?.created_at))}
                </Typography>
              </div>
              <Typography variant='h5' className='text-blue'>
                {data?.data?.title}
              </Typography>
            </div>
          )}
          <div>
            {data?.data?.spoiler_flag &&
            sharedPostSpoiler &&
            (data?.data?.description ||
              data?.data?.images?.length != 0 ||
              data?.data.polls?.length != 0 ||
              data?.data.link_url) ? (
              <SpoilerContainer
                handleViewSpoiler={() => {
                  // console.log(viewSpoiler, 'spoilerrrr');

                  setSharedPostSpoiler(false);
                }}
                spoilerPost={data?.data}
                sharedPost={true}
                text='View Spoiler'
                title={props.post.title}
              />
            ) : data?.data?.nsfw_flag &&
              sharedViewNSFW &&
              (data?.data?.description ||
                data?.data?.images?.length != 0 ||
                data?.data.polls?.length != 0 ||
                data?.data.link_url) ? (
              <SpoilerContainer
                handleViewSpoiler={() => {
                  // console.log(viewSpoiler, 'spoilerrrr');

                  setSharedViewNSFW(false);
                }}
                spoilerPost={props.post}
                sharedPost={true}
                text='View NSFW Content'
                title={props.post.title}
              />
            ) : (
              <div className='flex gap-7 justify-between pb-2'>
                <div className='flex flex-col justify-start space-y-2 overflow-hidden w-full'>
                  <div>
                    <div className='flex flex-col justify-start pt-0'>
                      <div className='flex gap-2'>
                        <Typography
                          variant='small'
                          className='font-body -tracking-tight text-gray-600'
                        >
                          <Link
                            to={`/${name}/overview`}
                            className='hover:underline'
                          >
                            {name}
                          </Link>
                        </Typography>
                        <span className='relative -top-0.5'>•</span>
                        <Typography variant='small' className=''>
                          {dateDuration(new Date(data?.data?.created_at || ''))}
                        </Typography>
                      </div>
                    </div>
                    <Typography variant='h5' className='mb-2 text-blue'>
                      {data?.data?.title}
                    </Typography>
                    {(data?.data?.spoiler_flag || data?.data?.nsfw_flag) && (
                      <div className='flex gap-2 mb-2'>
                        {data?.data?.spoiler_flag && (
                          <div className='flex gap-1 items-center'>
                            <ExclamationTriangleIcon
                              strokeWidth={3}
                              className='w-4 h-4 font-bold text-black'
                            />
                            <Typography
                              variant='small'
                              className='font-bold text-black text-xs'
                            >
                              SPOILER
                            </Typography>
                          </div>
                        )}
                        {data?.data?.nsfw_flag && (
                          <div className='flex gap-1 items-center'>
                            <img
                              src={eighteenPic}
                              // strokeWidth={3}
                              className='w-4 h-4 font-bold text-black'
                            />
                            <Typography
                              variant='small'
                              className='font-bold text-black text-xs'
                            >
                              NSFW
                            </Typography>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className='w-full'>
                    {data?.data?.moderator_details?.removed_flag ||
                    data?.data?.moderator_details?.reported_flag ||
                    data?.data?.moderator_details?.spammed_flag ? (
                      '[removed]'
                    ) : data?.data?.type == 'text' ? (
                      <div className='flex justify-between gap-7'>
                        <div className='flex items-center'>
                          <NonEditableProvider
                            content={data.data?.description}
                          />
                        </div>
                      </div>
                    ) : data?.data?.type == 'polls' ? (
                      <PollPostContainer post={data?.data} />
                    ) : data?.data?.type == 'url' ? (
                      <LinkPostContainer post={data?.data} />
                    ) : null}
                  </div>
                </div>
                {!(
                  data?.data?.moderator_details?.removed_flag ||
                  data?.data?.moderator_details?.reported_flag ||
                  data?.data?.moderator_details?.spammed_flag
                ) &&
                  data?.data?.images?.[0] && (
                    <Tooltip
                      content={
                        data?.data?.images?.length > 1
                          ? `Click to show ${data?.data?.images?.length} images`
                          : 'Click to show image'
                      }
                    >
                      <div className='flex w-32 justify-end items-center gap-1'>
                        <img
                          src={data?.data?.images?.[0].path}
                          alt='post'
                          className='object-cover rounded-md w-32 h-24'
                        />
                      </div>
                    </Tooltip>
                  )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SharedPostContainer;
