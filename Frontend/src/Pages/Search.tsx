import { useNavigate, useSearchParams } from 'react-router-dom';
import ContentLayout from '../Components/ContentLayout';
import LoadingProvider from '../Components/LoadingProvider';
import { useQuery } from 'react-query';
import axios from 'axios';
import {
  CommunityOverviewType,
  PostType,
  SearchCommentType,
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
import { useInView } from 'react-intersection-observer';
import MemoProvider from '../Providers/MemoProvider';

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

  const [posts, setPosts] = useState<PostType[]>([]);
  const [communities, setCommunities] = useState<CommunityOverviewType[]>([]);
  const [comments, setComments] = useState<SearchCommentType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [noMoreData, setNoMoreData] = useState(false);
  const url = window.location.href;
  const { isLoading, isError } = useQuery({
    queryKey: ['search results', q, type, sortOption, page, pageSize, url],
    queryFn: async () => {
      const res = await axios.get(
        `/search/${type === 'link' ? 'posts' : type === 'sr' ? 'communities' : type === 'comment' ? 'comments' : 'people'}?query=${q}&page=${page}&pageSize=${pageSize}`
      );
      if (res.data.length === 0) {
        setNoMoreData(true);
        return;
      }
      console.log('res.data', res.data);

      if (type === 'link') setPosts((prev) => [...prev, ...res.data]);
      if (type === 'sr') setCommunities((prev) => [...prev, ...res.data]);
      if (type === 'comment') setComments((prev) => [...prev, ...res.data]);
      if (type === 'user') setUsers((prev) => [...prev, ...res.data]);
    },
  });

  const { ref: lastPostElementRef, inView: postInView } = useInView();
  const { ref: lastCommunityElementRef, inView: communityInView } = useInView();
  const { ref: lastCommentElementRef, inView: commentInView } = useInView();
  const { ref: lastUserElementRef, inView: userInView } = useInView();

  useEffect(() => {
    if (
      (postInView || communityInView || commentInView || userInView) &&
      !noMoreData
    ) {
      setPage((prevPageNumber) => prevPageNumber + 1);
    }
  }, [postInView, communityInView, commentInView, userInView, noMoreData]);

  useQuery({
    queryKey: ['communities search results', q, type, sortOption, url],
    queryFn: () => axios.get(`/search/communities?query=${q}&pageSize=5`),
    onSuccess: (data) => {
      setCommunities(data.data);
    },
    enabled: type === 'link', // only run the query if type is 'link'
  });
  useQuery({
    queryKey: ['people search results', q, type, sortOption, url],
    queryFn: () => axios.get(`/search/people?query=${q}&pageSize=5`),
    onSuccess: (data) => {
      setUsers(data.data);
    },
    enabled: type === 'link', // only run the query if type is 'link'
  });

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
        <ContentLayout.Main>
          {(isError || isLoading) && isFirstRender && (
            <LoadingProvider error={isError} isLoading={isLoading}>
              {' '}
            </LoadingProvider>
          )}
          <div className='px-6'>
            {posts &&
              type === 'link' &&
              (posts.length > 0 ? (
                <>
                  <MemoProvider>
                    {posts.map((post) => (
                      <div ref={lastPostElementRef} key={post._id}>
                        <PostOverview post={post} />
                        <hr className='border-gray-300' />
                      </div>
                    ))}
                  </MemoProvider>
                </>
              ) : (
                <div className='flex justify-center items-center h-96'>
                  <Typography variant='h5' className='text-gray-500'>
                    No results found
                  </Typography>
                </div>
              ))}
            {communities &&
              type === 'sr' &&
              (communities.length > 0 ? (
                communities.map((community) => (
                  <div ref={lastCommunityElementRef} key={community.id}>
                    <CommunityOverview community={community} />
                    <hr className='border-gray-300' />
                  </div>
                ))
              ) : (
                <div className='flex justify-center items-center h-96'>
                  <Typography variant='h5' className='text-gray-500'>
                    No results found
                  </Typography>
                </div>
              ))}
            {comments &&
              type === 'comment' &&
              (comments.length > 0 ? (
                comments.map((comment) => (
                  <div ref={lastCommentElementRef} key={comment._id}>
                    <CommentOverview comment={comment} />
                    <hr className='border-gray-300' />
                  </div>
                ))
              ) : (
                <div className='flex justify-center items-center h-96'>
                  <Typography variant='h5' className='text-gray-500'>
                    No results found
                  </Typography>
                </div>
              ))}
            {users &&
              type === 'user' &&
              (users.length > 0 ? (
                users.map((user) => (
                  <div ref={lastUserElementRef} key={user._id}>
                    <UserOverview user={user} variant='small' />
                    <hr className='border-gray-300' />
                  </div>
                ))
              ) : (
                <div className='flex justify-center items-center h-96'>
                  <Typography variant='h5' className='text-gray-500'>
                    No results found
                  </Typography>
                </div>
              ))}
          </div>
        </ContentLayout.Main>
        <ContentLayout.RightSideBar>
          {type === 'link' && communities && users && (
            <SearchRSB communities={communities} users={users} />
          )}
        </ContentLayout.RightSideBar>
      </ContentLayout>
    </>
  );
};

export default Search;
