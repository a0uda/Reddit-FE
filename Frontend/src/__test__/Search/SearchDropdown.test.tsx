import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import SearchDropdown from '../../Components/Search/SearchDropdown';
import { CommunityOverviewType, UserType } from '../../types/types';

// Create a client
const queryClient = new QueryClient();

describe('SearchDropdown Component', () => {
  const mockCommunities = [
    {
      id: '1',
      name: 'community1',
      members_count: 200,
      profile_picture: 'linktoimage.jpg',
    },
    {
      id: '2',
      name: 'community2',
      members_count: 300,
      profile_picture: 'linktoimage.jpg',
    },
  ];

  const mockUsers = [
    {
      _id: '1',
      username: 'user1',
      display_name: 'User 1',
      profile_picture: 'linktoimage.jpg',
    },
    {
      _id: '2',
      username: 'user2',
      display_name: 'User 2',
      profile_picture: 'linktoimage.jpg',
    },
  ];

  const mockRecent = [
    { title: 'Recent 1', icon: 'icon1.png' },
    { title: 'Recent 2', icon: 'icon2.png' },
  ];

  it('should render communities and users when search query is not empty', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SearchDropdown
          setIsFocused={() => {}}
          setSearch={() => {}}
          searchQuery='testQuery'
          communities={mockCommunities as CommunityOverviewType[]}
          users={mockUsers as UserType[]}
          recent={[]}
        />
      </QueryClientProvider>,
      { wrapper: MemoryRouter }
    );

    const communitiesHeading = screen.getByTestId('communities-heading');
    const peopleHeading = screen.getByTestId('people-heading');
    const communityItem1 = screen.getByTestId('community-item-0');
    const communityItem2 = screen.getByTestId('community-item-1');
    const userItem1 = screen.getByTestId('user-item-1');
    const userItem2 = screen.getByTestId('user-item-2');

    expect(communitiesHeading).toBeInTheDocument();
    expect(peopleHeading).toBeInTheDocument();

    expect(communityItem1).toBeInTheDocument();
    expect(communityItem2).toBeInTheDocument();
    expect(userItem1).toBeInTheDocument();
    expect(userItem2).toBeInTheDocument();
  });

  it('should render recent when search query is empty', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SearchDropdown
          setIsFocused={() => {}}
          setSearch={() => {}}
          searchQuery=''
          communities={mockCommunities as CommunityOverviewType[]}
          users={mockUsers as UserType[]}
          recent={mockRecent}
        />
      </QueryClientProvider>,
      { wrapper: MemoryRouter }
    );

    const recentItem1 = screen.getByTestId('recent-item-0');
    const recentItem2 = screen.getByTestId('recent-item-1');
    expect(recentItem1).toBeInTheDocument();
    expect(recentItem2).toBeInTheDocument();
  });

  it('should render search query when search query is not empty', () => {
    const searchQuery = 'testQuery';

    render(
      <QueryClientProvider client={queryClient}>
        <SearchDropdown
          setIsFocused={() => {}}
          setSearch={() => {}}
          searchQuery={searchQuery}
          communities={[]}
          users={[]}
          recent={[]}
        />
      </QueryClientProvider>,
      { wrapper: MemoryRouter }
    );

    const searchQueryElement = screen.getByTestId('search-query');

    expect(searchQueryElement).toBeInTheDocument();
    expect(searchQueryElement).toHaveTextContent(`Search for "${searchQuery}"`);
  });
});
