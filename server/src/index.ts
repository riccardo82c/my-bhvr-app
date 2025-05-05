import { Hono } from 'hono'
import { connectDatabase } from './config/db'
import todoRoutes from './routes/todo.routes'
import { cors } from 'hono/cors'

// Connetti al database
connectDatabase()

const app = new Hono()
app.use(cors())

// Monta le rotte dei todos
app.route('/todos', todoRoutes)

export default app
