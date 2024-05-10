import { render, fireEvent, screen } from '@testing-library/react';
import NewPost from './CreatePost';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom';

const queryClient = new QueryClient();

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

    expect(screen.getByText('Create a post')).toBeInTheDocument();
  });

  it('renders the initial inputs correctly', () => {
    renderNewPost();

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

  it('handles form submission', async () => {
    renderNewPost();

    // Fill in the form with some data
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Test Title' },
    });

    // Submit the form
    const postButton = screen.getByText('Post');
    fireEvent.click(postButton);
  });

  it('displays the discard post modal when cancel button is clicked', () => {
    renderNewPost();

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(screen.getByText('Discard Post?')).toBeInTheDocument();
  });
});

// test('dummy test', () => {
//   expect(1).toBe(1);
// });
// test('dummy test 2', () => {
//   expect(1).toBe(1);
// });
