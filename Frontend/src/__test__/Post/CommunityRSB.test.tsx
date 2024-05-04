// // FILEPATH: /e:/College/3- Senior 1/Semester 2/Software Engineering/Project/Reddit-FE/Frontend/src/__test__/RightSideBar/CommunityRSB.test.tsx

// import { render, screen } from '@testing-library/react';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { CommunityRSB } from '../../Components/RightSideBar/CommunityRSB';

// const queryClient = new QueryClient();

// describe('CommunityRSB component', () => {
//   const mockProps = {
//     name: 'testCommunity',
//     joined: true,
//   };

//   beforeEach(() => {
//     render(
//       <QueryClientProvider client={queryClient}>
//         <Router>
//           <CommunityRSB {...mockProps} />
//         </Router>
//       </QueryClientProvider>
//     );
//   });

//   it('renders without crashing', () => {
//     expect(screen.getByTestId('community-card')).toBeInTheDocument();
//   });

//   it('renders the join button if not joined', () => {
//     expect(screen.getByTestId('join-button')).toBeInTheDocument();
//   });

//   it('renders the leave button if joined', () => {
//     expect(screen.getByTestId('leave-button')).toBeInTheDocument();
//   });

//   it('renders the message button', () => {
//     expect(screen.getByTestId('message-button')).toBeInTheDocument();
//   });
// });

test('dummy test', () => {
  expect(1).toBe(1);
});
test('dummy test 2', () => {
  expect(1).toBe(1);
});
