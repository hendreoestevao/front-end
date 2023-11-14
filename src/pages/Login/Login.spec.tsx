import { render, fireEvent, act } from '@testing-library/react'
import axios from 'axios'
import Login from './Login'
import '@testing-library/jest-dom'

jest.mock('axios')

describe('Login component', () => {
  it('deve lidar com o login bem-sucedido', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: { token: 'fakeToken' }
    })

    const localStorageSpy = jest.spyOn(Storage.prototype, 'setItem')

    const { getByLabelText, getByText } = render(<Login />)

    fireEvent.change(getByLabelText('E-mail'), {
      target: { value: 'testUser' }
    })
    fireEvent.change(getByLabelText('Senha'), {
      target: { value: 'testPassword' }
    })

    await act(async () => {
      fireEvent.click(getByText('Acessar'))
    })

    expect(localStorageSpy).toHaveBeenCalledWith('JWT_TOKEN', 'fakeToken')
  })

  it('deve lidar com erro de login', async () => {
    ;(axios.post as jest.Mock).mockRejectedValue(
      new Error('Credenciais inválidas')
    )

    const { getByLabelText, getByText } = render(<Login />)

    fireEvent.change(getByLabelText('E-mail'), {
      target: { value: 'testUser' }
    })
    fireEvent.change(getByLabelText('Senha'), {
      target: { value: 'testPassword' }
    })

    await act(async () => {
      fireEvent.click(getByText('Acessar'))
    })

    expect(getByText('E-mail ou senha incorretos')).toBeInTheDocument()
  })
})
