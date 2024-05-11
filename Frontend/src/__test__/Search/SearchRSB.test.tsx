import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import SearchRSB from '../../Components/Search/SearchRSB';
import { CommunityOverviewType, UserType } from '../../types/types';

const mockCommunities: CommunityOverviewType[] = [
  {
    id: '1',
    name: 'Community 1',
    profile_picture: '',
    favorite_flag: false,
    members_count: 0,
  },
  {
    id: '2',
    name: 'Community 2',
    profile_picture: '',
    favorite_flag: false,
    members_count: 0,
  },
];

const mockUsers: UserType[] = [
  {
    _id: '1',
    username: 'user1',
    display_name: 'User 1',
    profile_picture: 'linktoimage.jpg',
    created_at: '',
    email: '',
    verified_email_flag: false,
    gmail: '',
    facebook_email: '',
    about: '',
    social_links: [],
    banner_picture: '',
    country: '',
    gender: '',
    connected_google: false,
  },
  {
    _id: '2',
    username: 'user2',
    display_name: 'User 2',
    profile_picture: '',
    created_at: '',
    email: '',
    verified_email_flag: false,
    gmail: '',
    facebook_email: '',
    about: '',
    social_links: [],
    banner_picture: '',
    country: '',
    gender: '',
    connected_google: false,
  },
];

describe('SearchRSB Component', () => {
  it('should render "No results found" message when there are no communities and users', () => {
    render(<SearchRSB communities={[]} users={[]} />, {
      wrapper: MemoryRouter,
    });

    const noResultsMessage = screen.getByText('No results found');

    expect(noResultsMessage).toBeInTheDocument();
  });

  it('should render communities and users correctly', () => {
    render(<SearchRSB communities={mockCommunities} users={mockUsers} />, {
      wrapper: MemoryRouter,
    });

    const communityTitle = screen.getByText('Communities');
    const community1Name = screen.getByText('r/Community 1');
    const community2Name = screen.getByText('r/Community 2');
    const seeMoreCommunitiesLink = screen.getByTestId(
      'see-more-communities-link'
    );
    const peopleTitle = screen.getByText('People');
    const user1Name = screen.getByText('User 1');
    const user2Name = screen.getByText('User 2');
    const seeMorePeopleLink = screen.getByTestId('see-more-people-link');

    expect(communityTitle).toBeInTheDocument();
    expect(community1Name).toBeInTheDocument();
    expect(community2Name).toBeInTheDocument();
    expect(seeMoreCommunitiesLink).toBeInTheDocument();
    expect(peopleTitle).toBeInTheDocument();
    expect(user1Name).toBeInTheDocument();
    expect(user2Name).toBeInTheDocument();
    expect(seeMorePeopleLink).toBeInTheDocument();
  });
});
