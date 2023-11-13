import axios from 'axios'
import { render, fireEvent, waitFor } from '@testing-library/react'
import MarkAsDoneButton from './MarkAsDoneButton'

jest.mock('axios')

describe('MarkAsDoneButton', () => {
  it('deve chamar onMarkAsDone ao marcar a tarefa como concluída com sucesso', async () => {
    const marcarTarefaConcluidaMock = jest
      .spyOn(axios, 'get')
      .mockResolvedValue({})

    const onMarkAsDoneMock = jest.fn()

    const { getByText } = render(
      <MarkAsDoneButton todoId={1} onMarkAsDone={onMarkAsDoneMock} />
    )

    fireEvent.click(getByText('Marcar como Concluída'))

    await waitFor(() => expect(marcarTarefaConcluidaMock).toHaveBeenCalled())

    expect(onMarkAsDoneMock).toHaveBeenCalled()

    marcarTarefaConcluidaMock.mockRestore()
  })

  it('deve lidar com erro ao marcar a tarefa como concluída', async () => {
    const marcarTarefaConcluidaMock = jest
      .spyOn(axios, 'get')
      .mockRejectedValue(new Error('Erro ao marcar a tarefa como concluída'))

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const onMarkAsDoneMock = jest.fn()

    const { getByText } = render(
      <MarkAsDoneButton todoId={1} onMarkAsDone={onMarkAsDoneMock} />
    )

    fireEvent.click(getByText('Marcar como Concluída'))

    await waitFor(() => expect(marcarTarefaConcluidaMock).toHaveBeenCalled())

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao marcar a tarefa como concluída:',
      expect.any(Error)
    )

    marcarTarefaConcluidaMock.mockRestore()
    consoleErrorSpy.mockRestore()
  })
})
