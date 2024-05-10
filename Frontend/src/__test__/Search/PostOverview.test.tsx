//typescript
// Necessary imports for unit testing
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostOverview from '../../Components/Search/PostOverview';
import { MemoryRouter } from 'react-router-dom';
// import CommunityBadge from '../../Components/CommunityBadge';
// import UserBadge from '../../Components/UserBadge';
import { PostType } from '../../types/types';

jest.mock('../../Components/CommunityBadge', () =>
  jest.fn(() => <div>CommunityBadge</div>)
);
jest.mock('../../Components/UserBadge', () =>
  jest.fn(() => <div>UserBadge</div>)
);
jest.mock('../../utils/helper_functions', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
  dateDuration: jest.fn().mockReturnValue('1 hour ago'),
  formatNumber: jest.fn().mockImplementation((num) => num.toString()),
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('PostOverview', () => {
  const basePost: PostType = {
    _id: '123',
    title: 'Test Post',
    nsfw_flag: false,
    spoiler_flag: false,
    username: 'testuser',
    created_at: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    upvotes_count: 10,
    downvotes_count: 5,
    comments_count: 3,
    images: [{ path: 'test-image.jpg', caption: 'A test image' }],
    avatar: '',
    saved: false,
    user_id: '',
    deleted: false,
    type: 'text',
    polls_voting_length: 0,
    polls_voting_is_expired_flag: false,
    post_in_community_flag: false,
    comments_ids: [],
    followers_ids: [],
    views_count: 0,
    shares_count: 0,
    oc_flag: false,
    locked_flag: false,
    allowreplies_flag: false,
    scheduled_flag: false,
    moderator_details: {
      approved_flag: false,
      approved_by: undefined,
      approved_date: undefined,
      removed_flag: false,
      removed_by: undefined,
      removed_date: undefined,
      removed_removal_reason: undefined,
      spammed_flag: false,
      spammed_by: undefined,
      spammed_date: undefined,
      spammed_type: undefined,
      spammed_removal_reason: undefined,
      reported_flag: false,
      reported_by: undefined,
      reported_type: undefined,
    },
    user_details: {
      total_views: 0,
      upvote_rate: 0,
      total_shares: 0,
    },
    is_reposted_flag: false,
    vote: 0,
    poll_vote: '',
  };

  it('renders correctly with community', () => {
    render(
      <MemoryRouter>
        <PostOverview post={{ ...basePost, community_name: 'testcommunity' }} />
      </MemoryRouter>
    );
    expect(screen.getByText('CommunityBadge')).toBeInTheDocument();
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('1 hour ago')).toBeInTheDocument();
    expect(screen.getByText('5 votes')).toBeInTheDocument();
    expect(screen.getByText('3 comments')).toBeInTheDocument();
  });

  it('renders with user badge if no community', () => {
    render(
      <MemoryRouter>
        <PostOverview post={{ ...basePost, community_name: undefined }} />
      </MemoryRouter>
    );
    expect(screen.getByText('UserBadge')).toBeInTheDocument();
    expect(screen.queryByText('CommunityBadge')).toBeNull();
  });

  it('navigates on post click', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <PostOverview post={basePost} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(mockedNavigate).toHaveBeenCalledWith(
      '/r/testuser/comments/123/Test_Post/'
    );
  });

  it('handles NSFW and spoiler interactions', () => {
    render(
      <MemoryRouter>
        <PostOverview
          post={{ ...basePost, nsfw_flag: true, spoiler_flag: true }}
        />
      </MemoryRouter>
    );
    expect(screen.getByText('View NSFW')).toBeInTheDocument();
    expect(screen.getByText('View Spolier')).toBeInTheDocument();

    fireEvent.click(screen.getByText('View NSFW'));
    expect(screen.queryByText('View NSFW')).toBeNull();

    fireEvent.click(screen.getByText('View Spolier'));
    expect(screen.queryByText('View Spolier')).toBeNull();
  });

  it('prevents event propagation on image', () => {
    const { container } = render(
      <MemoryRouter>
        <PostOverview post={basePost} />
      </MemoryRouter>
    );
    const imgDiv = container.querySelector('div.relative img');
    fireEvent.click(imgDiv!);
    expect(mockedNavigate).toHaveBeenCalled();
  });

  it('renders without image if no images provided', () => {
    render(
      <MemoryRouter>
        <PostOverview post={{ ...basePost, images: undefined }} />
      </MemoryRouter>
    );
    expect(screen.queryByRole('img')).toBeNull();
  });
});
//
