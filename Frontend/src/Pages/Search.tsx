import { useSearchParams } from 'react-router-dom';
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
import { useState } from 'react';
import CommunityOverview from '../Components/Search/CommunityOverview';
import SearchRSB from '../Components/Search/SearchRSB';
import UserOverview from '../Components/Search/UserOverview';

const Search = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  const type = searchParams.get('type');

  const controller = new AbortController();

  const [posts, setPosts] = useState<PostType[] | undefined>();
  const [communities, setCommunities] = useState<
    CommunityOverviewType[] | undefined
  >();
  const [comments, setComments] = useState<CommentType[] | undefined>();
  const [users, setUsers] = useState<UserType[] | undefined>();
  const { isLoading, isError } = useQuery({
    queryKey: ['search results', q, type],
    queryFn: () =>
      axios.get(`/search/?q=${q}&type=${type}`, {
        signal: controller.signal,
      }),
    onSuccess: (data) => {
      console.log('search: ', data.data);
      if (type === 'link') {
        setPosts(data.data.posts);
        setCommunities(data.data.communities);
        setUsers(data.data.users);
      }
      if (type === 'sr') setCommunities(data.data);
      if (type === 'comment') setComments(data.data);
      if (type === 'user') setUsers(data.data);
      // return data;
    },
  });

  // community name
  // username
  // page: home, post, community, profile

  return (
    <>
      <ContentLayout>
        <LoadingProvider error={isError} isLoading={isLoading}>
          <>
            <ContentLayout.Main>
              <SearchTypes />
              {/* Sorting */}
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
                {users &&
                  type === 'user' &&
                  users.length > 0 &&
                  users.map((user) => (
                    <div key={user.id}>
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
