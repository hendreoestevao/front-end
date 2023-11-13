import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import axios from 'axios'
import Home from '../src/pages/Home'
import React from 'react'

jest.mock('axios')

describe('Home Component', () => {
  test('renders home page', async () => {
    const mockedTodoList = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: 0 },
      { id: 2, title: 'Task 2', description: 'Description 2', status: 1 }
    ]
    axios.get.mockResolvedValue({ data: mockedTodoList })

    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Todas')).toBeInTheDocument()
      expect(screen.getByText('Concluídas')).toBeInTheDocument()
      expect(screen.getByText('Pendentes')).toBeInTheDocument()
      expect(screen.getByText('Lista de Tarefas')).toBeInTheDocument()
      expect(screen.getByLabelText('Filtrar por Status:')).toBeInTheDocument()
      expect(screen.getByText('Task 1')).toBeInTheDocument()
      expect(screen.getByText('Task 2')).toBeInTheDocument()
      expect(screen.getByText('Description 1')).toBeInTheDocument()
      expect(screen.getByText('Description 2')).toBeInTheDocument()
      expect(screen.getByText('Marcar como Concluída')).toBeInTheDocument()
      expect(screen.getByText('Remover')).toBeInTheDocument()
    })
  })

  test('handles filter change', async () => {
    const mockedTodoList = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: 0 },
      { id: 2, title: 'Task 2', description: 'Description 2', status: 1 }
    ]
    axios.get.mockResolvedValue({ data: mockedTodoList })

    render(<Home />)

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Filtrar por Status:'), {
        target: { value: 'completed' }
      })

      expect(screen.getByText('Task 1')).not.toBeInTheDocument()
      expect(screen.getByText('Task 2')).toBeInTheDocument()
    })
  })

  test('handles task completion', async () => {
    const mockedTodoList = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: 0 }
    ]
    axios.get.mockResolvedValue({ data: mockedTodoList })
    axios.get.mockResolvedValueOnce({})

    render(<Home />)

    await waitFor(() => {
      fireEvent.click(screen.getByText('Marcar como Concluída'))
    })

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:3000/api/ToDo/MarkAsDone/1',
        {}
      )
      expect(screen.getByText('Status: Concluída')).toBeInTheDocument()
    })
  })

  test('handles task removal', async () => {
    const mockedTodoList = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: 0 }
    ]
    axios.get.mockResolvedValue({ data: mockedTodoList })
    axios.delete.mockResolvedValueOnce({})

    render(<Home />)

    await waitFor(() => {
      fireEvent.click(screen.getByText('Remover'))
    })

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        'http://localhost:3000/api/ToDo/1',
        {}
      )
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
    })
  })
})
