import React, { useState } from 'react'
import AddTodoForm from './components/AddTodoForm/AddTodoForm'
import RemoveTodoButton from './components/RemoveTodoButton/RemoveTodoButton'
import MarkAsDoneButton from './components/MarkAsDoneButton/MarkAsDoneButton'
import TodoListLoader from './components/TodoListLoader/TodoListLoader'
import Header from './components/Header/Header'

interface Todo {
  id: number
  title: string
  description: string
  status: number
}

const Home: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [filter, setFilter] = useState<string>('all')

  const markAsDone = async (todoId: number): Promise<void> => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todo) =>
        todo.id === todoId ? { ...todo, status: 1 } : todo
      )
    )
  }

  const handleRemoveTodo = async (todoId: number): Promise<void> => {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((todo) => todo.id !== todoId)
    )
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
    <div className="mx-auto my-8  max-h-[430px] max-w-[500px] p-4 bg-white rounded-md shadow-md mb-8">
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
      <TodoListLoader setTodoList={setTodoList} />

      <ul>
        {filteredTodoList().map((todo) => (
          <li key={todo.id} className="mb-4 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold mb-2">
              {' '}
              Título: {todo.title}
            </h3>
            <p className="text-gray-700">Descrição: {todo.description}</p>
            <p
              className={`mt-2 ${
                todo.status === 1 ? 'text-green-500' : 'text-gray-500'
              }`}
            >
              Status: {getStatusText(todo.status)}
            </p>
            {todo.status === 0 && (
              <MarkAsDoneButton
                todoId={todo.id}
                onMarkAsDone={async () => await markAsDone(todo.id)}
              />
            )}
            <RemoveTodoButton
              todoId={todo.id}
              onRemoveTodo={async () => await handleRemoveTodo(todo.id)}
            />
          </li>
        ))}
      </ul>
      <div>
        <h1 className="text-white bg-white">Espaçamento</h1>
      </div>
    </div>
  )
}

export default Home
