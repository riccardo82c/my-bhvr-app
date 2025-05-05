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
      <div className="text-center py-8 bg-[var(--todo-empty-bg)] border border-[var(--todo-empty-border)] rounded-lg text-[var(--todo-text)]">
        Caricamento in corso...
      </div>
    )
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="text-center py-8 bg-[var(--todo-empty-bg)] border border-[var(--todo-empty-border)] rounded-lg text-[var(--todo-text)]">
        {todos ? 'Nessun task disponibile' : 'Clicca "Call API" per caricare i task'}
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