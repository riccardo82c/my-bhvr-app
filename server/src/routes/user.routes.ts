import { Hono } from "hono"
import mongoose from 'mongoose'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { extendZod, zodSchema } from "@zodyac/zod-mongoose"
import { loginSchema, userSchema } from "shared/dist"
import { jwtMiddleware, createAuthResponse } from "@server/middlewares/auth.middleware"

const JWT_SECRET = process.env.JWT_SECRET

const userRoutes = new Hono()

const authMiddleware = jwtMiddleware(JWT_SECRET as string)

extendZod(z)

const userSchemaWithServerFields = userSchema.extend({
  createdAt: z.date().default(() => new Date()),
  role: z.enum(['user', 'admin']).default('user')
})

const UserSchema = zodSchema(userSchemaWithServerFields)

const User = mongoose.model('User', UserSchema)

// Ottieni tutti gli users
userRoutes.get('/', authMiddleware ,async (c) => {

  // QUI HO A DISPOSIZIONE TUTTE LE INFORMAZIONI PRESE DAL TOKEN
  console.log('c', c.get('jwtPayload'))

  // TODO: implementare check del ruolo

  if (c.get('jwtPayload').role !== 'admin') return c.json({ message: 'Unauthorized' }, 401)

  try {
    const users = await User.find({}).sort({ createdAt: -1 })
    console.log('users', users)
    return c.json(users)
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500)
  }
})

// Crea un nuovo user
userRoutes.post('/signup', zValidator('json', userSchema), async (c) => {
  try {
    const data = c.req.valid('json')
    const existingUser = await User.findOne({ email: data.email })

    if (existingUser) {
      return c.json({ message: 'User already exists' }, 409)
    }

    const userData = {...data, role: 'user'}
    const user = new User(userData)
    await user.save()

    const authResponse = await createAuthResponse(user)

    return c.json(authResponse, 201)
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400)
  }
})

// Login utetnte
userRoutes.post('/login', zValidator('json', loginSchema), async (c) => {
  try {
    const data = c.req.valid('json')
    const user = await User.findOne({ email: data.email, password: data.password })
    if (!user) {
      return c.json({ message: 'Invalid credentials' }, 404)
    }

    const authResponse = await createAuthResponse(user)

    return c.json(authResponse)
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400)
  }
})



export default userRoutes
