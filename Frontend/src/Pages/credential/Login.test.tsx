import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client for react-query
const queryClient = new QueryClient();

describe('Login', () => {
  it('renders Login component', () => {
    const handleOpen = jest.fn();
    const openSignup = jest.fn();
    const openPassword = jest.fn();
    const openUsername = jest.fn();

    const { getByPlaceholderText } = render(
      <QueryClientProvider client={queryClient}>
        <Login
          open={true}
          handleOpen={handleOpen}
          openSignup={openSignup}
          openPassword={openPassword}
          openUsername={openUsername}
        />
      </QueryClientProvider>
    );

    const usernameInput = getByPlaceholderText('Username*');
    const passwordInput = getByPlaceholderText('password');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('submits form with username and password', async () => {
    const handleOpen = jest.fn();
    const openSignup = jest.fn();
    const openPassword = jest.fn();
    const openUsername = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Login
          open={true}
          handleOpen={handleOpen}
          openSignup={openSignup}
          openPassword={openPassword}
          openUsername={openUsername}
        />
      </QueryClientProvider>
    );

    const usernameInput = getByPlaceholderText('Username*');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByText('Log In');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleOpen).toHaveBeenCalled();
    });
  });
});
