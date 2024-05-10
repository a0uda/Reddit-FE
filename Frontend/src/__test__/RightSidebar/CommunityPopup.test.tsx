// CommunityPopup.test.tsx
import { render, screen } from '@testing-library/react';
import CommunityPopup from '../../Components/RightSideBar/CommunityPopup';
import '@testing-library/jest-dom';

describe('CommunityPopup', () => {
  const mockProps = {
    communityCoverImage: 'testCoverSrc',
    communityAvatar: 'testAvatarSrc',
    communityName: 'testName',
    communityDescription: 'testDescription',
    communityMembers: 123,
  };

  beforeEach(() => {
    render(<CommunityPopup {...mockProps} />);
  });

  it('renders the component', () => {
    const communityPopupElement = screen.getByTestId('community-popup');
    expect(communityPopupElement).toBeInTheDocument();
  });

  it('renders the cover image with correct src', () => {
    const coverImageElement = screen.getByTestId('community-cover');
    expect(coverImageElement).toHaveAttribute(
      'src',
      mockProps.communityCoverImage
    );
  });

  it('renders the avatar with correct src', () => {
    const avatarElement = screen.getByTestId('community-avatar');
    expect(avatarElement).toHaveAttribute('src', mockProps.communityAvatar);
  });

  it('renders the community name', () => {
    const communityNameElement = screen.getByTestId('community-name');
    expect(communityNameElement).toHaveTextContent(
      `r/${mockProps.communityName}`
    );
  });

  it('renders the community description', () => {
    const communityDescriptionElement = screen.getByTestId(
      'community-description'
    );
    expect(communityDescriptionElement).toHaveTextContent(
      mockProps.communityDescription
    );
  });

  it('renders the members number', () => {
    const membersNumberElement = screen.getByTestId('community-members');
    expect(membersNumberElement).toHaveTextContent(
      `${mockProps.communityMembers}`
    );
  });
});

test('dummy test', () => {
  expect(1).toBe(1);
});

test('dummy test 2', () => {
  expect(1).toBe(1);
});
