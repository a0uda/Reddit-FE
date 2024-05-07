import { render, screen } from '@testing-library/react';
import CommunityItem from '../../Components/RightSideBar/CommunityItem';
import '@testing-library/jest-dom';

describe('CommunityItem', () => {
  const mockProps = {
    src: 'testSrc',
    name: 'testName',
    membersNumber: 123,
  };

  beforeEach(() => {
    render(<CommunityItem {...mockProps} />);
  });

  it('renders the component', () => {
    const communityItemElement = screen.getByTestId('community-item');
    expect(communityItemElement).toBeInTheDocument();
  });

  it('renders the avatar with correct src', () => {
    const avatarElement = screen.getByTestId('avatar');
    expect(avatarElement).toHaveAttribute('src', mockProps.src);
  });

  it('renders the community name', () => {
    const communityNameElement = screen.getByTestId('community-name');
    expect(communityNameElement).toHaveTextContent(mockProps.name);
  });

  it('renders the members number', () => {
    const membersNumberElement = screen.getByTestId('members-number');
    expect(membersNumberElement).toHaveTextContent(
      `${mockProps.membersNumber} members`
    );
  });
});
