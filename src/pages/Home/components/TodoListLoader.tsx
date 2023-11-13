import React, { useEffect } from 'react'
import axios from 'axios'
import { receberTarefa } from '@/values/urls/todoList'

interface TodoListLoaderProps {
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoListLoader: React.FC<TodoListLoaderProps> = ({ setTodoList }) => {
  const loadTodoList = async (): Promise<void> => {
    try {
      const response = await axios.get(receberTarefa(), {})
      setTodoList(response.data)
    } catch (error) {
      console.error('Erro ao carregar a lista de tarefas:', error)
    }
  }

  useEffect(() => {
    void loadTodoList()
  }, [])

  return null
}

export default TodoListLoader
