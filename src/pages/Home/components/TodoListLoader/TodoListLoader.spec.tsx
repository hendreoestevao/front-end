import axios from 'axios'
import { render, waitFor } from '@testing-library/react'
import TodoListLoader from './TodoListLoader'

jest.mock('axios')

describe('TodoListLoader', () => {
  it('deve carregar a lista de tarefas com sucesso', async () => {
    const receberTarefaMock = jest
      .spyOn(axios, 'get')
      .mockResolvedValue({ data: [{ id: 1, title: 'Tarefa 1' }] })

    const setTodoListMock = jest.fn()

    render(<TodoListLoader setTodoList={setTodoListMock} />)

    await waitFor(() => expect(receberTarefaMock).toHaveBeenCalled())

    expect(setTodoListMock).toHaveBeenCalledWith([{ id: 1, title: 'Tarefa 1' }])

    receberTarefaMock.mockRestore()
  })

  it('deve lidar com erro ao carregar a lista de tarefas', async () => {
    const receberTarefaMock = jest
      .spyOn(axios, 'get')
      .mockRejectedValue(new Error('Erro ao carregar a lista de tarefas'))

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const setTodoListMock = jest.fn()

    render(<TodoListLoader setTodoList={setTodoListMock} />)

    await waitFor(() => expect(receberTarefaMock).toHaveBeenCalled())

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao carregar a lista de tarefas:',
      expect.any(Error)
    )

    receberTarefaMock.mockRestore()
    consoleErrorSpy.mockRestore()
  })
})
