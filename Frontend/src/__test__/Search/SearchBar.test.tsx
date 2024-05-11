//typescriptreact
// All necessary imports here
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import * as reactRouterDom from 'react-router-dom';
import SearchBar from '../../Components/Search/SearchBar';
import { QueryClient, QueryClientProvider } from 'react-query';
// import userEvent from '@testing-library/user-event';

// Create a client
const queryClient = new QueryClient();

// Mocks
jest.mock('../../hooks/useSearch');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Test configuration
const mockNavigate = reactRouterDom.useNavigate as jest.MockedFunction<
  typeof reactRouterDom.useNavigate
>;

// Test configuration
const mockUseSearch = useSearch as jest.MockedFunction<typeof useSearch>;

// unit tests with Jest code here
describe('SearchBar Component', () => {
  beforeEach(() => {
    mockUseSearch.mockImplementation((endpoint: string) => {
      if (endpoint.includes('/search/communities')) {
        return {
          data: [
            {
              name: 'community1',
              members_count: 200,
              profile_picture: 'linktoimage.jpg',
              id: '',
              favorite_flag: false,
            },
            {
              name: 'community2',
              members_count: 200,
              profile_picture: 'linktoimage.jpg',
              id: '',
              favorite_flag: false,
            },
          ],
          error: '',
          isLoading: false,
        };
      }
      if (endpoint.includes('/search/people')) {
        return {
          data: [
            {
              _id: '661a2c3fab10a4b012e8f59a',
              username: 'user1',
              created_at: '2024-04-13T06:53:20.537Z',
              email: 'me22@gmail.com',
              verified_email_flag: false,
              connected_google: false,
              display_name: 'm',
              about: '',
              social_links: [],
              profile_picture:
                'https://conflictresolutionmn.org/wp-content/uploads/2020/01/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg',
              banner_picture: '',
              gender: 'Male',
            },
            {
              _id: '661a2c3fab10a4b012e8f59a',
              username: 'user2',
              created_at: '2024-04-13T06:53:20.537Z',
              email: 'me22@gmail.com',
              verified_email_flag: false,
              connected_google: false,
              display_name: 'm',
              about: '',
              social_links: [],
              profile_picture:
                'https://conflictresolutionmn.org/wp-content/uploads/2020/01/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg',
              banner_picture: '',
              gender: 'Male',
            },
          ],
          error: '',
          isLoading: false,
        };
      }
      return { data: null, error: 'Error', isLoading: false };
    });
  });

  it('should navigate to search page on Enter key press', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SearchBar />
      </QueryClientProvider>,
      { wrapper: MemoryRouter }
    );
    const searchInput = screen.getByTestId('search-bar') as HTMLInputElement;
    // fireEvent.change(searchInput, { value: 'testQuery' });
    // expect(searchInput.value).toBe('testQuery');

    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    expect(mockNavigate).toHaveBeenCalledWith('/search/?q=testQuery&type=link');
  });

  // it('should display communities and users from search', async () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <SearchBar />
  //     </QueryClientProvider>,
  //     { wrapper: MemoryRouter }
  //   );
  //   const searchbar = screen.getByTestId('search-bar');
  //   fireEvent.click(searchbar);
  //   const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
  //   fireEvent.change(searchInput, { value: '1' });
  //   expect(searchInput.value).toBe('1');
  //   await waitFor(() => {
  //     const searchDropdown = screen.getByTestId('search-dropdown');
  //     expect(searchDropdown).toHaveTextContent('community1');
  //     expect(searchDropdown).toHaveTextContent('user1');
  //   });
  // });

  it('should handle empty data', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SearchBar />
      </QueryClientProvider>,
      { wrapper: MemoryRouter }
    );
    fireEvent.click(screen.getByTestId('search-bar'));
    const searchDropdown = screen.getByTestId('search-dropdown');
    expect(searchDropdown).not.toHaveTextContent('community1');
    expect(searchDropdown).not.toHaveTextContent('user1');
  });
});
