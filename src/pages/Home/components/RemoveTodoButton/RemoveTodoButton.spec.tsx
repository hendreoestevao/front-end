import axios from 'axios'
import { render, fireEvent, waitFor } from '@testing-library/react'
import RemoveTodoButton from './RemoveTodoButton'

jest.mock('axios')

describe('RemoveTodoButton', () => {
  it('deve chamar onRemoveTodo ao remover a tarefa com sucesso', async () => {
    const deletarTarefaMock = jest.spyOn(axios, 'delete').mockResolvedValue({})

    const onRemoveTodoMock = jest.fn()

    const { getByText } = render(
      <RemoveTodoButton todoId={1} onRemoveTodo={onRemoveTodoMock} />
    )

    fireEvent.click(getByText('Remover'))

    await waitFor(() => expect(deletarTarefaMock).toHaveBeenCalled())

    expect(onRemoveTodoMock).toHaveBeenCalled()

    deletarTarefaMock.mockRestore()
  })

  it('deve lidar com erro ao remover a tarefa', async () => {
    const deletarTarefaMock = jest
      .spyOn(axios, 'delete')
      .mockRejectedValue(new Error('Erro ao remover a tarefa'))

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const onRemoveTodoMock = jest.fn()

    const { getByText } = render(
      <RemoveTodoButton todoId={1} onRemoveTodo={onRemoveTodoMock} />
    )

    fireEvent.click(getByText('Remover'))

    await waitFor(() => expect(deletarTarefaMock).toHaveBeenCalled())

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao remover a tarefa:',
      expect.any(Error)
    )

    deletarTarefaMock.mockRestore()
    consoleErrorSpy.mockRestore()
  })
})
