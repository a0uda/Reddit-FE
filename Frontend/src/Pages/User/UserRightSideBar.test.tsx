/// <reference types="@testing-library/jest-dom" />
jest.mock('../../assets/facebookIcon.svg', () => 'facebookIcon');
jest.mock('../../assets/instagramIcon.svg', () => 'instagramIcon');
jest.mock('../../API/User', () => ({
  __esModule: true,
  fetchRequest: jest.fn(), // Mocking the fetchRequest function
  postRequest: jest.fn(), // Mocking the postRequest function
}));
import { render, fireEvent } from '@testing-library/react';
import UserRightSideBar from './UserRightSideBar';

describe('UserRightSideBar', () => {
  let handleJoin: jest.Mock;
  let handleLeave: jest.Mock;

  beforeEach(() => {
    handleJoin = jest.fn();
    handleLeave = jest.fn();
  });

  //   it('renders correctly', () => {
  //     render(<UserRightSideBar />);

  //     expect(screen.getByText(/profile/i)).toBeInTheDocument();
  //     expect(screen.getByText(/Moderation/i)).toBeInTheDocument();
  //     expect(screen.getByText(/Links/i)).toBeInTheDocument();
  //     expect(
  //       screen.getByText(/YOU'RE A MODERATOR OF THESE COMMUNITIES/i)
  //     ).toBeInTheDocument();
  //   });

  it('calls handleJoin when "join" button is clicked', () => {
    const { getByText } = render(<UserRightSideBar />);

    fireEvent.click(getByText('join'));

    expect(handleJoin).toHaveBeenCalled();
  });

  it('calls handleLeave when "leave" button is clicked', () => {
    const { getByText } = render(<UserRightSideBar />);

    fireEvent.click(getByText('leave'));

    expect(handleLeave).toHaveBeenCalled();
  });
});
