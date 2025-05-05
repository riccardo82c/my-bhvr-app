import { createContext, useState, ReactNode } from 'react'

interface TodoContextType {
  openMenuId: string | null
  setOpenMenuId: (id: string | null) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function TodoProvider({ children }: { children: ReactNode }) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  return (
    <TodoContext.Provider value={{ openMenuId, setOpenMenuId }}>
      {children}
    </TodoContext.Provider>
  )
}

TodoProvider.Context = TodoContext
