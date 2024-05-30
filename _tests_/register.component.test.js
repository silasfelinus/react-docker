import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../pages/auth/register';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Register Component', () => {
  it('renders registration form', () => {
    render(<Register />);

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Register'));

    expect(fetchMock).toHaveBeenCalledWith('/api/auth/register', expect.anything());
    await screen.findByText(/Check your email/i);
  });

  it('handles form submission failure', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'User already exists' }), { status: 409 });

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Register'));

    await screen.findByText(/User already exists/i);
  });
});
