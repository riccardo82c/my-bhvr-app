import { Hono } from 'hono'
import mongoose from 'mongoose'
import { extendZod, zodSchema } from '@zodyac/zod-mongoose'
import { todoSchema } from 'shared/dist'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

// Crea un'app Hono per le rotte dei todos
const todoRoutes = new Hono()

// Estendi Zod prima di utilizzare zodSchema
extendZod(z)

// Estendi lo schema con campi specifici del server se necessario
const todoSchemaWithServerFields = todoSchema.extend({
  createdAt: z.date().default(() => new Date())
})

// Genera lo schema Mongoose automaticamente dallo schema Zod
const TodoSchema = zodSchema(todoSchemaWithServerFields)

// Modello Mongoose
const Todo = mongoose.model('Todo', TodoSchema)

// Ottieni tutti i todos
todoRoutes.get('/', async (c) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 })
    console.log('todos', todos)
    return c.json(todos)
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500)
  }
})

// Ottieni un singolo todo
todoRoutes.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const todo = await Todo.findById(id)

    if (!todo) {
      return c.json({ message: 'Todo non trovato' }, 404)
    }

    return c.json(todo)
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500)
  }
})

// Crea un nuovo todo
todoRoutes.post('/', zValidator('json', todoSchema), async (c) => {
  try {
    const data = c.req.valid('json')
    const todo = new Todo(data)
    await todo.save()
    return c.json(todo, 201)
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400)
  }
})

// Aggiorna un todo
todoRoutes.put('/:id', zValidator('json', todoSchema), async (c) => {
  try {
    const id = c.req.param('id')
    const data = c.req.valid('json')

    const todo = await Todo.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    )

    if (!todo) {
      return c.json({ message: 'Todo non trovato' }, 404)
    }

    return c.json(todo)
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400)
  }
})

// Aggiorna solo lo stato completed
todoRoutes.patch('/:id/toggle', async (c) => {
  try {
    const id = c.req.param('id')
    const todo = await Todo.findById(id)

    if (!todo) {
      return c.json({ message: 'Todo non trovato' }, 404)
    }

    todo.completed = !todo.completed
    await todo.save()

    return c.json(todo)
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400)
  }
})

// Elimina un todo
todoRoutes.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const todo = await Todo.findByIdAndDelete(id)

    if (!todo) {
      return c.json({ message: 'Todo non trovato' }, 404)
    }

    return c.json({ message: 'Todo eliminato con successo' })
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500)
  }
})

export default todoRoutes
