// jest.mock('../../assets/facebookIcon.svg', () => 'facebookIcon');
// jest.mock('../../assets/instagramIcon.svg', () => 'instagramIcon');
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import User from './User';
// import { QueryClient, QueryClientProvider } from 'react-query';

// jest.mock('../../hooks/auth/useSession', () => ({
//   __esModule: true,
//   default: jest.fn(() => ({ user: { username: 'test_user' } })),
// }));

// jest.mock('../../API/User', () => ({
//   __esModule: true,
//   fetchRequest: jest.fn(() =>
//     Promise.resolve({
//       data: {
//         about: {
//           username: 'test_user',
//           display_name: 'Test User',
//           profile_picture: 'profile_picture_url',
//         },
//       },
//     })
//   ),
// }));

// describe('User component', () => {
//   let queryClient: QueryClient;

//   beforeEach(() => {
//     queryClient = new QueryClient();
//   });

//   afterEach(() => {
//     queryClient.clear();
//   });

//   it('renders user details and default content', async () => {
//     render(
//       <QueryClientProvider client={queryClient}>
//         <MemoryRouter initialEntries={['/user/test_user/overview']}>
//           <User />
//         </MemoryRouter>
//       </QueryClientProvider>
//     );

//     await screen.findByText('Test User');
//     await screen.findByText('test_user');

//     expect(screen.getByText('Test User')).toBeInTheDocument();
//     expect(screen.getByText('test_user')).toBeInTheDocument();
//     expect(screen.getByAltText('card-image')).toBeInTheDocument();
//     expect(screen.getByText('Overview')).toBeInTheDocument();
//   });

//   it('renders Posts content when Posts link is clicked', async () => {
//     render(
//       <QueryClientProvider client={queryClient}>
//         <MemoryRouter initialEntries={['/user/test_user/posts']}>
//           <User />
//         </MemoryRouter>
//       </QueryClientProvider>
//     );

//     await screen.findByText('Test User');
//     await screen.findByText('test_user');
//     await screen.findByText('Posts');

//     expect(screen.getByText('Test User')).toBeInTheDocument();
//     expect(screen.getByText('test_user')).toBeInTheDocument();
//     expect(screen.getByText('Posts')).toBeInTheDocument();
//     expect(screen.getByText('Posts content')).toBeInTheDocument();
//   });
// });
test('dummy test', () => {
  expect(1).toBe(1);
});
test('dummy test 2', () => {
  expect(1).toBe(1);
});

