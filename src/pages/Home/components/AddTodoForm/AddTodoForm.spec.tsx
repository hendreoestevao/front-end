import axios from 'axios'
import { render, fireEvent, waitFor } from '@testing-library/react'
import AddTodoForm from './AddTodoForm'

jest.mock('axios')

describe('AddTodoForm', () => {
  it('deve adicionar uma nova tarefa com sucesso', async () => {
    const newTodo = {
      id: 1,
      title: 'Nova Tarefa',
      description: 'Descrição da Nova Tarefa',
      status: 0
    }
    const criarTarefaMock = jest
      .spyOn(axios, 'post')
      .mockResolvedValue({ data: newTodo })

    const onAddTodoMock = jest.fn()

    const { getByLabelText, getByText } = render(
      <AddTodoForm authToken="fakeToken" onAddTodo={onAddTodoMock} />
    )

    fireEvent.change(getByLabelText('Título:'), {
      target: { value: 'Nova Tarefa' }
    })
    fireEvent.change(getByLabelText('Descrição:'), {
      target: { value: 'Descrição da Nova Tarefa' }
    })

    fireEvent.click(getByText('Adicionar Tarefa'))

    await waitFor(() => expect(criarTarefaMock).toHaveBeenCalled())

    expect(onAddTodoMock).toHaveBeenCalledWith(newTodo)

    const titleInput = getByLabelText('Título:') as HTMLInputElement
    const descriptionInput = getByLabelText('Descrição:') as HTMLInputElement

    expect(titleInput.value).toBe('')
    expect(descriptionInput.value).toBe('')
    criarTarefaMock.mockRestore()
  })
  // ...

  it('deve lidar com erro ao adicionar uma nova tarefa', async () => {
    const criarTarefaMock = jest
      .spyOn(axios, 'post')
      .mockRejectedValue(new Error('Erro ao adicionar tarefa'))

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const windowLocationReloadSpy = jest
      .spyOn(global, 'location', 'get')
      .mockReturnValue({ ...global.location, reload: jest.fn() })

    const onAddTodoMock = jest.fn()

    const { getByText } = render(
      <AddTodoForm authToken="fakeToken" onAddTodo={onAddTodoMock} />
    )

    fireEvent.click(getByText('Adicionar Tarefa'))

    await waitFor(() => expect(criarTarefaMock).toHaveBeenCalled())

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao adicionar tarefa:',
      expect.any(Error)
    )

    expect(windowLocationReloadSpy).toHaveBeenCalled()

    criarTarefaMock.mockRestore()
    consoleErrorSpy.mockRestore()
    windowLocationReloadSpy.mockRestore()
  })
})
