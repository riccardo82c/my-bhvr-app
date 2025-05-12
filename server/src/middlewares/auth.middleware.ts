import { sign, verify } from 'hono/jwt'
import type { UserResponse, AuthResponse } from "shared/dist"

const JWT_SECRET = process.env.JWT_SECRET

// Funzione per generare il token JWT
export const generateToken = async (user: any) => {
  const payload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 giorni
  }

  return await sign(payload, JWT_SECRET as string)
}

// Funzione per creare la risposta utente
export const createUserResponse = (user: any): UserResponse => {
  return {
    _id: user._id.toString(),
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  }
}

// Funzione per creare la risposta di autenticazione
export const createAuthResponse = async (user: any): Promise<AuthResponse> => {
  const token = await generateToken(user)
  const userResponse = createUserResponse(user)

  return {
    user: userResponse,
    token
  }
}

// Middleware JWT
export const jwtMiddleware = (secret: string) => {
  return jwt({
    secret
  })
}

// Importa jwt qui per evitare errori di circolarità
import { jwt } from 'hono/jwt'
