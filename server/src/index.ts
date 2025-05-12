import { Hono } from 'hono'
import { connectDatabase } from './config/db'
import todoRoutes from './routes/todo.routes'
import userRoutes from './routes/user.routes'
import { cors } from 'hono/cors'

// Connetti al database
connectDatabase()

const app = new Hono()
app.use(cors())

// Monta le rotte dei todos
app.route('/todos', todoRoutes)
app.route('/users', userRoutes)

// Usa il server integrato di Bun
const port = parseInt(process.env.PORT || '3000', 10)
console.log(`Server in esecuzione su http://localhost:${port}`)
export default {
  port,
  fetch: app.fetch
}
