// AddTodoForm.tsx

import React, { useState } from 'react'
import axios from 'axios'

interface AddTodoFormProps {
  authToken: string
  onAddTodo: (newTodo: any) => void
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ authToken, onAddTodo }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleAddTodoForm = async (): Promise<void> => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/Todo',
        { title, description }
      )

      const newTodo = response.data
      onAddTodo(newTodo)

      setTitle('')
      setDescription('')

      console.log('Tarefa criada com sucesso')
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error)
      window.location.reload()
    }
  }

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Adicionar Nova Tarefa</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Título:
          <input
            id="title"
            type="text"
            className="form-input mt-1 block w-full p-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Descrição:
          <input
            id="description"
            type="text"
            className="form-input mt-1 block w-full p-2 border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        onClick={handleAddTodoForm}
      >
        Adicionar Tarefa
      </button>
    </div>
  )
}

export default AddTodoForm
