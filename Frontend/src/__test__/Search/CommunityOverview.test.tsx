//typescript
// Import necessary tools and libraries for testing
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CommunityOverview from '../../Components/Search/CommunityOverview'; // Import the component to be tested
import { CommunityOverviewType } from '../../types/types';
import { ReactNode } from 'react';

// Helper function to render the component with react-router
const renderWithRouter = (ui: ReactNode, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('CommunityOverview Component', () => {
  it('should display formatted numbers of members', () => {
    const community: CommunityOverviewType = {
      name: 'test',
      members_count: 1000,
      profile_picture: '',
      id: '',
      favorite_flag: false,
    };
    renderWithRouter(<CommunityOverview community={community} />);
    expect(screen.getByText('1K members')).toBeInTheDocument();
  });

  it('should handle name and link correctly', () => {
    const community: CommunityOverviewType = {
      name: 'testname',
      members_count: 500,
      profile_picture: 'example.jpg',
      id: '',
      favorite_flag: false,
    };
    renderWithRouter(<CommunityOverview community={community} />);
    expect(screen.getByText('r/testname')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/r/testname');
  });

  it('should display default avatar when no profile picture is available', () => {
    const community: CommunityOverviewType = {
      name: 'nodefault',
      members_count: 200,
      profile_picture: 'linktoimage.jpg',
      id: '',
      favorite_flag: false,
    };
    renderWithRouter(<CommunityOverview community={community} />);
    expect(screen.getByTestId('default-icon')).toBeInTheDocument();
  });

  it('should display correct avatar size for large variant', () => {
    const community: CommunityOverviewType = {
      name: 'largevariant',
      members_count: 150,
      profile_picture: 'linktoimage.jpg',
      id: '',
      favorite_flag: false,
    };
    renderWithRouter(
      <CommunityOverview community={community} variant='large' />
    );
    const avatar = screen.getByAltText('largevariant');
    expect(avatar.className).toContain('h-10 w-10');
  });

  it('should display correct avatar size for small variant', () => {
    const community: CommunityOverviewType = {
      name: 'smallvariant',
      members_count: 75,
      profile_picture: 'linktoimage.jpg',
      id: '',
      favorite_flag: false,
    };
    renderWithRouter(
      <CommunityOverview community={community} variant='small' />
    );
    const avatar = screen.getByAltText('smallvariant');
    expect(avatar.className).toContain('h-8 w-8');
  });

  it('should apply different gaps based on large', () => {
    const community: CommunityOverviewType = {
      name: 'gaptest',
      members_count: 350,
      profile_picture: 'example.jpg',
      id: '',
      favorite_flag: false,
    };
    renderWithRouter(
      <CommunityOverview community={community} variant='large' />
    );
    const cardBodyWithLargeVariant = screen.getByTestId('card-body');
    expect(cardBodyWithLargeVariant.className).toContain('gap-5');
  });

  it('should apply different gaps based on small', () => {
    const community: CommunityOverviewType = {
      name: 'gaptest',
      members_count: 350,
      profile_picture: 'example.jpg',
      id: '',
      favorite_flag: false,
    };

    renderWithRouter(
      <CommunityOverview community={community} variant='small' />
    );
    const cardBodyWithSmallVariant = screen.getByTestId('card-body');
    expect(cardBodyWithSmallVariant.className).toContain('gap-3');
  });

  it('Handles missing members_count gracefully by displaying 0 members', () => {
    const community: CommunityOverviewType = {
      name: 'nomembers',
      profile_picture: 'linktoimage.jpg',
      id: '',
      favorite_flag: false,
      members_count: 0,
    };
    renderWithRouter(<CommunityOverview community={community} />);
    expect(screen.getByText('0 members')).toBeInTheDocument();
  });
});
//
