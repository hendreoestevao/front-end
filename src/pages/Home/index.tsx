// Home.tsx

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddTodoForm from './components/AddTodoForm'
import Header from './components/header'

interface Todo {
  id: number
  title: string
  description: string
  status: number
}

const Home: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [filter, setFilter] = useState<string>('all')

  const loadTodoList = async (): Promise<void> => {
    try {
      const response = await axios.get('http://localhost:3000/api/Todo', {
      })

      setTodoList(response.data)
    } catch (error) {
      console.error('Erro ao carregar a lista de tarefas:', error)
    }
  }

  useEffect(() => {
    void loadTodoList()
  }, [])

  const markAsDone = async (todoId: number): Promise<void> => {
    try {
      await axios.get(`http://localhost:3000/api/ToDo/MarkAsDone/${todoId}`, {
      })

      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.id === todoId ? { ...todo, status: 1 } : todo
        )
      )
    } catch (error) {
      console.error('Erro ao marcar a tarefa como concluída:', error)
    }
  }

  const handleRemoveTodo = async (todoId: number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:3000/api/ToDo/${todoId}`, {
      })

      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo.id !== todoId)
      )
    } catch (error) {
      console.error('Erro ao remover a tarefa:', error)
    }
  }

  const getStatusText = (status: number): string => {
    return status === 1 ? 'Concluída' : 'Pendente'
  }

  const filteredTodoList = (): Todo[] => {
    switch (filter) {
      case 'completed':
        return todoList.filter((todo) => todo.status === 1)
      case 'pending':
        return todoList.filter((todo) => todo.status === 0)
      default:
        return todoList
    }
  }

  const handleLogout = (): void => {
    window.location.href = '/'
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 bg-white rounded-md shadow-md">
      <Header onLogout={handleLogout} />

      <div className="mb-4">
        <label>Filtrar por Status: </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-2 p-2"
        >
          <option value="all">Todas</option>
          <option value="completed">Concluídas</option>
          <option value="pending">Pendentes</option>
        </select>
      </div>

      <AddTodoForm authToken="JWT_TOKEN" onAddTodo={AddTodoForm} />

      <h2 className="text-2xl font-semibold mt-4 mb-4">Lista de Tarefas</h2>

      <ul>
        {filteredTodoList().map((todo) => (
          <li key={todo.id} className="mb-4 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
            <p className="text-gray-700">{todo.description}</p>
            <p
              className={`mt-2 ${
                todo.status === 1 ? 'text-green-500' : 'text-gray-500'
              }`}
            >
              Status: {getStatusText(todo.status)}
            </p>
            {todo.status === 0 && (
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-2"
                onClick={async () => await markAsDone(todo.id)}
              >
                Marcar como Concluída
              </button>
            )}
            <button
              className="bg-red-500 text-white px-4 py-2 mt-2 ml-2"
              onClick={async () => await handleRemoveTodo(todo.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
