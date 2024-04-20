// jest.mock('../../assets/facebookIcon.svg', () => 'facebookIcon');
// jest.mock('../../assets/instagramIcon.svg', () => 'instagramIcon');
// jest.mock('../../API/User', () => ({
//   __esModule: true,
//   fetchRequest: jest.fn(), // Mocking the fetchRequest function
//   postRequest: jest.fn(), // Mocking the postRequest function
// }));
// import { fireEvent, render, screen } from '@testing-library/react';
// import UserRightSideBar from './UserRightSideBar';
// import { BrowserRouter } from 'react-router-dom';
// import '@testing-library/jest-dom';

// import { QueryClient, QueryClientProvider } from 'react-query';
// const queryClient = new QueryClient();

// describe('UserRightSideBar', () => {
//   it('renders correctly', () => {
//     render(
//       <QueryClientProvider client={queryClient}>
//         <BrowserRouter>
//           <UserRightSideBar />
//         </BrowserRouter>
//       </QueryClientProvider>
//     );

//     const profileElements = screen.queryAllByText(/profile/i);
//     expect(profileElements).toHaveLength(3);
//     expect(profileElements[0]).toBeInTheDocument();

//     const moderationElements = screen.getAllByText(/Moderation/i);
//     expect(moderationElements).toHaveLength(2);
//     expect(moderationElements[0]).toBeInTheDocument();

//     const communitiesElements = screen.getAllByText(
//       /YOU'RE A MODERATOR OF THESE COMMUNITIES/i
//     );
//     expect(communitiesElements).toHaveLength(1);
//     expect(communitiesElements[0]).toBeInTheDocument();

//     const linksElements = screen.getAllByText(/Links/i);
//     expect(linksElements).toHaveLength(1);
//     expect(linksElements[0]).toBeInTheDocument();
//   });

//   it('navigates to the specified destination when "Add Social Link" is clicked', () => {
//     render(
//       <QueryClientProvider client={queryClient}>
//         <BrowserRouter>
//           <UserRightSideBar />
//         </BrowserRouter>
//       </QueryClientProvider>
//     );
//     const addSocialLink = screen.getByText('Add Social Link');
//     fireEvent.click(addSocialLink);
//     expect(window.location.pathname).toBe('/settings/profile');
//   });

//   it('navigates to the specified destination when "Edit Profile" is clicked', () => {
//     render(
//       <QueryClientProvider client={queryClient}>
//         <BrowserRouter>
//           <UserRightSideBar />
//         </BrowserRouter>
//       </QueryClientProvider>
//     );
//     const EditProfile = screen.getByText('Edit profile');
//     fireEvent.click(EditProfile);
//     expect(window.location.pathname).toBe('/settings/profile');
//   });
// });
// test('dummy test', () => {
//   expect(1).toBe(1);
// });
// test('dummy test 2', () => {
//   expect(1).toBe(1);
// });

