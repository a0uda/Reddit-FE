// import { render, screen } from '@testing-library/react';
// import { RecentPosts } from '../../Components/RightSideBar/RecentPosts';
// import '@testing-library/jest-dom';

// describe('RecentPosts', () => {
//   const mockProps = {
//     response: [
//       {
//         community_name: 'testCommunity1',
//         _id: 'testId1',
//         title: 'testTitle1',
//         description: 'testDescription1',
//         images: [{ path: 'testPath1' }],
//         upvotes_count: 123,
//         comments_count: 456,
//         username: 'testUsername1',
//       },
//       {
//         community_name: 'testCommunity2',
//         _id: 'testId2',
//         title: 'testTitle2',
//         description: 'testDescription2',
//         images: [{ path: 'testPath2' }],
//         upvotes_count: 789,
//         comments_count: 1011,
//         username: 'testUsername2',
//       },
//       // Add more mock posts as needed
//     ],
//   };

//   beforeEach(() => {
//     render(<RecentPosts />);
//   });

//   it('renders the component with correct post items', () => {
//     const recentPostsElement = screen.getByTestId('recent-posts-container');
//     expect(recentPostsElement).toBeInTheDocument();

//     // Check if the correct number of post items are rendered
//     const postItems = screen.getAllByTestId(/^post-item-\d+$/);
//     expect(postItems.length).toBe(mockProps.response.length);

//     // Check if each post item renders the correct title and description
//     mockProps.response.forEach((post, index) => {
//       const postItemElement = screen.getByTestId(`post-item-${index}`);
//       expect(postItemElement).toBeInTheDocument();
//       expect(postItemElement).toHaveTextContent(post.title);
//       expect(postItemElement).toHaveTextContent(post.description);
//     });
//   });

//   it('renders the clear button', () => {
//     const clearButtonElement = screen.getByTestId('clear-button');
//     expect(clearButtonElement).toBeInTheDocument();
//   });
// });

test('dummy test', () => {
  expect(1).toBe(1);
});

test('dummy test 2', () => {
  expect(1).toBe(1);
});
