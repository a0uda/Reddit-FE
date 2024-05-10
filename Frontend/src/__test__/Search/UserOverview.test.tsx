import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import UserOverview from '../../Components/Search/UserOverview';
import { UserType } from '../../types/types';

const mockUser: UserType = {
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
};

describe('UserOverview Component', () => {
  it('should render user information correctly', () => {
    render(
      <MemoryRouter>
        <UserOverview user={mockUser} />
      </MemoryRouter>
    );

    const userCard = screen.getByTestId('user-card');
    const userAvatar = screen.getByTestId('user-avatar');
    const username = screen.getByText('u/user1');
    const displayName = screen.getByText('User 1');

    expect(userCard).toBeInTheDocument();
    expect(userAvatar).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(displayName).toBeInTheDocument();
  });

  it('should render default profile picture when user profile picture is not available', () => {
    const userWithoutProfilePicture: UserType = {
      _id: '2',
      username: 'user2',
      display_name: 'User 2',
      created_at: '',
      email: '',
      verified_email_flag: false,
      gmail: '',
      facebook_email: '',
      about: '',
      social_links: [],
      profile_picture: '',
      banner_picture: '',
      country: '',
      gender: '',
      connected_google: false,
    };

    render(
      <MemoryRouter>
        <UserOverview user={userWithoutProfilePicture} />
      </MemoryRouter>
    );

    const defaultProfilePicture = screen.getByAltText("user2's Profile");

    expect(defaultProfilePicture).toBeInTheDocument();
    expect(defaultProfilePicture).toHaveAttribute(
      'src',
      'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'
    );
  });
});
