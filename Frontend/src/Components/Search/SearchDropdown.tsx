import { ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from '@material-tailwind/react';
import { useState } from 'react';
import { CommunityOverviewType, PostType, UserType } from '../../types/types';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { CommunityIcon } from '../../assets/icons/Icons';
import { useNavigate } from 'react-router-dom';
import { fetchRequest } from '../../API/User';
import { useQuery } from 'react-query';
import PostOverview from './PostOverview';
import { HiTrendingUp } from 'react-icons/hi';

const SearchDropdown = ({
  searchQuery,
  communities,
  users,
  setIsFocused,
  setSearch,
}: {
  searchQuery: string;
  communities: CommunityOverviewType[];
  users: UserType[];
  setIsFocused: (isFocused: boolean) => void;
  setSearch: (search: string) => void;
}) => {
  const [recent, setRecent] = useState([
    {
      title: 'programming',
      icon: 'https://www.redditstatic.com/avatars/avatar_default_07_24A0ED.png',
    },
    {
      title: 'test',
    },
  ]);

  const [posts, setPosts] = useState<PostType[] | undefined>();

  useQuery({
    queryKey: ['trending posts'],
    queryFn: () => fetchRequest('posts/trending'),
    onSuccess: (data) => {
      setPosts(data.data);
    },
  });

  const navigate = useNavigate();

  return (
    <List className='p-0'>
      {/* Recent */}
      {searchQuery.length === 0 &&
        (recent.length > 0 ? (
          recent.map((item, index) => (
            <ListItem ripple={false} key={index}>
              <button
                className='flex w-full h-full'
                onClick={() => {
                  setSearch(item.title);
                }}
              >
                <ListItemPrefix>
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.title}
                      className='w-6 h-6 rounded-full'
                    />
                  ) : (
                    <ClockIcon className='h-6 w-6' />
                  )}
                </ListItemPrefix>
                {item.title}
              </button>
              <ListItemSuffix>
                <IconButton
                  variant='text'
                  onClick={() =>
                    setRecent(recent.filter((_, i) => i !== index))
                  }
                >
                  <XCircleIcon className='h-6 w-6' />
                </IconButton>
              </ListItemSuffix>
            </ListItem>
          ))
        ) : (
          <ListItem className='p-0 flex flex-col items-center justify-center text-center hover:bg-transparent focus:bg-transparent'>
            <img
              className='max-h-[150px] mb-xl'
              role='presentation'
              src='https://www.redditstatic.com/shreddit/assets/snoovatar-full-hi.png'
              alt='Image for an empty inbox'
            />
            <div>
              <Typography variant='lead'>No Recent Searches</Typography>
            </div>
            <Typography variant='small'>
              Your recent searches will appear here.
            </Typography>
          </ListItem>
        ))}

      {/* Trending today */}
      {searchQuery.length === 0 && posts && posts.length > 0 && (
        <div>
          <ListItem
            ripple={false}
            className='px-4 mt-2 border-t-2 border-neutral-muted rounded-none'
          >
            <Typography
              variant='small'
              className='font-medium flex items-center gap-2'
            >
              <HiTrendingUp className='h-5 w-5' />
              Trending today
            </Typography>
          </ListItem>
          <div className='px-4'>
            {posts.map((post) => (
              <PostOverview key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Communities */}
      {searchQuery.length > 0 && communities.length > 0 && (
        <>
          <Typography variant='small' className='mx-4 mt-2 font-medium'>
            Communities
          </Typography>
          {communities.map((community, index) => (
            <div
              onClick={() => {
                navigate(`/r/${community.name}`);
                setIsFocused(false);
              }}
              key={community.id + index}
            >
              <ListItem ripple={false} className='px-4'>
                <ListItemPrefix>
                  {community.profile_picture ? (
                    <Avatar
                      variant='circular'
                      alt={community.name}
                      src={community.profile_picture}
                      className='h-6 w-6'
                    />
                  ) : (
                    <CommunityIcon className='h-6 w-6' />
                  )}
                </ListItemPrefix>
                <div>
                  <Typography variant='small' className='text-black'>
                    r/{community.name}
                  </Typography>
                  <Typography
                    variant='small'
                    className='text-neutral-900 text-sm'
                  >
                    {community.members_count} members
                  </Typography>
                </div>
              </ListItem>
            </div>
          ))}
        </>
      )}

      {/* People */}
      {searchQuery.length > 0 && users.length > 0 && (
        <>
          <Typography variant='small' className='mx-4 mt-2 font-medium'>
            People
          </Typography>
          {users.map((user) => (
            <div
              onClick={() => {
                navigate(`/user/${user.username}`);
                setIsFocused(false);
              }}
              key={user._id}
            >
              <ListItem ripple={false} className='px-4'>
                <ListItemPrefix>
                  <Avatar
                    src={
                      user?.profile_picture ||
                      'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
                    }
                    alt={user?.username + "'s Profile"}
                    variant='circular'
                    size='sm'
                  />
                </ListItemPrefix>
                <div>
                  <Typography variant='small' className='text-black'>
                    u/{user.username}
                  </Typography>
                  <Typography
                    variant='small'
                    className='text-neutral-900 text-sm'
                  >
                    {user.display_name}
                  </Typography>
                </div>
              </ListItem>
            </div>
          ))}
        </>
      )}

      {/* Search Query */}
      {searchQuery.length > 0 && (
        <ListItem
          ripple={false}
          className='p-4 border-t-2 border-neutral-muted rounded-none'
        >
          <ListItemPrefix>
            <HiMagnifyingGlass className='h-6 w-6' />
          </ListItemPrefix>
          <span>Search for &quot;{searchQuery}&quot;</span>
        </ListItem>
      )}
    </List>
  );
};
export default SearchDropdown;
