import { Hono } from 'hono'
import todoRoutes from './todo.routes'

const routes = new Hono()

routes.route('/todos', todoRoutes)

export default routes
