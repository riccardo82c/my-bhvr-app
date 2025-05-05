import { CheckCircle, Circle, MoreVertical } from 'lucide-react'
import { Todo as TodoType } from 'shared'
import TodoOptionsMenu from './TodoOptionsMenu'
// import { useTodoContext } from './TodoContext'
// import { useTodoContext } from '../context/TodoContext'
import { useTodoContext } from '../hooks/useTodoContext'

interface TodoProps {
  todo: TodoType
  onToggle: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function Todo({ todo, onToggle, onEdit, onDelete }: TodoProps) {
  const { openMenuId, setOpenMenuId } = useTodoContext()
  return (
    <div className='bg-[var(--todo-bg)] border border-[var(--todo-border)] rounded-lg shadow-[var(--todo-shadow)] p-4 flex flex-row justify-between items-center mb-3'>
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${todo.completed ? 'bg-[var(--todo-completed-dot)]' : 'bg-[var(--todo-pending-dot)]'}`}></div>
        <h3 className={`text-lg font-medium text-[var(--todo-text)] ${todo.completed ? 'line-through opacity-70' : ''}`}>{todo.title}</h3>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggle(todo._id)}
          className={`p-2 rounded-md transition-colors cursor-pointer ${todo.completed
              ? 'bg-[var(--todo-completed-bg)] text-[var(--todo-completed-text)] hover:bg-[var(--todo-completed-hover)]'
              : 'bg-[var(--todo-pending-bg)] text-[var(--todo-pending-text)] hover:bg-[var(--todo-pending-hover)]'
            }`}
          aria-label={todo.completed ? 'Segna come da completare' : 'Segna come completato'}
        >
          {todo.completed ? (
            <CheckCircle size={20} />
          ) : (
            <Circle size={20} />
          )}
        </button>
        <div className="relative">
          <button
            onClick={() => {
              // Se il menu è già aperto per questo todo, lo chiude, altrimenti lo apre
              setOpenMenuId(openMenuId === todo._id ? null : todo._id)
            }}
            className="p-2 rounded-md transition-colors cursor-pointer bg-[var(--todo-options-bg)] text-[var(--todo-options-text)] hover:bg-[var(--todo-options-hover)]"
            aria-label="Opzioni"
            aria-expanded={openMenuId === todo._id}
            aria-haspopup="true"
            data-menu-toggle="true"
          >
            <MoreVertical size={20} />
          </button>
          <TodoOptionsMenu
            todoId={todo._id}
            isOpen={openMenuId === todo._id}
            onClose={() => setOpenMenuId(null)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  )
}
