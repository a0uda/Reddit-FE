//typescriptreact
// All necessary imports here
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import * as reactRouterDom from 'react-router-dom';
import MobileSearchBar from '../../Components/Search/MobileSearchBar';
import { QueryClient, QueryClientProvider } from 'react-query';

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
describe('MobileSearchBar Component', () => {
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
    mockNavigate.mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MobileSearchBar />
      </QueryClientProvider>,
      { wrapper: MemoryRouter }
    );
  });

  it('should open and close the search dialog on search icon click', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MobileSearchBar />
      </QueryClientProvider>,
      { wrapper: MemoryRouter }
    );
    fireEvent.click(screen.getByTestId('search-icon'));
    expect(screen.getByTestId('search-dialog')).toBeInTheDocument();
  });

  //   it('should update search input', () => {
  //     render(
  //       <QueryClientProvider client={queryClient}>
  //         <MobileSearchBar />
  //       </QueryClientProvider>,
  //       { wrapper: MemoryRouter }
  //     );
  //     const searchIcon = screen.getByTestId('search-icon');
  //     fireEvent.change(searchIcon, { target: { value: 'test' } });
  //     expect(searchIcon).toHaveValue('test');
  //   });

  //   it('should navigate on pressing Enter', () => {
  //     render(
  //       <QueryClientProvider client={queryClient}>
  //         <MobileSearchBar />
  //       </QueryClientProvider>,
  //       { wrapper: MemoryRouter }
  //     );
  //     const searchIcon = screen.getByTestId('search-icon');
  //     fireEvent.click(searchIcon);

  //     const searchInput = screen.getByTestId('search-input');
  //     fireEvent.change(searchInput, { target: { value: 'testQuery' } });
  //     fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
  //     expect(mockNavigate).toHaveBeenCalledWith('/search/?q=testQuery&type=link');
  //   });

  it('should display communities and users from search', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MobileSearchBar />
      </QueryClientProvider>,
      { wrapper: MemoryRouter }
    );
    const searchbar = screen.getByTestId('search-icon');
    fireEvent.click(searchbar);
    const searchIcon = screen.getByTestId('search-input');
    fireEvent.change(searchIcon, { target: { value: '1' } });
    await waitFor(() => {
      const searchDropdown = screen.getByTestId('search-dropdown');
      expect(searchDropdown).toHaveTextContent('community1');
      expect(searchDropdown).toHaveTextContent('user1');
    });
  });

  it('should handle empty data', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MobileSearchBar />
      </QueryClientProvider>,
      { wrapper: MemoryRouter }
    );
    fireEvent.click(screen.getByTestId('search-icon'));
    const searchDropdown = screen.getByTestId('search-dropdown');
    expect(searchDropdown).not.toHaveTextContent('community1');
    expect(searchDropdown).not.toHaveTextContent('user1');
  });
});
//
