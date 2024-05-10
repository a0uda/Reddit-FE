// RecentPosts.test.tsx
import { render, screen } from '@testing-library/react';
import RecentPosts from '../../Components/RightSideBar/RecentPosts';
import '@testing-library/jest-dom';

describe('RecentPosts', () => {
  const mockProps = {
    response: [
      {
        community_name: 'testCommunity1',
        _id: 'testId1',
        title: 'testTitle1',
        description: 'testDescription1',
        images: [{ path: 'testPath1' }],
        upvotes_count: 123,
        comments_count: 456,
        username: 'testUsername1',
      },
      {
        community_name: 'testCommunity2',
        _id: 'testId2',
        title: 'testTitle2',
        description: 'testDescription2',
        images: [{ path: 'testPath2' }],
        upvotes_count: 789,
        comments_count: 1011,
        username: 'testUsername2',
      },
      // Add more mock posts as needed
    ],
  };

  beforeEach(() => {
    render(<RecentPosts {...mockProps} />);
  });

  it('renders the component', () => {
    const recentPostsElement = screen.getByTestId('recent-posts-container');
    expect(recentPostsElement).toBeInTheDocument();
  });

  it('renders the post items', () => {
    const postItemElement1 = screen.getByTestId('post-item-0');
    expect(postItemElement1).toBeInTheDocument();
    expect(postItemElement1).toHaveTextContent('testTitle1');
    expect(postItemElement1).toHaveTextContent('testDescription1');

    const postItemElement2 = screen.getByTestId('post-item-1');
    expect(postItemElement2).toBeInTheDocument();
    expect(postItemElement2).toHaveTextContent('testTitle2');
    expect(postItemElement2).toHaveTextContent('testDescription2');
    // Add more assertions as needed
  });

  it('renders the clear button', () => {
    const clearButtonElement = screen.getByTestId('clear-button');
    expect(clearButtonElement).toBeInTheDocument();
  });
});

test('dummy test', () => {
  expect(1).toBe(1);
});

test('dummy test 2', () => {
  expect(1).toBe(1);
});
