import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import AddTodoForm from '../src/pages/Home/components/AddTodoForm'

jest.mock('axios')

describe('AddTodoForm', () => {
  it('deve adicionar uma nova tarefa ao clicar no botão', async () => {
    axios.post.mockResolvedValue({
      data: {
        id: 1,
        title: 'Nova Tarefa',
        description: 'Descrição da nova tarefa'
      }
    })

    const onAddTodoMock = jest.fn()

    render(<AddTodoForm authToken="mockToken" onAddTodo={onAddTodoMock} />)

    userEvent.type(screen.getByLabelText(/título/i), 'Nova Tarefa')
    userEvent.type(
      screen.getByLabelText(/descrição/i),
      'Descrição da nova tarefa'
    )

    // Simula o clique no botão Adicionar Tarefa
    fireEvent.click(screen.getByText(/adicionar tarefa/i))

    // Aguarda a conclusão da chamada simulada à API
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1))

    // Verifica se a função onAddTodo foi chamada corretamente
    expect(onAddTodoMock).toHaveBeenCalledWith({
      id: 1,
      title: 'Nova Tarefa',
      description: 'Descrição da nova tarefa'
    })

    expect(screen.getByLabelText(/título/i)).toHaveValue('')
    expect(screen.getByLabelText(/descrição/i)).toHaveValue('')

    expect(console.log).toHaveBeenCalledWith('Tarefa criada com sucesso')
  })

})
