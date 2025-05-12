import { Todo as TodoType } from 'shared'
import Todo from './Todo'

interface TodoListProps {
  todos: TodoType[] | undefined
  onToggle: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  loading?: boolean
}

export default function TodoList({ todos, onToggle, onEdit, onDelete, loading = false }: TodoListProps) {
  if (loading) {
    return (
      <div className="text-center py-8 bg-[var(--todo-bg)] border border-[var(--todo-border)] rounded-lg text-[var(--todo-text)] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
        <p className="mt-3">Caricamento...</p>
      </div>
    )
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="text-center py-8 bg-[var(--todo-bg)] border border-[var(--todo-border)] rounded-lg text-[var(--todo-text)]">
        Nessun task disponibile
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
