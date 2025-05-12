// shared/src/schemas/todo.ts
import { z } from 'zod'

// validazione Zod
export const todoSchema = z.object({
  title: z.string().min(1).max(100),
  completed: z.boolean().default(false),
  // Non includere createdAt qui, sarà aggiunto solo lato server
})

// Tipo derivato dallo schema Zod
export type TodoInput = z.infer<typeof todoSchema>

// Tipo completo con campi generati dal server
export interface Todo extends TodoInput {
  _id: string
  createdAt: Date
}
