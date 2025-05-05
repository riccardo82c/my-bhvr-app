import { useContext } from "react"
import { TodoProvider } from "../context/TodoContext"
import { TodoContextType } from "../client-types/todoContextTypes"

export function useTodoContext() : TodoContextType {
  const context = useContext(TodoProvider.Context)
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider')
  }
  return context
}
