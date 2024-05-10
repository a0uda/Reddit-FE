import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MemoryRouter } from 'react-router-dom';
import SearchTypes from '../../Components/Search/SearchTypes';

describe('SearchTypes Component', () => {
  it('should render search types buttons', () => {
    render(<SearchTypes />, { wrapper: MemoryRouter });

    const searchTypes = [
      {
        buttonName: 'Posts',
        buttonLink: 'link',
      },
      {
        buttonName: 'Communities',
        buttonLink: 'sr',
      },
      {
        buttonName: 'Comments',
        buttonLink: 'comment',
      },
      {
        buttonName: 'People',
        buttonLink: 'user',
      },
    ];

    searchTypes.forEach((searchType) => {
      const button = screen.getByTestId(`search-type-${searchType.buttonLink}`);
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(searchType.buttonName);
    });
  });

  it('should render search types testid', () => {
    render(<SearchTypes />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('search-types')).toBeInTheDocument();
  });
});
