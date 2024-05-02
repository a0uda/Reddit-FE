import { useNavigate, useSearchParams } from 'react-router-dom';
import ContentLayout from '../Components/ContentLayout';
import LoadingProvider from '../Components/LoadingProvider';
import { useQuery } from 'react-query';
import axios from 'axios';
import {
  CommentType,
  CommunityOverviewType,
  PostType,
  UserType,
} from '../types/types';
import PostOverview from '../Components/Search/PostOverview';
import SearchTypes from '../Components/Search/SearchTypes';
import { useEffect, useRef, useState } from 'react';
import CommunityOverview from '../Components/Search/CommunityOverview';
import SearchRSB from '../Components/Search/SearchRSB';
import UserOverview from '../Components/Search/UserOverview';
import CommentOverview from '../Components/Search/CommentOverview';
import SortOptions from '../Components/SortOptions';
import { capitalizeString } from '../utils/helper_functions';
import { Typography } from '@material-tailwind/react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  const type = searchParams.get('type');
  const sort = searchParams.get('sort');

  const sortOptions = ['Relevance', 'Hot', 'Top', 'New', 'Most Comments'];
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState(
    capitalizeString(sort || '') || sortOptions[0]
  );

  if (!sortOptions.includes(sortOption)) {
    setSortOption(sortOptions[0]);
  }

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    navigate(`/search/?q=${q}&type=${type}&sort=${sortOption.toLowerCase()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  const [posts, setPosts] = useState<PostType[] | undefined>();
  const [communities, setCommunities] = useState<
    CommunityOverviewType[] | undefined
  >();
  const [comments, setComments] = useState<CommentType[] | undefined>();
  const [users, setUsers] = useState<UserType[] | undefined>();

  const { isLoading, isError } = useQuery({
    queryKey: ['search results', q, type, sortOption],
    queryFn: () => axios.get(`/search/?q=${q}&type=${type}`, {}),
    onSuccess: (data) => {
      if (type === 'link') {
        setPosts(data.data.posts);
        setCommunities(data.data.communities);
        setUsers(data.data.users);
      }
      if (type === 'sr') setCommunities(data.data);
      if (type === 'comment') setComments(data.data);
      if (type === 'user') setUsers(data.data);
    },
  });

  // community name
  // username
  // page: home, post, community, profile

  return (
    <>
      <ContentLayout
        header={
          <ContentLayout.Header>
            <SearchTypes />
            {/* Sorting */}
            <div className='flex items-center gap-2 my-2'>
              <Typography variant='small' className=' text-xs shrink-0'>
                Sort By:
              </Typography>
              <SortOptions
                sortOptions={sortOptions}
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
              {/* Separator */}
              <div className='border-t-2 border-neutral-muted h-0.5 w-full'></div>
            </div>
          </ContentLayout.Header>
        }
      >
        <LoadingProvider error={isError} isLoading={isLoading}>
          <>
            <ContentLayout.Main>
              <div className='px-6'>
                {posts &&
                  type === 'link' &&
                  posts.length > 0 &&
                  posts.map((post) => (
                    <div key={post._id}>
                      <PostOverview post={post} />
                      <hr className='border-gray-300' />
                    </div>
                  ))}
                {communities &&
                  type === 'sr' &&
                  communities.length > 0 &&
                  communities.map((community) => (
                    <div key={community.id}>
                      <CommunityOverview community={community} />
                      <hr className='border-gray-300' />
                    </div>
                  ))}
                {comments &&
                  type === 'user' &&
                  comments.length > 0 &&
                  comments.map((comment) => (
                    <div key={comment._id}>
                      <CommentOverview post={post} comment={comment} />
                      <hr className='border-gray-300' />
                    </div>
                  ))}
                {users &&
                  type === 'user' &&
                  users.length > 0 &&
                  users.map((user) => (
                    <div key={user._id}>
                      <UserOverview user={user} variant='small' />
                      <hr className='border-gray-300' />
                    </div>
                  ))}
              </div>
            </ContentLayout.Main>
            <ContentLayout.RightSideBar>
              {type === 'link' && communities && users && (
                <SearchRSB communities={communities} users={users} />
              )}
            </ContentLayout.RightSideBar>
          </>
        </LoadingProvider>
      </ContentLayout>
    </>
  );
};

export default Search;
