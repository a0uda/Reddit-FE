import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Search from '../../Pages/Search';

const queryClient = new QueryClient();

describe('Search component', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Search />
        </Router>
      </QueryClientProvider>
    );
  });

  it('renders without crashing', () => {
    expect(screen.getByTestId('search-types')).toBeInTheDocument();
    expect(screen.getByTestId('sort-options-container')).toBeInTheDocument();
    expect(screen.getByTestId('sort-options')).toBeInTheDocument();
    expect(screen.getByTestId('loading-provider')).toBeInTheDocument();
    expect(screen.getByTestId('no-results-found')).toBeInTheDocument();
    expect(screen.getByTestId('search-rsb')).toBeInTheDocument();
  });
});
