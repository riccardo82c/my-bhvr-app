import { Hono } from 'hono'
import mongoose from 'mongoose'
import { extendZod, zodSchema } from '@zodyac/zod-mongoose'
import { todoSchema } from 'shared/dist'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

// Connessione MongoDB in formato: /* mongodb+srv://username:password@hostname/database-name?options */
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('Connesso a MongoDB'))
  .catch(err => console.error('Errore di connessione a MongoDB:', err))

/* // Schema Zod per validazione
const todoSchema = z.object({
  title: z.string().min(1).max(100),
  completed: z.boolean().default(false),
  // createdAt sarà gestito automaticamente da Mongoose
}) */

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

// Middleware per gestione errori
app.onError((err, c) => {
  console.error('Errore:', err)
  return c.json({ error: err.message }, 500)
})

// Ottieni tutti i todos
app.get('/todos', async (c) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 })
    console.log('todos', todos)
    return c.json(todos)
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500)
  }
})

// Ottieni un singolo todo
app.get('/todos/:id', async (c) => {
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
app.post('/todos', zValidator('json', todoSchema), async (c) => {
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
app.put('/todos/:id', zValidator('json', todoSchema), async (c) => {

  console.log(c.req.param)

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
app.patch('/todos/:id/toggle', async (c) => {
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
app.delete('/todos/:id', async (c) => {
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

export default app
