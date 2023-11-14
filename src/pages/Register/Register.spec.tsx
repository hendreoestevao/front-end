import '@testing-library/jest-dom'
import { render, fireEvent, act } from '@testing-library/react'
import axios from 'axios'
import Register from './Register'
// Mock axios
jest.mock('axios')

describe('Register component', () => {
  it('deve lidar com o registro bem-sucedido', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: { token: 'fakeToken' }
    })

    const { getByPlaceholderText, getByText } = render(<Register />)

    fireEvent.change(getByPlaceholderText('Digite seu nome'), {
      target: { value: 'Hendreo' }
    })
    fireEvent.change(getByPlaceholderText('Nome de usuario'), {
      target: { value: 'Hendreo1' }
    })
    fireEvent.change(getByPlaceholderText('Digite sua senha'), {
      target: { value: 'password123' }
    })

    await act(async () => {
      fireEvent.click(getByText('Cadastrar'))
    })

    expect(localStorage.getItem('JWT_NOME')).toBe('Hendreo')
  })

  it('deve lidar com erro de registro', async () => {
    ;(axios.post as jest.Mock).mockRejectedValue(
      new Error('Erro ao registrar usuário')
    )

    const { getByPlaceholderText, getByText } = render(<Register />)

    fireEvent.change(getByPlaceholderText('Digite seu nome'), {
      target: { value: 'Hendreo' }
    })
    fireEvent.change(getByPlaceholderText('Nome de usuario'), {
      target: { value: 'Hendreo1' }
    })
    fireEvent.change(getByPlaceholderText('Digite sua senha'), {
      target: { value: 'password123' }
    })

    await act(async () => {
      fireEvent.click(getByText('Cadastrar'))
    })

    expect(
      getByText('Erro ao fazer registro. Tente novamente.')
    ).toBeInTheDocument()
  })
})
