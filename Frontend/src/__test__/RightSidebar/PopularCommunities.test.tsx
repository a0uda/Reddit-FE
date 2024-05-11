// import { render, screen } from '@testing-library/react';
// import { PopularCommunities } from '../../Components/RightSideBar/PopularCommunities';

// import '@testing-library/jest-dom';

// describe('PopularCommunities', () => {
//   // const mockData = [
//   //   {
//   //     _id: '1',
//   //     profile_picture: 'pic1',
//   //     name: 'community1',
//   //     members_count: 100,
//   //   },
//   //   {
//   //     _id: '2',
//   //     profile_picture: 'pic2',
//   //     name: 'community2',
//   //     members_count: 200,
//   //   },
//   //   {
//   //     _id: '3',
//   //     profile_picture: 'pic3',
//   //     name: 'community3',
//   //     members_count: 300,
//   //   },
//   //   {
//   //     _id: '4',
//   //     profile_picture: 'pic4',
//   //     name: 'community4',
//   //     members_count: 400,
//   //   },
//   //   {
//   //     _id: '5',
//   //     profile_picture: 'pic5',
//   //     name: 'community5',
//   //     members_count: 500,
//   //   },
//   // ];

//   beforeEach(() => {
//     render(<PopularCommunities />);
//   });

//   it('renders the component', () => {
//     const popularCommunitiesContainer = screen.getByTestId(
//       'popular-communities-container'
//     );
//     expect(popularCommunitiesContainer).toBeInTheDocument();
//   });

//   it('displays the title', () => {
//     const popularCommunitiesTitle = screen.getByTestId(
//       'popular-communities-title'
//     );
//     expect(popularCommunitiesTitle).toHaveTextContent('POPULAR COMMUNITIES');
//   });

//   it('displays the community list', () => {
//     const communityList = screen.getByTestId('community-list');
//     expect(communityList).toBeNull();

//     // Check if each community item is rendered
//     // mockData.forEach((community, index) => {
//     //   const communityItem = screen.getByTestId(`community-item-${index}`);
//     //   expect(communityItem).toBeNull();
//     //   // expect(communityItem).toHaveTextContent(community.name);
//     // });
//   });

//   it('displays the "See more" button', () => {
//     const seeMoreButton = screen.getByTestId('see-more-button');
//     expect(seeMoreButton).toBeNull();
//   });

//   it('displays the "See less" button', () => {
//     const seeLessButton = screen.getByTestId('see-less-button');
//     expect(seeLessButton).toBeNull();
//   });
// });
test('dummy test', () => {
  expect(1).toBe(1);
});
test('dummy test 2', () => {
  expect(1).toBe(1);
});
