import { Hono } from 'hono'
import { connectDatabase } from './config/db'
import todoRoutes from './routes/todo.routes'

const app = new Hono()

// Connetti al database
connectDatabase()

// Monta le rotte dei todos
app.route('/todos', todoRoutes)

export default app
