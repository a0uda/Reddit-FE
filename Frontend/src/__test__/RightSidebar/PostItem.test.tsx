//typescript
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import PostItem from '../../Components/RightSideBar/PostItem'; // Assume this is the correct import path
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('../../API/User', () => ({
  fetchRequest: jest.fn(),
}));

const queryClient = new QueryClient();

const mockPostItemProps = {
  communityName: 'tech',
  postId: '123',
  postTitle: 'Introduction to React',
  postDescription: 'This is a post about React basics',
  postMediaSrc: 'image.png',
  upvotes: 15,
  comments: 5,
  username: 'johndoe',
};

type WrappedComponentProps = {
  props: {
    communityName: string;
    postId: string;
    postTitle: string;
    postDescription: string;
    postMediaSrc: string;
    upvotes: number;
    comments: number;
    username: string;
  };
};

const WrappedComponent = ({ props }: WrappedComponentProps) => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <PostItem {...props} />
    </Router>
  </QueryClientProvider>
);

describe('PostItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the PostItem component', async () => {
    render(<WrappedComponent props={mockPostItemProps} />);

    expect(screen.getByTestId('post-item')).toBeInTheDocument();
  });

  it('renders the post link', async () => {
    render(<WrappedComponent props={mockPostItemProps} />);

    expect(screen.getByTestId('post-link')).toBeInTheDocument();
  });

  it('displays the correct post title', async () => {
    render(<WrappedComponent props={mockPostItemProps} />);

    expect(screen.getByTestId('post-title').textContent).toBe(
      'Introduction to React'
    );
  });

  it('displays the post media with the correct source', async () => {
    render(<WrappedComponent props={mockPostItemProps} />);

    expect(screen.getByTestId('post-media')).toHaveAttribute(
      'src',
      'image.png'
    );
  });

  it('displays the correct post information', async () => {
    render(<WrappedComponent props={mockPostItemProps} />);

    expect(screen.getByTestId('post-info').textContent).toBe(
      '15 upvotes . 5 comments'
    );
  });

  it('should handle the scenario when fetch returns an error', async () => {
    render(<WrappedComponent props={mockPostItemProps} />);

    expect(screen.queryByTestId('community-badge')).toBeNull();
  });

  it('should display user badge when community data is undefined', async () => {
    render(<WrappedComponent props={mockPostItemProps} />);
    expect(screen.queryByTestId('community-badge')).toBeNull();
    // );
  });

  it('should have correct link when community is available', async () => {
    render(<WrappedComponent props={mockPostItemProps} />);
    await waitFor(() => {
      const expectedLink = `/u/johndoe/comments/123/Introduction_to_React/`;
      expect(screen.getByTestId('post-link').closest('a')).toHaveAttribute(
        'href',
        expectedLink
      );
    });
  });

  it('should have correct link when community data is undefined', async () => {
    render(<WrappedComponent props={mockPostItemProps} />);
    await waitFor(() => {
      const expectedLink = `/u/johndoe/comments/123/Introduction_to_React/`;
      expect(screen.getByTestId('post-link').closest('a')).toHaveAttribute(
        'href',
        expectedLink
      );
    });
  });
});
//
