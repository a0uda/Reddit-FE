import { render, fireEvent, screen } from '@testing-library/react';
import NewPost from './CreatePost';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom';

// Initialize a query client
const queryClient = new QueryClient();

// Helper function to render NewPost component with necessary context providers
const renderNewPost = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NewPost />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('NewPost Component', () => {
  it('renders correctly', () => {
    renderNewPost();
    // Check if the component renders the title
    expect(screen.getByText('Create a post')).toBeInTheDocument();
  });

  it('renders the initial inputs correctly', () => {
    renderNewPost();
    // Check if the input fields for 'Title' and 'SearchBar' are present
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByText('Search community')).toBeInTheDocument();
  });

  it('allows the user to toggle OC, Spoiler, and NSFW flags', () => {
    renderNewPost();

    // Toggle OC flag and verify the button state and flag value
    const ocButton = screen.getByText(/OC/i);
    fireEvent.click(ocButton);
    expect(ocButton).toHaveClass('bg-orange');
    expect(screen.getByText('OC')).toHaveTextContent(/Check/);

    // Toggle Spoiler flag and verify the button state and flag value
    const spoilerButton = screen.getByText(/Spoiler/i);
    fireEvent.click(spoilerButton);
    expect(spoilerButton).toHaveClass('bg-black');
    expect(screen.getByText('Spoiler')).toHaveTextContent(/Check/);

    // Toggle NSFW flag and verify the button state and flag value
    const nsfwButton = screen.getByText(/NSFW/i);
    fireEvent.click(nsfwButton);
    expect(nsfwButton).toHaveClass('bg-orange-red');
    expect(screen.getByText('NSFW')).toHaveTextContent(/Check/);
  });

  //   it('handles form submission', async () => {
  //     renderNewPost();

  //     // Fill in the form with some data
  //     fireEvent.change(screen.getByPlaceholderText('Title'), {
  //       target: { value: 'Test Title' },
  //     });

  //     // Submit the form
  //     const postButton = screen.getByText('Post');
  //     fireEvent.click(postButton);

  //     // Add further assertions here depending on your application's expected behavior
  //     // For example, you can verify that the form was submitted correctly and the navigation occurred.
  //     // You can also use jest mocks for the postRequest function and verify if it was called as expected.

  //     // Example: expect(window.location.pathname).toBe('/');
  //     // You may need to adjust the above line to fit your application's behavior and routing.
  //   });

  //   it('displays the discard post modal when cancel button is clicked', () => {
  //     renderNewPost();

  //     // Click the cancel button
  //     const cancelButton = screen.getByText('Cancel');
  //     fireEvent.click(cancelButton);

  //     // Verify that the discard post modal is displayed
  //     // Adjust the selector and assertion as needed for your discard post modal
  //     expect(screen.getByText('Discard Post?')).toBeInTheDocument();
  //   });
});
