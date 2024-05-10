// import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CommunityRSB from '../../Components/RightSideBar/CommunityRSB';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

const queryClient = new QueryClient();

const mockCommunityData = {
  name: 'testCommunity',
  communityPage: false,
};

const mockCommunityApiResponse = {
  name: 'testCommunity',
  description: 'Test community description',
  members_count: 100,
  joined_flag: false, // Assuming user is not joined initially
};

describe('CommunityRSB', () => {
  beforeEach(() => {
    queryClient.setQueryData(
      ['communitiesRSB', mockCommunityData.name, false],
      mockCommunityApiResponse
    );
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('renders community card with fetched title, description, and member count', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CommunityRSB {...mockCommunityData} />
        </Router>
      </QueryClientProvider>
    );

    // Wait for loading state to resolve
    await waitFor(() => {
      expect(screen.getByTestId('community-title')).toHaveTextContent(
        mockCommunityApiResponse.name
      );
      expect(screen.getByTestId('community-description')).toHaveTextContent(
        mockCommunityApiResponse.description
      );
      expect(screen.getByTestId('members-count')).toHaveTextContent(
        mockCommunityApiResponse.members_count.toString()
      );
    });
  });

  it('renders join button when user is not joined', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CommunityRSB {...mockCommunityData} />
        </Router>
      </QueryClientProvider>
    );

    // Wait for loading state to resolve
    await waitFor(() => {
      expect(screen.getByTestId('join-button')).toBeInTheDocument();
    });
  });

  it('renders leave button when user is already joined', async () => {
    // Modify the joined_flag in mock data to simulate user already joined
    const mockCommunityApiResponseJoined = {
      ...mockCommunityApiResponse,
      joined_flag: true,
    };

    queryClient.setQueryData(
      ['communitiesRSB', mockCommunityData.name, false],
      mockCommunityApiResponseJoined
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CommunityRSB {...mockCommunityData} />
        </Router>
      </QueryClientProvider>
    );

    // Wait for loading state to resolve
    await waitFor(() => {
      expect(screen.getByTestId('leave-button')).toBeInTheDocument();
    });
  });

  it('triggers joinMutation when join button is clicked', async () => {
    const joinMutation = jest.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CommunityRSB {...mockCommunityData} />
        </Router>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const joinButton = screen.getByTestId('join-button');
      fireEvent.click(joinButton);
    });

    expect(joinMutation).toHaveBeenCalledWith(mockCommunityData.name);
  });

  // it('triggers leaveMutation when leave button is clicked', async () => {
  //   const leaveMutation = jest.fn();

  //   // Modify the joined_flag in mock data to simulate user already joined
  //   const mockCommunityApiResponseJoined = {
  //     ...mockCommunityApiResponse,
  //     joined_flag: true,
  //   };

  //   queryClient.setQueryData(
  //     ['communitiesRSB', mockCommunityData.name, false],
  //     mockCommunityApiResponseJoined
  //   );

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <Router>
  //         <CommunityRSB {...mockCommunityData} leaveMutation={leaveMutation} />
  //       </Router>
  //     </QueryClientProvider>
  //   );

  //   await waitFor(() => {
  //     const leaveButton = screen.getByTestId('leave-button');
  //     fireEvent.click(leaveButton);
  //   });

  //   expect(leaveMutation).toHaveBeenCalledWith(mockCommunityData.name);
  // });
});
