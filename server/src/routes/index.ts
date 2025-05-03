import { Hono } from 'hono'
import todoRoutes from './todo.routes'

const routes = new Hono()

// Monta le rotte dei todos sotto il prefisso '/todos'
routes.route('/todos', todoRoutes)

// Qui puoi aggiungere altre rotte in futuro

export default routes
