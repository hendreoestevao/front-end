const baseTodoList = 'http://localhost:3000'

export const criarTarefa = (): string => `${baseTodoList}/api/Todo`

export const receberTarefa = (): string => `${baseTodoList}/api/Todo`

export const deletarTarefa = (todoId: number): string => `${baseTodoList}/api/ToDo/${todoId}`

export const marcarTarefaConcluida = (todoId: number): string => `${baseTodoList}/api/ToDo/MarkAsDone/${todoId}`
