import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CommentOverview from '../../Components/Search/CommentOverview';
import * as helperFunctions from '../../utils/helper_functions';
import { ReactNode } from 'react';
import { SearchCommentType } from '../../types/types';
// import userEvent from '@testing-library/user-event';

// Helper function to render the component within the router context
const renderWithRouter = (component: ReactNode) => {
  return render(<Router>{component}</Router>);
};

describe('CommentOverview', () => {
  const mockComment: SearchCommentType = {
    post_id: {
      _id: '123',
      title: 'Example Title',
      username: 'user123',
      community_name: 'community123',
      created_at: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      upvotes_count: 10,
      downvotes_count: 5,
      comments_count: 3,
      avatar: '',
      saved: false,
      user_id: '',
      deleted: false,
      type: 'image_and_videos',
      polls_voting_length: 0,
      polls_voting_is_expired_flag: false,
      post_in_community_flag: false,
      comments_ids: [],
      followers_ids: [],
      views_count: 0,
      shares_count: 0,
      oc_flag: false,
      spoiler_flag: false,
      nsfw_flag: false,
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
    },
    description: 'This is a test comment.',
    username: 'user123',
    community_name: 'community123',
    created_at: '2021-01-01T00:30:00.000Z',
    upvotes_count: 8,
    downvotes_count: 2,
    moderator_details: {
      approved_flag: false,
      approved_by: '',
      approved_date: '',
      removed_flag: false,
      removed_by: '',
      removed_date: '',
      removed_removal_reason: '',
      spammed_flag: false,
      spammed_by: '',
      spammed_type: '',
      spammed_removal_reason: '',
      reported_flag: false,
      reported_by: '',
      reported_type: '',
    },
    is_post: false,
    saved: false,
    is_reply: false,
    parent_username: '',
    _id: '',
    user_id: '',
    parent_id: '',
    replies_comments_ids: [],
    edited_at: '',
    deleted_at: '',
    deleted: false,
    comment_in_community_flag: false,
    community_id: '',
    spam_flag: false,
    locked_flag: false,
    spoiler_flag: false,
    show_comment_flag: false,
    __v: 0,
  };

  it('should render the CommentOverview component with all elements', () => {
    jest.spyOn(helperFunctions, 'dateDuration').mockReturnValue('1 hour ago');
    jest
      .spyOn(helperFunctions, 'formatNumber')
      .mockImplementation((num) => num.toString());

    renderWithRouter(<CommentOverview comment={mockComment} />);

    expect(screen.getAllByText('r/community123')[0]).toBeInTheDocument();
    expect(screen.getAllByText('1 hour ago')[0]).toBeInTheDocument();
    expect(screen.getByText('Example Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test comment.')).toBeInTheDocument();
    expect(screen.getByText('5 votes')).toBeInTheDocument();
    expect(screen.getByText('3 comments')).toBeInTheDocument();
  });

  it('should format numbers correctly', () => {
    jest
      .spyOn(helperFunctions, 'formatNumber')
      .mockImplementation((num) => `formatted ${num}`);
    renderWithRouter(<CommentOverview comment={mockComment} />);

    expect(screen.getByText('formatted 5 votes')).toBeInTheDocument();
    expect(screen.getByText('formatted 3 comments')).toBeInTheDocument();
  });

  it('should calculate time duration correctly', () => {
    jest.spyOn(helperFunctions, 'dateDuration').mockReturnValue('2 hours ago');
    renderWithRouter(<CommentOverview comment={mockComment} />);

    expect(screen.getAllByText('2 hours ago')).not.toBeNull();
  });

  it('should generate the correct link URL', () => {
    renderWithRouter(<CommentOverview comment={mockComment} />);
    const expectedPath = `/u/user123/comments/123/Example_Title/`;
    expect(screen.getByTestId('comment-overview-link')).toHaveAttribute(
      'href',
      expectedPath
    );
  });

  it('should handle undefined values gracefully', () => {
    const incompleteComment = {
      ...mockComment,
      post_id: { ...mockComment.post_id, community_name: undefined },
    };
    renderWithRouter(<CommentOverview comment={incompleteComment} />);

    expect(screen.getByTestId('comment-overview-dot')).toBeInTheDocument(); // the separator should still render
    expect(screen.queryByText('undefined')).not.toBeInTheDocument(); // "undefined" should not render as a string
  });
});
//
