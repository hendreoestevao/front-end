import { render, screen } from '@testing-library/react'
import Home from './Home'
import '@testing-library/jest-dom'

jest.mock('./components/AddTodoForm/AddTodoForm', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('./components/TodoListLoader/TodoListLoader', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('./components/MarkAsDoneButton/MarkAsDoneButton', () => ({
  __esModule: true,
  default: jest.fn(({ onMarkAsDone }) => (
    <button onClick={onMarkAsDone}>Mock MarkAsDoneButton</button>
  ))
}))

jest.mock('./components/RemoveTodoButton/RemoveTodoButton', () => ({
  __esModule: true,
  default: jest.fn(({ onRemoveTodo }) => (
    <button onClick={onRemoveTodo}>Mock RemoveTodoButton</button>
  ))
}))

describe('Componente Home', () => {
  it('renderiza o componente', async () => {
    render(<Home />)
    expect(screen.getByText('Lista de Tarefas')).toBeInTheDocument()
  })
})
