import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../store';
import ResetPassword from '../components/ResetPassword';
import { toast } from 'react-toastify';

// Mock the toast module
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const renderComponent = () => {
  const store = setupStore();
  return render(
    <Provider store={store}>
      <Router>
        <ResetPassword />
      </Router>
    </Provider>
  );
};

test('renders ResetPassword form', () => {
  renderComponent();
  expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Confirm New Password/i)).toBeInTheDocument();
});

test('shows validation errors on submit', async () => {
  renderComponent();

  fireEvent.click(screen.getByText(/Reset Password/i));

  await waitFor(() => {
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirm Password is required/i)).toBeInTheDocument();
  });
});

test('shows password mismatch error', async () => {
  renderComponent();

  fireEvent.change(screen.getByLabelText(/New Password/i), {
    target: { value: 'password123' },
  });
  fireEvent.change(screen.getByLabelText(/Confirm New Password/i), {
    target: { value: 'password124' },
  });

  fireEvent.click(screen.getByText(/Reset Password/i));

  await waitFor(() => {
    expect(screen.getByText(/Passwords must match/i)).toBeInTheDocument();
  });
});

test('submits form with valid data', async () => {
  renderComponent();

  fireEvent.change(screen.getByLabelText(/New Password/i), {
    target: { value: 'password123' },
  });
  fireEvent.change(screen.getByLabelText(/Confirm New Password/i), {
    target: { value: 'password123' },
  });

  fireEvent.click(screen.getByText(/Reset Password/i));

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith('Password reset successfully!');
  });
});

test('handles API errors correctly', async () => {
  const mockResetPassword = jest.fn(() => Promise.reject({ status: 400, data: { message: 'Invalid or expired token' } }));
  jest.mock('../store/api/UserSlice.js', () => ({
    useResetPasswordMutation: () => [mockResetPassword, { isLoading: false }],
  }));

  renderComponent();

  fireEvent.change(screen.getByLabelText(/New Password/i), {
    target: { value: 'password123' },
  });
  fireEvent.change(screen.getByLabelText(/Confirm New Password/i), {
    target: { value: 'password123' },
  });

  fireEvent.click(screen.getByText(/Reset Password/i));

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('Invalid or expired token');
  });
});
