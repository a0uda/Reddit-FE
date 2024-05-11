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
  recent,
  setIsFocused,
  setSearch,
  setRecent,
}: {
  searchQuery: string;
  communities: CommunityOverviewType[];
  users: UserType[];
  setIsFocused: (isFocused: boolean) => void;
  setSearch: (search: string) => void;
  recent?: { title: string; icon?: string }[];
  setRecent?: React.Dispatch<
    React.SetStateAction<{ title: string; icon?: string }[]>
  >;
}) => {
  const [posts, setPosts] = useState<PostType[] | undefined>();

  const url = window.location.href;
  useQuery({
    queryKey: ['trending posts', url],
    queryFn: () => fetchRequest('posts/trending'),
    onSuccess: (data) => {
      console.log('data.data: ', data?.data);
      setPosts(data?.data.content);
    },
  });

  const navigate = useNavigate();

  return (
    <List className='p-0' data-testid='search-dropdown'>
      {/* Recent */}
      {searchQuery.length === 0 &&
        recent &&
        (recent.length > 0 ? (
          recent.map((item, index) => (
            <ListItem
              ripple={false}
              key={index}
              data-testid={`recent-item-${index}`}
            >
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
                  onClick={() => {
                    if (setRecent)
                      setRecent((prev) =>
                        prev.filter((_, i) => i !== recent.indexOf(item))
                      );
                  }}
                >
                  <XCircleIcon className='h-6 w-6' />
                </IconButton>
              </ListItemSuffix>
            </ListItem>
          ))
        ) : (
          <ListItem
            className='p-0 flex flex-col items-center justify-center text-center hover:bg-transparent focus:bg-transparent'
            data-testid='no-recent-searches'
          >
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
            data-testid='trending-today'
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
          <Typography
            variant='small'
            className='mx-4 mt-2 font-medium'
            data-testid='communities-heading'
          >
            Communities
          </Typography>
          {communities.map((community, index) => (
            <div
              onClick={() => {
                navigate(`/r/${community.name}`);
                setIsFocused(false);
              }}
              key={community.id + index}
              data-testid={`community-item-${index}`}
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
          <Typography
            variant='small'
            className='mx-4 mt-2 font-medium'
            data-testid='people-heading'
          >
            People
          </Typography>
          {users.map((user) => (
            <div
              onClick={() => {
                navigate(`/u/${user.username}/overview`);
                setIsFocused(false);
              }}
              key={user._id}
              data-testid={`user-item-${user._id}`}
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
          data-testid='search-query'
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
