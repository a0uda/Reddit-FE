import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import SearchBar from '../../Components/Search/SearchBar';

describe('SearchBar component', () => {
  beforeEach(() => {
    render(
      <Router>
        <SearchBar />
      </Router>
    );
  });

  it('renders without crashing', () => {
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(
      screen.getByTestId('search-bar-input-container')
    ).toBeInTheDocument();
    expect(screen.getByTestId('search-bar-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-dropdown')).toBeInTheDocument();
  });

  it('updates search input on change', () => {
    const input = screen.getByTestId('search-bar-input');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toBe('test');
  });

  it('navigates to search page on Enter key press', () => {
    const input = screen.getByTestId('search-bar-input');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(window.location.pathname).toBe('/search/');
  });
});
