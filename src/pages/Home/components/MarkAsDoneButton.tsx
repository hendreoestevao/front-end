import React from 'react'
import axios from 'axios'
import { marcarTarefaConcluida } from '@/values/urls/todoList'

interface MarkAsDoneButtonProps {
  todoId: number
  onMarkAsDone: () => void
}

const MarkAsDoneButton: React.FC<MarkAsDoneButtonProps> = ({
  todoId,
  onMarkAsDone
}) => {
  const handleMarkAsDone = async (): Promise<void> => {
    try {
      await axios.get(marcarTarefaConcluida(todoId), {})
      onMarkAsDone()
    } catch (error) {
      console.error('Erro ao marcar a tarefa como concluída:', error)
    }
  }

  return (
    <button
      className="bg-[#308a7b] rounded-md text-white px-4 py-2 mt-2"
      onClick={handleMarkAsDone}
    >
      Marcar como Concluída
    </button>
  )
}

export default MarkAsDoneButton
