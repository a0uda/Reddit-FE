// import { fireEvent, render, screen } from '@testing-library/react';
// import NewPost from './CreatePost';
// import { BrowserRouter } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import '@testing-library/jest-dom';

// const queryClient = new QueryClient();

// const renderNewPost = () => {
//   render(
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <NewPost />
//       </BrowserRouter>
//     </QueryClientProvider>
//   );
// };

// describe('NewPost Component', () => {
//   it('renders correctly', () => {
//     renderNewPost();

//     expect(screen.getByText('Create a post')).toBeInTheDocument();
//   });

//   it('renders the initial inputs correctly', () => {
//     renderNewPost();

//     expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
//     expect(screen.getByText('Spoiler')).toBeInTheDocument();

//     const spoilerButton = screen.getByText('Spoiler'); // Find the Spoiler button
//     fireEvent.click(spoilerButton); // Click the Spoiler button

//     // Assert that Spoiler flag is toggled
//     expect(spoilerButton).toHaveTextContent('Spoiler'); // Check text content
//   });

//   it('renders the initial inputs correctly', () => {
//     renderNewPost();

//     expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
//     expect(screen.getByText('Spoiler')).toBeInTheDocument();

//     const OCButton = screen.getByText('OC'); // Find the Spoiler button
//     fireEvent.click(OCButton);

//     expect(OCButton).toHaveTextContent('OC'); // Check text content
//   });

//   it('renders the initial inputs correctly', () => {
//     renderNewPost();

//     expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
//     expect(screen.getByText('NSFW')).toBeInTheDocument();

//     const NSFWButton = screen.getByText('NSFW'); // Find the Spoiler button
//     fireEvent.click(NSFWButton);

//     expect(NSFWButton).toHaveTextContent('NSFW'); // Check text content
//   });
// });
