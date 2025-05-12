// shared/src/schemas/user.ts
import { z } from 'zod'

// validazione Zod per l'input
export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8), // In produzione, considera regole più complesse
  role: z.string().default('user')
  // Altri campi che potrebbero servirti
})

// Tipo derivato dallo schema Zod
export type UserInput = z.infer<typeof userSchema>

// Schema per l'utente restituito (senza password)
export const userResponseSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  role: z.string(),
  createdAt: z.date()
})

// Tipo per l'utente restituito
export type UserResponse = z.infer<typeof userResponseSchema>


// Tipo completo con campi generati dal server
// Usiamo Omit per rimuovere il campo password dall'interfaccia User
export interface User extends Omit<UserInput, 'password'> {
  _id: string
  createdAt: Date
}

// Schema per l'autenticazione
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.string().default('user')
})

export type LoginInput = z.infer<typeof loginSchema>

// Schema per la risposta di autenticazione
export const authResponseSchema = z.object({
  user: userResponseSchema,
  token: z.string()
})

export type AuthResponse = z.infer<typeof authResponseSchema>
