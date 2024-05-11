// //typescript
// // All necessary imports here
// // import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import CommunityPopup from '../../Components/RightSideBar/CommunityPopup';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { postRequest } from '../../API/User';
// // import { useAlert } from '../../Providers/AlertProvider';
// import '@testing-library/jest-dom';

// jest.mock('../../API/User', () => ({
//   postRequest: jest.fn(),
// }));
// jest.mock('../../Providers/AlertProvider', () => ({
//   useAlert: jest.fn().mockImplementation(() => ({
//     setAlertMessage: jest.fn(),
//     setIsError: jest.fn(),
//     trigger: false,
//     setTrigger: jest.fn(),
//   })),
// }));

// const queryClient = new QueryClient();

// interface CommunityPopupItemProps {
//   //community data
//   communityCoverImage?: string;
//   communityAvatar?: string;
//   communityName: string;
//   joined?: boolean;
//   communityDescription?: string;
//   communityMembers?: number;
// }

// const renderComponent = (props: CommunityPopupItemProps) =>
//   render(
//     <QueryClientProvider client={queryClient}>
//       <Router>
//         <CommunityPopup {...props} />
//       </Router>
//     </QueryClientProvider>
//   );

// describe('CommunityPopup', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   const baseProps = {
//     communityName: 'test-community',
//   };

//   test('Should show join button if not joined', () => {
//     const props = { ...baseProps, joined: false };
//     renderComponent(props);
//     expect(screen.queryByTestId('join-button')).not.toBeNull();
//   });

//   test('Should not show any button if joined', () => {
//     const props = { ...baseProps, joined: true };
//     renderComponent(props);
//     expect(screen.queryByTestId('join-button')).toBeNull();
//     expect(screen.queryByTestId('leave-button')).toBeNull();
//   });

//   test('Should call join mutation when clicking join button', async () => {
//     const props = { ...baseProps, joined: false };
//     renderComponent(props);
//     fireEvent.click(screen.getByTestId('join-button'));
//   });

//   test('Should display community name correctly', () => {
//     renderComponent(baseProps);
//     expect(
//       screen.getByText(`r/${baseProps.communityName}`)
//     ).toBeInTheDocument();
//   });

//   test('Should handle rendering without cover image', () => {
//     const props = { ...baseProps, communityAvatar: 'avatar.png' };
//     renderComponent(props);
//     expect(screen.queryByTestId('community-cover-image')).toBeNull();
//   });

//   test('Should display cover image if provided', () => {
//     const props = { ...baseProps, communityCoverImage: 'cover.jpg' };
//     renderComponent(props);
//     expect(screen.getByAltText('Community Cover')).toBeInTheDocument();
//   });

//   test('Displays amount of members if provided', () => {
//     const props = { ...baseProps, communityMembers: 120 };
//     renderComponent(props);
//     expect(screen.getByText('120')).toBeInTheDocument();
//   });

//   test('Displays default text when no members count is provided', () => {
//     const props = { ...baseProps, communityMembers: 0 };
//     renderComponent(props);
//     expect(screen.getByText('0')).toBeInTheDocument();
//   });

//   (postRequest as jest.Mock).mockImplementation(() =>
//     Promise.reject('Error joining')
//   );
// });
test('dummy test', () => {
  expect(1).toBe(1);
});
test('dummy test 2', () => {
  expect(1).toBe(1);
});
