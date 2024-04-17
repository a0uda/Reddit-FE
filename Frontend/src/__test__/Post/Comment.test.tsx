import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import Comment from '../../Components/Posts/Comment';

const queryClient = new QueryClient();

describe('Comment component', () => {
  const mockComment = {
    _id: '1',
    username: 'testUser',
    description: 'This is a test comment',
    created_at: new Date().toString(),
    upvotes_count: 10,
    downvotes_count: 2,
    replies_comments_ids: [],
    saved: false,
    hidden: false,
  };

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Comment comment={mockComment} />
        </Router>
      </QueryClientProvider>
    );
  });

  it('renders the username', () => {
    expect(screen.getByText('testUser')).toBeInTheDocument();
  });

  it('renders the comment description', () => {
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
  });

  it('renders the upvotes count', () => {
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders the downvotes count', () => {
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('does not render replies if there are none', () => {
    expect(screen.queryByText('Reply')).not.toBeInTheDocument();
  });
});
