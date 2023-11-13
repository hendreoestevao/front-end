import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Login from '../src/pages/Login/Login';

jest.mock('axios');

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Digite seu e-mail');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');
    const loginButton = screen.getByText('Acessar');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('handles login with valid credentials', async () => {
    const mockedToken = 'mocked-jwt-token';
    axios.post.mockResolvedValue({ data: { token: mockedToken } });

    render(<Login />);

    const emailInput = screen.getByPlaceholderText('Digite seu e-mail');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');
    const loginButton = screen.getByText('Acessar');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/login', {
        username: 'test@example.com',
        password: 'password123',
      });
      expect(localStorage.getItem('JWT_TOKEN')).toBe(mockedToken);
      expect(window.location.href).toBe('/dashboard');
    });
  });

  test('handles login with invalid credentials', async () => {
    axios.post.mockRejectedValue({ response: { status: 401 } });

    render(<Login />);

    const emailInput = screen.getByPlaceholderText('Digite seu e-mail');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');
    const loginButton = screen.getByText('Acessar');

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/login', {
        username: 'invalid@example.com',
        password: 'invalidpassword',
      });
      expect(localStorage.getItem('JWT_TOKEN')).toBe(null);
      expect(screen.getByText('E-mail ou senha incorretos')).toBeInTheDocument();
    });
  });
});
