import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'
import '@testing-library/jest-dom'
describe('Componente Header', () => {
  it('renderiza o componente', () => {
    render(<Header onLogout={() => {}} />)
    expect(screen.getByText('Nome de Usuário:')).toBeInTheDocument()
    expect(screen.getByText('Sair')).toBeInTheDocument()
  })

  it('executa a função onLogout ao clicar no botão "Sair"', () => {
    const mockOnLogout = jest.fn()
    render(<Header onLogout={mockOnLogout} />)

    expect(mockOnLogout).not.toHaveBeenCalled()

    userEvent.click(screen.getByText('Sair'))

    setTimeout(() => {
      expect(mockOnLogout).toHaveBeenCalledTimes(1)
    }, 0)
  })
})
