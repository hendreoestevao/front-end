import axios from 'axios'
import { deletarTarefa } from '@/values/urls/todoList'

interface RemoveTodoButtonProps {
  todoId: number
  onRemoveTodo: () => void
}

const RemoveTodoButton: React.FC<RemoveTodoButtonProps> = ({
  todoId,
  onRemoveTodo
}) => {
  const handleRemoveTodo = async (): Promise<void> => {
    try {
      await axios.delete(deletarTarefa(todoId), {})
      onRemoveTodo()
    } catch (error) {
      console.error('Erro ao remover a tarefa:', error)
    }
  }

  return (
    <button
      className="bg-red-500 rounded-md text-white px-4 py-2 mt-2 ml-2"
      onClick={handleRemoveTodo}
    >
      Remover
    </button>
  )
}

export default RemoveTodoButton
