import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import axios from 'axios'
import Register from '../src/pages/Register/Register'
jest.mock('axios')

describe('Register Component', () => {
  test('renders register form', () => {
    render(<Register />)
    const nameInput = screen.getByPlaceholderText('Digite seu nome')
    const usernameInput = screen.getByPlaceholderText('Digite seu e-mail')
    const passwordInput = screen.getByPlaceholderText('Digite sua senha')
    const registerButton = screen.getByText('Cadastrar')

    expect(nameInput).toBeInTheDocument()
    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(registerButton).toBeInTheDocument()
  })

  test('handles registration with valid credentials', async () => {
    const mockedToken = 'mocked-jwt-token'
    axios.post.mockResolvedValue({ data: { token: mockedToken } })

    render(<Register />)

    const nameInput = screen.getByPlaceholderText('Digite seu nome')
    const usernameInput = screen.getByPlaceholderText('Digite seu e-mail')
    const passwordInput = screen.getByPlaceholderText('Digite sua senha')
    const registerButton = screen.getByText('Cadastrar')

    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(usernameInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(registerButton)

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3000/register',
        {
          username: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        }
      )
      expect(localStorage.getItem('JWT_TOKEN')).toBe(mockedToken)
      expect(localStorage.getItem('JWT_NOME')).toBe('Test User')
      expect(window.location.href).toBe('/dashboard')
    })
  })

  test('handles registration with invalid credentials', async () => {
    axios.post.mockRejectedValue({ response: { status: 500 } })

    render(<Register />)

    const nameInput = screen.getByPlaceholderText('Digite seu nome')
    const usernameInput = screen.getByPlaceholderText('Digite seu e-mail')
    const passwordInput = screen.getByPlaceholderText('Digite sua senha')
    const registerButton = screen.getByText('Cadastrar')

    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(usernameInput, {
      target: { value: 'invalid@example.com' }
    })
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } })
    fireEvent.click(registerButton)

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3000/register',
        {
          username: 'invalid@example.com',
          password: 'invalidpassword',
          name: 'Test User'
        }
      )
      expect(localStorage.getItem('JWT_TOKEN')).toBe(null)
      expect(localStorage.getItem('JWT_NOME')).toBe(null)
      expect(
        screen.getByText('Erro ao fazer registro. Tente novamente.')
      ).toBeInTheDocument()
    })
  })
})
