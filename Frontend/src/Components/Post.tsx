import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpTrayIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/solid';
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import ButtonContainer from './ButtonContainer';
import { CommunityIcon } from '../assets/icons/Icons';

const Post = () => {
  const post = {
    title: 'UI/UX Review Check',
    time: new Date(Date.now()),
    image: 'https://source.unsplash.com/random',
    community: {
      name: 'r/SWECommunity',
      icon: 'https://styles.redditmedia.com/t5_3sr5cq/styles/communityIcon_k635u93wwaw81.jpg?format=pjpg&s=37cc0c3373c2fea56541a221efbc2452cf7bd606',
      coverImage:
        'https://styles.redditmedia.com/t5_3sr5cq/styles/bannerBackgroundImage_auewfmsfxn191.png',
      describtion:
        'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
      members: 1000,
      online: 100,
    },
    votes: 1000,
    comments: 100,
  };

  return (
    <>
      <Card
        className='w-full rounded-none border-b-[1px] border-neutral-muted'
        shadow={false}
      >
        <CardHeader
          shadow={false}
          floated={false}
          className='flex flex-row items-center gap-2'
        >
          <div>
            {post.community.icon ? (
              <Avatar src={post.community.icon} size='xs' />
            ) : (
              <CommunityIcon />
            )}
          </div>
          <Typography variant='small' className=''>
            {post.community.name}
          </Typography>
          <span>•</span>
          <Typography variant='small' className=''>
            {post.time.toISOString().split('T')[0]}
          </Typography>
        </CardHeader>
        <CardBody className='flex justify-between space-y-4 pt-2 px-4'>
          <div className='flex flex-col justify-between'>
            <Typography variant='h5' className='mb-2 font-normal text-black'>
              {/* {post.title} */}A third atomic bomb was scheduled to be
              detonated over an undisclosed location in Japan.
            </Typography>
            <InteractionButtons />
          </div>
          {post.image && (
            <img
              src={post.image}
              alt='post'
              className='object-cover rounded-md w-32 h-24'
            />
          )}
        </CardBody>
        {/* <CardFooter className='pt-0'>
        </CardFooter> */}
      </Card>
    </>
  );
};

const InteractionButtons = () => {
  return (
    <div className='flex flex-row items-center gap-4 text-black'>
      <ButtonContainer>
        <IconButton variant='text'>
          <ArrowUpIcon className='h-5 w-5' />
        </IconButton>
        <Typography className='text-base'>1000</Typography>
        <IconButton variant='text'>
          <ArrowDownIcon className='h-5 w-5' />
        </IconButton>
      </ButtonContainer>
      <ButtonContainer>
        <ChatBubbleLeftIcon className='h-5 w-5' />
        <Typography variant='small'>1000</Typography>
      </ButtonContainer>
      <ButtonContainer>
        <ArrowUpTrayIcon className='h-5 w-5' />
        <Typography variant='small'>Share</Typography>
      </ButtonContainer>
    </div>
  );
};

export default Post;
